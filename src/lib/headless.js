/**
 * Headless library
 */

const chromeLauncher = require('chrome-launcher')
const CDP = require('chrome-remote-interface')
require('events').EventEmitter.defaultMaxListeners = 225 // This is to allow Node.js to listen in on any number of listeners for the for loop to run headless chrome

// Global variable
const outcome = {}

exports.start = async (data) => {
  async function launchChrome() {
    return await chromeLauncher.launch({
      chromeFlags: [
        '--disable-gpu',
        '--headless'
      ]
    })
  }

  const chrome = await launchChrome()
  const protocol = await CDP({
    port: chrome.port
  })

  const {
    DOM,
    Page,
    Emulation,
    Runtime
  } = protocol

  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()])

  // Loop through the array of urls and querySelectors and retrieves all pricing for the services

  for (let value of data) {
    let ss = await scrape(value.pricing_url, value.qSelect, Page, Runtime)
    console.log('SS => ', ss);
    value.singam = ss
  }

  data.forEach((x) => {
    console.log(x.singam)
  })

  // await scrape(data, Page, Runtime)

  // Kill the process after collecting values
  protocol.close()
  chrome.kill()

  // Return the outcome back to the parent scope for further processing
  return outcome
}

async function scrape(url, querySelector, Page, Runtime) {
  // const outcome = {}

  try {
    console.log('URL', url)
    await Page.navigate({
      url: url
    })

    return new Promise((resolve, reject) => {
      return Page.loadEventFired(async() => {
        try {
          const script1 = `document.querySelector('${querySelector}').textContent`
          const result = await Runtime.evaluate({
            expression: script1
          })

          if (result.result.value) {
            outcome['value'] = result.result.value
            resolve(outcome['value'])
          } else {
            resolve(false)
          }
        } catch (error) {
          reject(error)
        }
      })

    })
    // .then(() => {
    //   return outcome
    // })

  } catch (error) {
    console.log('what broke>?', error)
  }
}