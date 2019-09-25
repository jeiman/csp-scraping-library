/**
 * Index to Solr
 */

const SolrNode = require('solr-node');
const client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'csp-services', // give the correct core name here
    protocol: 'http'
});

// Read AWS Indexing data
const awsServices = require('./azure/services.json')
awsServices.map(service => {
    // Update document to Solr server
    client.update(service, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });
});