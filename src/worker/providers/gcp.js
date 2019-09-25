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
// const store = require('../../worker/store')
const QoS = require('../../../data/aws/QoS.json')
// const servicePricing = require('../../../data/aws/service-pricing.json')

exports.scrape = async (gcp) => {
  console.log("Scraping GCP...")
  const gcpUrl = url.parse(gcp.products)
  const queryUrl = () => axios.get(gcpUrl)

  const GCPData = await queryUrl()
  const html = GCPData.data.toString()
  const $ = cheerio.load(html)

  // AWS Main Object
  const provider = {
    name: 'Google Cloud Platform',
    products: '',
    quality_of_service: QoS.qualityOfService,
    services: ''
  }

  // Gather all services
  const services = $('.cloud-product-card__headline').map(function(i, el) {
    return {
      service_name: $(this).text().trim(),
      service_short_name: $(this).attr('track-metadata-eventdetail'),
      description: $(this).next().text().trim(),
      url: $(this).attr('href')
    }
  }).get()

  const products = $('.cloud-grid, .cloud-grid__no-gap, .margin-bottom-60, .cloud-jump-section').map(function(i, el) {
    if ($(this).attr('data-cloud-main-text')) {
      return {
        product_name: $(this).attr('data-cloud-main-text'),
        // url: $('.cloud-product-card > div.cloud-inner-content').children('a').attr('href')
      }
    }
  }).get()

  provider.services = services
  provider.products = products

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
        const GCPServices = await queryService()
        const GCPServiceHTML = GCPServices.data.toString() 
        const $ = cheerio.load(GCPServiceHTML)
    
        let benefitVal = $('.cloud-grid__col, .cloud-copy__text, .is-6, .is-4__large').map(function(i, el) {
          return $('h4.cloud-headline4').text().trim()
        }).get()

        x.benefits = benefitVal[0]

        return x

      } catch (error) {
        console.error('Error querying', error)
      }
    })
  }

  const benefits = await getFurtherInfo()

  Promise.all(benefits).then((data) => {
    provider.services.push(data)
    fs.writeFile('./../data/gcp/provider.json', JSON.stringify(provider, null, 2), (err) => {
      if (err) return console.error(err)
    })

    const uniqueData = _.uniqWith(data, _.isEqual)

    // Group the categories into arrays so they can be sorted into separate jsons
    const organiseCategories = _.groupBy(uniqueData, 'category')

    for (const category in organiseCategories) {
      fs.writeFile(`./../data/gcp/categories-services/${util.slugify(category)}.json`, JSON.stringify(organiseCategories[category], null, 2), (err) => {
        if (err) return console.error(err)
      })
    }
  })
  

  // function getBenefits () {
  //   return provider.services.map(async (x) => {
  //     try {
  //       const awsUrls = url.parse(`${aws.homepageUrl}${x.service_path}`)
  //       const queryUrls = () => axios.get(awsUrls)
  //       const AWSUrls = await queryUrls()
  //       x.url = AWSUrls.request.res.responseUrl // This is to get the redirection links when AWS updates their service URLs internally but does not update the website page URLs publicly

  //       const productHtmls = AWSUrls.data.toString() 
  //       const $ = cheerio.load(productHtmls)

  //       let keywords = $('.lb-title').map(function(i, el) {
  //         return $(this).text().trim()
  //       }).get().join(',')

  //       keywords = keywords.substring(keywords.indexOf('Benefits'))
  //       keywords = keywords.replace('Benefits ', '')
  //       x.keywords = keywords.split(',')

  //       let benefits = $('.lb-title').text().trim()
  //       benefits = benefits.substring(benefits.indexOf('Benefits'))
  //       x.benefits = benefits.replace('Benefits ', '')
  //       // x.benefits = benefits.split(' ').slice(2).join(' ')

  //       // Experiment to see if I should add a field that indicates whether this is an essential requirement of any business
  //       if (x.service_name === 'Amazon EC2') {
  //         x.essentials = true
  //       }

  //       return x
        
  //     } catch (error) {
  //       console.error('Error querying', error)
  //     }
  //   })
  // }


  // Push to object
  // provider.products = products

  // // Gather all services - S3, SQS, SNS etc
  // $('.lb-content-item a').map(function(i, el) {
  //   const service = {}
  //   const link = $(this).attr('href')
  //   service.service_path = link.substring(0, link.indexOf('?')) // String cleanup
  //   service.service_name = $(this).contents().eq(0).text().trim() // Trims whitespace
  //   service.mini_description = $(this).children('span').text() // This works but because we're removing the psna from the service_name, it wont load span element again on the next loop

  //   provider.services.push(service)

  // }).get().join('')



  // // Sanitising service path to be used in finding pricing list for each service using AWS Pricing API Endpoint
  // // const path = {}
  // const service_path = provider.services.map((ser) => {
  //   return ser.service_path.replace(/[/-]/g,'')
  // })

  // // path.services = ser_path

  // // fs.writeFile('./../data/aws/services.json', JSON.stringify(path, null, 2), (err) => {
  // //   if (err) return console.error(err)
  // // })

  // function getBenefits () {
  //   return provider.services.map(async (x) => {
  //     try {
  //       const awsUrls = url.parse(`${aws.homepageUrl}${x.service_path}`)
  //       const queryUrls = () => axios.get(awsUrls)
  //       const AWSUrls = await queryUrls()
  //       x.url = AWSUrls.request.res.responseUrl // This is to get the redirection links when AWS updates their service URLs internally but does not update the website page URLs publicly

  //       const productHtmls = AWSUrls.data.toString() 
  //       const $ = cheerio.load(productHtmls)

  //       let keywords = $('.lb-title').map(function(i, el) {
  //         return $(this).text().trim()
  //       }).get().join(',')

  //       keywords = keywords.substring(keywords.indexOf('Benefits'))
  //       keywords = keywords.replace('Benefits ', '')
  //       x.keywords = keywords.split(',')

  //       let benefits = $('.lb-title').text().trim()
  //       benefits = benefits.substring(benefits.indexOf('Benefits'))
  //       x.benefits = benefits.replace('Benefits ', '')
  //       // x.benefits = benefits.split(' ').slice(2).join(' ')

  //       // Experiment to see if I should add a field that indicates whether this is an essential requirement of any business
  //       if (x.service_name === 'Amazon EC2') {
  //         x.essentials = true
  //       }

  //       return x
        
  //     } catch (error) {
  //       console.error('Error querying', error)
  //     }
  //   })
  // }
  // const benefits = await getBenefits()

  // console.log('Successfully scraped general data from services...')
  // console.log('Writing AWS data to master file...')

  // // const services = []
  // Promise.all(benefits).then((data) => {
  //   provider.services.push(data)
  //   fs.writeFile('./../data/aws/provider.json', JSON.stringify(provider, null, 2), (err) => {
  //     if (err) return console.error(err)
  //   })

  //   // Group the categories into arrays so they can be sorted into separate jsons
  //   const organiseCategories = _.groupBy(data, 'category')

  //   for (const category in organiseCategories) {
  //     fs.writeFile(`./../data/gcp/categories-services/${util.slugify(category)}.json`, JSON.stringify(organiseCategories[category], null, 2), (err) => {
  //       if (err) return console.error(err)
  //     })
  //   }
  // })

  // // Investigation and Sanitisation purpose
  // // const noCategory = provider.services.filter(x => {
  // //   return !x.category
  // // })
  // // console.log('noCat >> ', noCategory)

  

  // console.log('Initiating pricing scrape for AWS services....')

  // const client = await mongos.mongoConnect()

  // for (const service of service_path) {
  //   try {
  //     fetch(`https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/${service}/USD/current/${service}.json`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //       } else {
  //         return Promise.reject({
  //           service,
  //           status: response.status
  //         })
  //       }
  //     })
  //     .then(async (data) => {
  //       const newData = {
  //         provider: 'AWS',
  //         service: '',
  //         details: []
  //       }
  //       for (const val in data.regions) {
  //         const pricingData = {}
  //         newData.service = service
  //         pricingData.provider = 'AWS'
  //         pricingData.service = service
  //         const region = val.toString()
  //         pricingData.region = region.replace(/[.]/g, '-')
  //         // pricingData.region = val.replace(/[.]/g, '-')
  //         for (const priceDetail in data.regions[val]) {
  //           const description = priceDetail.toString()
  //           pricingData.description = description.replace(/[.]/g, '-')
  //           // pricingData.description = priceDetail.replace(/[.]/g, '-')
  //           pricingData.pricing = data.regions[val][priceDetail]['price']
  //         }
  //         // pricingData.pricing = data.regions[val]
  //         newData.details.push(pricingData)

  //         // fs.writeFile(`./../data/aws/pricing/${service}-${util.slugify(val)}.json`, JSON.stringify(data.regions[val], null, 2), (err) => {
  //         //   if (err) return console.error(err)
  //         // })
  //       }
  //       let result
  //       result = await client.collection('pricing-aws').insertOne(newData)
  //       if (result.insertedCount > 1) {
  //         console.log('inserted successfully', )
  //       }
  //     })
  //     .catch(error => console.log('Error: ', error))

  //   } catch (error) {
  //     console.log('Error fetching prices from AWS API endpoint', error)
  //   }
  // }
}