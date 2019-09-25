const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')
const fetch = require('node-fetch')

const util = require('../../lib/util')
// const headless = require('../../lib/headless')
const categories = require('../../config/categories')
const mongos = require('../../lib/mongo')
const QoS = require('../../../data/aws/QoS.json')
// const servicePricing = require('../../../data/aws/service-pricing.json')

exports.scrape = async (azure) => {
  console.log("Scraping Azure...")
  const azureUrl = url.parse(azure.products)
  const queryUrl = () => axios.get(azureUrl)

  const AzureData = await queryUrl()
  const html = AzureData.data.toString()
  const $ = cheerio.load(html)

  // AWS Main Object
  const provider = {
    name: 'Microsoft Azure',
    products: '',
    quality_of_service: QoS.qualityOfService,
    services: ''
  }

  // Gather all services
  // const servicesa = $('div.column, div.medium-6, div.end').map(function(i, el) {
  //   return {
  //     service_name: $('h2.text-heading4 > span').text().trim(),
  //     // url: $('a').attr('data-event-property')
  //     // service_short_name: $(this).attr('track-metadata-eventdetail'),
  //     // description: $('p.text-body4').text().trim(),
  //     // url: $('#products-list > div:nth-child(2) > div:nth-child(1) > a').attr('href')
  //   }
  // }).get()

  // console.log(servicesa)

  // const services = $('h2.text-heading4 > span').map(function(i, el) {
  //   return {
  //     service_name: $(this).text().trim()
  //   }
  // }).get()

  const services2 = $('div.medium-6 p').map(function(i, el) {
    return {
      description: $(this).text().trim()
    }
  }).get()


  const services3 = $('div.medium-6 a').map(function(i, el) {
    return {
      service_name: $(this).text().trim(),
      service_path: $(this).attr('href'),
      url: `https://azure.microsoft.com${$(this).attr('href')}`,
    }
  }).get()

  provider.services = services3

  provider.services.forEach((x, i) => {
    services2.forEach((y, j) => {
      if (i === j) {
        x.description = y.description
      }
    })
  })

  // Assigning categories to services
  provider.services.forEach(service => {
    categories.filter(prod =>  {
      if (prod.services.includes(service.service_name)) {
        service.category = prod.name
      }
    })
  })

  // Time to get benefits and pricing data out from the individual services
  function getFurtherInfo () {
    return provider.services.map(async (x) => {
      try {
        const serviceUrl = url.parse(`${x.url}`)
        const queryService = () => axios.get(serviceUrl)
        const AzureServices = await queryService()
        const AzureServiceHTML = AzureServices.data.toString() 
        const $ = cheerio.load(AzureServiceHTML)

        let benefitsArr

        let benefitVal = $('.medium-3 > h2').map(function(i, el) {
          return $(this).text().trim()
        }).get()

        // Find other benefits with different parent class
        if (benefitVal.length === 0) {
          benefitVal = $('.medium-8 > h2').map(function(i, el) {
            return $(this).text().trim()
          }).get()

        } else {
          benefitVal = $('.medium-4 > h2').map(function(i, el) {
            return $(this).text().trim()
          }).get()

        }

        if (benefitVal.length === 0) {
          benefitVal = $('.medium-9 > h2').map(function(i, el) {
            return $(this).text().trim()
          }).get()
        }

        // This is to remove Frequently asked questions from the array for all services that has the same heading syntax as the benefits we're extracting
        const regex = new RegExp('Frequently asked questions about\\b', 'g')

        benefitVal.forEach((x, i) => {
          if (x.match(regex)) {
            benefitVal.splice(i, 1)
          }
          return x
        })

        x.keywords = benefitVal.join('. ').split(' ')

        // Add a full stop after each benefit
        benefitsArr = benefitVal.join('. ')

        x.benefits = benefitsArr + '.'

        return x

      } catch (error) {
        console.error('Error querying', error)
      }
    })
  }

  const benefits = await getFurtherInfo()

  Promise.all(benefits).then((data) => {
    provider.services.push(data)
    fs.writeFile('./../data/azure/provider.json', JSON.stringify(provider, null, 2), (err) => {
      if (err) return console.error(err)
    })

    const uniqueData = _.uniqWith(data, _.isEqual)

    // Group the categories into arrays so they can be sorted into separate jsons
    const organiseCategories = _.groupBy(uniqueData, 'category')

    for (const category in organiseCategories) {
      fs.writeFile(`./../data/azure/categories-services/${util.slugify(category)}.json`, JSON.stringify(organiseCategories[category], null, 2), (err) => {
        if (err) return console.error(err)
      })
    }
  })
}