const puppeteer = require('puppeteer');
const { sendError, sendSuccess } = require('../../mixinis/response-mixins');

const extractImagesFromURL = async (searchTerms, url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const imageUrls = [];

  try {
    for (const searchTerm of searchTerms) {
      // Navegar a la página de Amazon con la palabra clave de búsqueda actual
      await page.goto(`${url}/s?k=${searchTerm}&ref=nb_sb_noss_2`);

      // Esperar a que se carguen las imágenes
      await page.waitForSelector('.s-image');

      // Extraer URLs de las imágenes
      const urls = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('.s-image'));
        return images.map(img => img.src);
      });

      // Agregar las URLs de las imágenes encontradas al array principal
      imageUrls.push(...urls);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cerrar el navegador después de completar la extracción de imágenes
    await browser.close();
  }

  return imageUrls;
};

const searchImages = async (req, res) => {
  const { search, url } = req.body;

  return extractImagesFromURL(search, url)
    .then(imageUrls => {
      return sendSuccess(res, imageUrls);
    })
    .catch(error => {
      console.error('Error:', error);
      return sendError(res, error);
    });
};

module.exports = { searchImages };
