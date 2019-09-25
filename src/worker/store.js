  /**
   * Store.js
   * This library will execute database operations of inserting, updating and deleting records and collections
   */

  const _ = require('lodash')
  const mongos = require('../lib/mongo')
  const util = require('../lib/util')
  const sP = require('../../data/aws/service-pricing.json')
  const AWS = require('../../data/aws/provider.json')
  const categories = require('../config/categories')


  let client
  async function store () {
    try {
      client = await mongos.mongoConnect()
      const result = await client.collection('test').insertMany(sP.services)
      
      if (result.insertedCount > 1) {
        console.log('inserted successfully')
      }
    } catch (error) {
      console.error('Error inserting multiple records to database > ', error)
      process.exit()
    }
  }

  async function createCollections () {
    try {
      client = await mongos.mongoConnect()
      for (const value of categories) {
        console.log(util.slugify(value.name))
        await client.createCollection(util.slugify(value.name))
      }

    } catch (error) {
      console.error('Error inserting multiple records to database > ', error)
      process.exit()
    }
  }

  async function insertData () {
    try {
      client = await mongos.mongoConnect()
      const categories = _.groupBy(AWS.services, 'category')
      let result
      for (const value in categories) {
        console.log(categories[value])
        // result = await client.collection(util.slugify(value)).insertMany(categories[value])
      
        // if (result.insertedCount > 1) {
        //   console.log('inserted successfully', )
        // }
      }

    } catch (error) {
      console.error('Error inserting multiple records to database > ', error)
      process.exit()
    }
  }

  exports.insert = async (data) => {
    try {
      // client = await mongos.mongoConnect()
      let result
      result = await client.collection('pricing-aws').insertOne(data)
      
      if (result.insertedCount > 1) {
        console.log('inserted successfully', )
      }

    } catch (error) {
      console.error('Error inserting single record to database > ', error)
      process.exit()
    }
  }

  async function removeCollection (collections) {
    try {
      client = await mongos.mongoConnect()
      const result = await client.collection(collections).deleteMany({})
      console.log(result.deletedCount)
      if (result.deletedCount > 0) {
        console.log('collection records deleted successfully')
      } else {
        console.log('collection records have been previous deleted. Do something else!')
      }
    } catch (error) {
      console.error('Error deleting records in collection > ', error)
      process.exit()
    }
  }

  // store()
  // createCollections()
  // insertData()
  removeCollection('pricing-aws')
