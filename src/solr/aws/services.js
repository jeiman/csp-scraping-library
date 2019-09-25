/**
 * Just extract AWS Services to be indexed in Solr.
*/

const fs = require('fs');
const uuid = require('uuid/v1');
const categoryDir = '../../../data/aws/categories-services';
const awsServices = [];
// loop through all the category services file
fs.readdirSync(categoryDir).forEach(file => {
    console.log('Reading Service File => ', file);
    const services = require(`${categoryDir}/${file}`);
    services.forEach(service => {
        const servicePath = service.service_path;
        const serviceSlug = (servicePath.substring(1, servicePath.length - 1).replace('-', ''));
        const serviceName = service.service_name;
        const description = service.mini_description;
        const category = service.category;
        const url = service.url;
        const keywords = service.keywords;
        const benefits = service.benefits;
        awsServices.push({
            id: uuid(),
            provider: 'AWS',
            service_path: servicePath,
            service_full_name: serviceName,
            service_short_name: serviceSlug,
            description,
            category,
            url,
            keywords,
            benefits,
        })
    })
});

fs.writeFile('services.json', JSON.stringify(awsServices), 'utf8', (error) => {
    if (error)
        console.error(error)

    console.log('Services file created successfully!');
});
