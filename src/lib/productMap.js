/**
 * Product Map library
 * This library is simply to map each service to a product, returning the following output
 * 
 * {
    provider: aws,
    product_type: analytics,
    service_name: AWS Athena,
    category: ''
    .....,
}
 */

exports.productMap = (services, categories) => {
  services.forEach(service => {
    categories.filter(prod =>  {
      if (prod.services.includes(service.service_name)) {
        service.category = prod.name
      }
      return service
    })
  })
}