const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')

async function start(){
const awsUrl = url.parse('https://aws.amazon.com/about-aws/global-infrastructure/')
const queryUrl = () => axios.get(awsUrl)
const AWSData = await queryUrl()
const html = AWSData.data.toString()
const $ = cheerio.load(html)

// const ss = $('.lb-grid.lb-row.lb-row-max-large.lb-snap').map(function(i, el) {
//   // const bens = $(this).children('h3.title').text()
//   return $(this).find('h3.lb-title').text().trim()
// }).get()

const findQoS = $('.lb-col.lb-tiny-24.lb-mid-8').map(function(i, el) {
  return $(this).find('h3.lb-title').text().trim()
}).get()

const obj = {}
const QoS = findQoS.filter((e) => { return e !== '' }) // Remove empty strings
console.log(QoS)
obj.qualityOfService = QoS

console.log(obj)

fs.writeFile('./../data/aws/QoS.json', JSON.stringify(obj, null, 2), (err) => {
  if (err) return console.error(err)
})



// const regions = $('.lb-tabs-trigger').map(function(i, el) {
//   return $(this).text().trim()
// }).get()

// console.log('Regions > ', regions, '\n\n')

// const edgeNetworks = $('.lb-rtxt p').map(function(i, el) {
//   return $(this).children('b').text()
// }).get()

// const filterr = edgeNetworks.filter((el) => {
//   return el !== '' 
//   && el !== 'Map Key' 
//   && el !== 'Map Key ' 
//   && el !== 'Edge locations' 
//   && el !== 'Regional Edge Caches'
// })

// console.log('Edge Networks > ', filterr)

// const aws = {
//   regions: [
//     {
//       name:'Asia Pacific',
//       edgeNetworks: []
//     },
//     {
//       name: 'North America',
//       edgeNetworks: []
//     },
//     {
//       name: 'South America',
//       edgeNetworks: []
//     },
//     {
//       name: 'Europe/Middle East/Africa',
//       edgeNetworks: []
//     }
//   ]
// }

// aws.regions.forEach(region => {
//   let re = RegExp(`^${region.name}*`)
//   filterr.filter(edgeNets => {
//     let edge = edgeNets
//     if (re.test(edge)) {
//       region.edgeNetworks.push(edge)
//     } else {
//     }
//   })
// })

// console.log(aws.regions)

// const re = RegExp('Asia*')
// const string = 'Asia Pacific'

// console.log(re.test(string))

// const matches = filterr.map((x) => {
//   if (re.test(x)) {
//     return 'found'
//   } else {
//     return 'not found'
//   }
// })

// console.log('matches >>>> ', matches)

}


start()