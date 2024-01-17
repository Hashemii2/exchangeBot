const getDigitalCurrency = require('./DigitalCurrency');

async function findDigitalCurrency(name) {
  const getDigital = await getDigitalCurrency();

  const foundDigital = await getDigital.find((item) => item.ارز == name);

  let result = '';

  for (let key in foundDigital) {
    result += `${key} ${foundDigital[key]}\n`;
  }
  console.log(result);
  return result;
}

module.exports = findDigitalCurrency;
