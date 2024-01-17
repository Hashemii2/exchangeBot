const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');

async function getExchageRate() {
  const { data } = await axios.get('https://www.tgju.org');

  const $ = cheerio.load(data);
  let list = [];

  $(
    'div.index-tabs-data.bootstrap-fix > div > div.col-12.col-lg-12.col-xl-6.index-tabs-data-col-1 > table > tbody > tr'
  ).each((_, p) => {
    const data = $(p);

    const currency = {
      ارز: '',
      قیمت: '',
      تغییرات: '',
      کمترین: '',
      بیشترین: '',
      زمان: '',
    };

    const obj = { ',': '', '\n\n': ',' };

    let name = data.find('tr th').text().trim();
    let info = data.find('tr td').text().trim();

    info = info.replace(/,|\n\n/g, (x) => obj[x]).split(',');

    currency.ارز = name;
    currency.قیمت = info[0];
    currency.تغییرات = info[1];
    currency.کمترین = info[2];
    currency.بیشترین = info[3];
    currency.زمان = info[4];

    list.push(currency);
  });

  return list;
}

module.exports = getExchageRate;
