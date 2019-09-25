// Providers list - List configuration to load different data and url, css
const config = require('../config/providers')

// Import providers wrappers
const AWS = require('./providers/aws')
const GCP = require('./providers/gcp')
const Azure = require('./providers/azure')

// Main function
exports.start = async () => {
  console.log('Starting scraper...')

  const providers = {
    // aws: () => { return AWS.scrape(config.aws) },
    // gcp: () => { return GCP.scrape(config.gcp) },
    azure: () => { return Azure.scrape(config.azure) }
  }

  // const scrapeAWS = providers['aws']
  // const scrapeGCP = providers['gcp']
  const scrapeAzure = providers['azure']
  // scrapeAWS()
  // scrapeGCP()
  scrapeAzure()

}

function initializeScraper () {

}