const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v1');
const categoryDir = '../../../data/aws/categories-services';
const priceDir = '../../../data/aws/pricing';
const util =  require('../../lib/util')
const servicesWithPricing = [];
const missingServices = [];
// loop through all the category services file
fs.readdirSync(categoryDir).forEach(file => {
    console.log('Reading Service File => ', file);
    const services = require(`${categoryDir}/${file}`);
    services.forEach(service => {
        let hasPricingFile = false;
        const servicePath = service.service_path;
        const serviceSlug = (servicePath.substring(1, servicePath.length - 1).replace('-', ''));
        const serviceName = service.service_name;
        const description = service.mini_description;
        const category = service.category;
        const url = service.url;
        const keywords = service.keywords;
        const benefits = service.benefits;
        const pricing = [];

        console.log('Reading Category: ', category.service_name, ':', serviceSlug);
        fs.readdirSync(priceDir).forEach(pricingFile => {
            const pricingServiceName = pricingFile.split('-')[0];
            // if we have file, lets construct the service+pricing json for indexing.
            if (pricingServiceName === serviceSlug) {
                hasPricingFile = true;
                const service = extractServiceRegionCity(pricingFile);
                const servicePrice = require(`${priceDir}/${pricingFile}`)
                console.log('File', pricingFile, serviceSlug, serviceName);
                servicesWithPricing.push({
                    id: uuid(),
                    provider: 'AWS',
                    service_path: servicePath,
                    service_full_name: serviceName,
                    service_short_name: serviceSlug,
                    description: description,
                    category: category,
                    url: url,
                    keywords: keywords,
                    benefits: benefits,
                    pricing: JSON.stringify(servicePrice),
                    ...service,
                })
            }
        });

        if (!hasPricingFile) {
            console.log('No matching pricing file for ', category.service_name, ':', serviceSlug)
            missingServices.push(`${category.service_name} ${serviceSlug}`)
        }
    })
});

fs.writeFile('index.json', JSON.stringify(servicesWithPricing), 'utf8', (error) => {
    if (error)
        console.error(error)

    console.log('Index file created successfully!');
    console.log(missingServices)
});

function extractServiceRegionCity(fileName) {
    const service = {};
    // Remove .json from file and split the text s3-asia-pacific-hong-kong.json into parts
    const parts = fileName.replace('.json','').split('-');
    switch(parts.length) {
        case 5:
            service.service_name = parts[0];
            service.region = util.titleCase(`${parts[1]} ${parts[2]}`);
            service.city = util.titleCase(`${parts[3]} ${parts[4]}`);
            break;
        case 4:
            service.service_name = parts[0];
            service.region = util.titleCase(`${parts[1]} ${parts[2]}`);
            service.city = util.titleCase(`${parts[3]}`);
            break;
        case 3:
            service.service_name = parts[0];
            service.region = util.titleCase(`${parts[1]}`);
            service.city = util.titleCase(`${parts[2]}`);
            break;
        case 2:
            service.service_name = parts[0];
            service.region = util.titleCase(`${parts[1]}`);
            break;
        case 1:
            console.log('1: DID NOT MATCH any')
            break;
        default:
            console.log('default: DID NOT MATCH any')
            break;
    }

    return service;
}