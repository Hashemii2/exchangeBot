const axios = require('axios');
const cheerio = require('cheerio');

async function getCryptoCurrency() {
  const { data } = await axios.get('https://www.tgju.org/');

  const $ = cheerio.load(data);
  let list = [];
  $(
    'div.index-tabs-content.crypto-overview-content.active > div.index-tabs-data.crypto-tabs-mobile2 > table > tbody > tr'
  ).each((_, p) => {
    const data = $(p);

    const currency = {
      ارز: '',
      ریالی: '',
      دلاری: '',
      تغییرات: '',
      کمترین: '',
      بیشترین: '',
      زمان: '',
    };

    let name = data.find('tr th').text().trim();
    let info = data.find('tr td').text().trim().split('\n\n');

    currency.ارز = name;
    currency.ریالی = info[0];
    currency.دلاری = info[1];
    currency.تغییرات = info[2];
    currency.کمترین = info[3];
    currency.بیشترین = info[4];
    currency.زمان = info[5];

    list.push(currency);
    // console.log(list);
  });

  return list;
}

// getCryptoCurrency();

module.exports = getCryptoCurrency;
