const data = require('..')
const assert = require('assert')

describe('list of aws products', function() {
  it('should be available as a JS object', function() {
    assert.equal(data.itemListElement.filter(itemListElement => itemListElement.item.name === 'JavaScript').length, 1)
  })
})
