const getCryptoCurrency = require('./getCryptoCurrency');

async function getAllCryptoCurrency() {
  const allCryptoCurrency = await getCryptoCurrency();

  let result = '';

  for (let key in allCryptoCurrency) {
    result += `${allCryptoCurrency[key].ارز}\nقیمت ریالی ${allCryptoCurrency[key].ریالی}\nقیمت دلاری ${allCryptoCurrency[key].دلاری}\nمیزان تغییرات ${allCryptoCurrency[key].تغییرات}\n\n`;
  }

  return result;
}

module.exports = getAllCryptoCurrency;
