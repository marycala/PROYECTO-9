const puppeteer = require('puppeteer')
const fs = require('fs')

const booksArray = []

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.setViewport({ width: 1080, height: 1024 })

  await scrapePage(page)

  await browser.close()
  write(booksArray)
}

const scrapePage = async (page) => {
  const arrayDivs = await page.$$('.product_pod')

  for (const bookDiv of arrayDivs) {
    const title = await bookDiv.$eval('h3 a', (el) => el.getAttribute('title'))
    const image = await bookDiv.$eval('.image_container img', (el) => el.src)
    const priceStr = await bookDiv.$eval('.price_color', (el) =>
      el.innerText.substring(1)
    )
    const price = parseFloat(priceStr) // Convert price to number

    const valorationStr = await bookDiv.$eval('.star-rating', (el) =>
      el.className.split(' ').pop()
    )
    const valorationMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 }
    const valoration = valorationMap[valorationStr] || 0 // Map valoration to a number

    const stock = await bookDiv.$eval('.availability', (el) =>
      el.innerText.trim()
    )

    const book = {
      title,
      image,
      price,
      valoration,
      stock
    }

    booksArray.push(book)
  }

  // Check if there is a next page
  const nextPage = await page.$('.next a')
  if (nextPage) {
    await Promise.all([
      page.click('.next a'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
    await scrapePage(page) // Continue to the next page
  }
}

const write = (booksArray) => {
  fs.writeFile('books.json', JSON.stringify(booksArray, null, 2), (err) => {
    if (err) throw err
    console.log('Archivo escrito')
  })
}

module.exports = { scrapper }
