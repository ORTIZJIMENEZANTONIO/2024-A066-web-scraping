const express = require('express');
const { scrapeImages } = require('./src/scraping/scraping');
const app = express();

/* ROUTER IMPORT*/

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => res.json({ msg: 'Nothing to see here 💸' }));

const scrapingRouter = express.Router();
scrapingRouter.post('/imgaes', scrapeImages);

app.use('/scraping', scrapingRouter);

module.exports = app;
