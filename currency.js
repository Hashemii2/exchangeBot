const getExchageRate = require('./exRateScraper');

async function findCurrency(currency) {
  const response = await getExchageRate();

  const foundCurrency = await response.find((res) => res.ارز == currency);

  let result = '';

  for (let key in foundCurrency) {
    result += `${key} ${foundCurrency[key]}\n`;
  }

  return result;
}

module.exports = findCurrency;
