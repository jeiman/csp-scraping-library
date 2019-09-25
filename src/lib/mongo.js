const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

// export async function connect(url) {
//   return await MongoClient.connect(url, { useNewUrlParser: true })
// }

exports.mongoConnect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb+srv://jeiman:ZWfYA959ZfYXMIg1@jeiman-projects-zhm7e.mongodb.net/css?authSource=admin', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log('Error connecting to MongoDB >> ', err)
        reject(err)
      } else {
        resolve(client.db('css')) // Initiate MongoDB with the database name
      }
    })
  })
}