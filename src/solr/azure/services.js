/**
 * Just extract AWS Services to be indexed in Solr.
*/

const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid/v1');
const categoryDir = '../../../data/azure/categories-services';
const azureServices = [];
// loop through all the category services file
fs.readdirSync(categoryDir).forEach(file => {
    console.log('Reading Service File => ', file);
    const services = require(`${categoryDir}/${file}`);
    services.forEach(service => {
        if (file !== 'undefined.json') {
            const servicePath = service.service_path;
            // const serviceSlug = (servicePath.substring(1, servicePath.length - 1).replace('-', ''));
            const serviceName = service.service_name;
            // const serviceShortName = service.service_short_name;
            const description = service.description;
            const category = service.category;
            const url = service.url;
            const keywords = service.keywords;
            const benefits = service.benefits;
            azureServices.push({
                id: uuid(),
                provider: 'Microsoft Azure',
                service_path: servicePath,
                service_full_name: serviceName,
                // service_short_name: serviceShortName,
                description,
                category,
                url,
                keywords,
                benefits,
            })
        }
    })
});

fs.writeFile('services.json', JSON.stringify(azureServices, null, 2), 'utf8', (error) => {
    if (error)
        console.error(error)

    console.log('Services file created successfully!');
});
