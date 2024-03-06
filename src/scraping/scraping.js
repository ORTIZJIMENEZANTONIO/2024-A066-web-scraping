const puppeteer = require('puppeteer');

const scrapeImages = async (req, res) => {
  const { models, url } = req.body;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Esperar a que el selector de las imágenes esté disponible
    await page.waitForSelector('img');

    // Extraer los enlaces de las imágenes
    const imageLinks = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => img.src);
    });

    await browser.close();
    return res.send(imageLinks);
  } catch (error) {
    console.error('Error durante el web scraping:', error);
    return res.send(error);
  }
};

module.exports = { scrapeImages };
