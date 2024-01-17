const axios = require('axios');
const cheerio = require('cheerio');

async function stockMarketScraper() {
  let market = '';

  try {
    const { data } = await axios.get(
      'http://tsetmc.com/Loader.aspx?ParTree=15'
    );

    const $ = cheerio.load(data);

    $('#TseTab1Elm > div.box1.blue > div.content > table > tbody').each(
      (_, p) => {
        const data = $(p);

        const negativeMarket = data.find('tr > td > div.mn').text();

        const allData = data.find('tr > td').text().replace(/,/g, '');

        let floatNumbers = [];

        const splitFloatnumber = allData.match(/[\d\.]+|\D+/g);

        for (let index = 0; index < splitFloatnumber.length; index++) {
          if (!isNaN(parseFloat(splitFloatnumber[index])))
            floatNumbers.push(splitFloatnumber[index]);
        }

        let tChange = '';
        let wChange = '';

        if (negativeMarket.length > 0) {
          negativeMarket.indexOf(floatNumbers[1]) > -1
            ? (tChange = -Math.abs(floatNumbers[1]))
            : floatNumbers[1];

          negativeMarket.indexOf(floatNumbers[3]) > -1
            ? (wChange = -Math.abs(floatNumbers[3]))
            : floatNumbers[3];
        } else {
          tChange = floatNumbers[1];
          wChange = floatNumbers[3];
        }

        market += `شاخص کل ${floatNumbers[0]}\nتغییرات شاخص کل ${tChange}\n\n شاخص کل هم وزن ${floatNumbers[2]}\nتغییرات هم وزن ${wChange}`;
      }
    );
  } catch (err) {
    console.log(err);
  }

  return market;
  //   console.log(market);
}

module.exports = stockMarketScraper;
// stockMarketScraper();
