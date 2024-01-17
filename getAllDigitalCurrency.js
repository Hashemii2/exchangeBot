const getDigitalCurrency = require('./DigitalCurrency');

async function getAllDigitalCurrency() {
  const allDigCurrency = await getDigitalCurrency();

  let result = '';

  for (let key in allDigCurrency) {
    result += `${allDigCurrency[key].ارز}\nقیمت ریالی ${allDigCurrency[key].ریالی}\nقیمت دلاری ${allDigCurrency[key].دلاری}\nمیزان تغییرات ${allDigCurrency[key].تغییرات}\n\n`;
  }

  return result;
}

module.exports = getAllDigitalCurrency;
