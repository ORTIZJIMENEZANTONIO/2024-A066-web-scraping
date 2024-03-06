const express = require('express');
const { searchImages } = require('./src/scraping/scraping');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ msg: 'Nothing to see here 💸' }));

const scrapingRouter = express.Router();
scrapingRouter.post('/images', searchImages);

app.use('/scraping', scrapingRouter);

module.exports = app;
