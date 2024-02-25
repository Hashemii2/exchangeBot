const getCryptoCurrency = require('./getCryptoCurrency');

async function findCryptoCurrency(name) {
  const getCrypto = await getCryptoCurrency();

  const foundCrypto = await getCrypto.find((item) => item.ارز == name);

  let result = '';

  for (let key in foundCrypto) {
    result += `${key} ${foundCrypto[key]}\n`;
  }
  console.log(result);
  return result;
}

module.exports = findCryptoCurrency;
