const cheerio = require('cheerio')

exports.$ = (htmlData) => cheerio.load(htmlData)