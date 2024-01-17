const getExchageRate = require('./exRateScraper');

async function getAllCurrency() {
  const allCurr = await getExchageRate();

  let result = '';

  for (let key in allCurr) {
    result += `${allCurr[key].ارز}\nقیمت ${allCurr[key].قیمت}\nمیزان تغییر ${allCurr[key].تغییرات}\n\n`;
  }

  return result;
}

// getAllCurrency();
module.exports = getAllCurrency;
