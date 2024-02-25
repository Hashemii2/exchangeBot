const { Telegraf } = require('telegraf');
const findCurrency = require('./currency');
const getAllCurrency = require('./allCurrency');
const findCryptoCurrency = require('./findCryptoCurrency');
const getAllCryptoCurrency = require('./getAllCryptoCurrency');
const Stock = require('./stockScraper');
const { apiKey } = require('./config');

const bot = new Telegraf(apiKey);

let arrBot = ['جانم', 'بله', 'بله عزیزم', 'امر بفرمایید', 'در خدمتم'];
let arrHi = ['سلام', 'سلام عزیزم', 'درود', 'هی', 'خوبی', 'چطوری'];
let arrBy = [
  'از استفاده شما از بات متشکرم. خدانگهدار',
  'بای',
  'خدانگهدار عزیزم',
  'بدرود',
  'منتظر بازگشت شما هستیم',
  'بای بای',
];

let arrInsult = ['بی ادب', 'خودتی', 'خوک'];

function getRandomInt(num) {
  return Math.floor(Math.random() * num);
}

bot.command('start', (ctx) => {
  console.log(ctx.message);

  // bot.telegram.sendMessage(
  //   ctx.chat.id,
  //   `Hello ${ctx.from.first_name} Welcome to my Funny bot.\n\nsay me سلام or call me with the name ربات and i reach you Soon.\nthat is funny and ridiculous:) yes? youre right, but that is it for now.:)\n\nthe main goal of this bot is to send you the latest news of the Currency Market and Stock exchange and I will work on this goal very Soon, Be Patient`,
  //   {}
  // );

  bot.telegram.sendMessage(
    ctx.chat.id,
    `سلام ${ctx.from.first_name} به فانی بات خوش آمدید.
    \n\nبه من سلام کنید یا منو صدا کنید تا خیلی زود به شما پاسخ دهم. در این ربات می توانید اخرین قیمت انواع ارز را دریافت کنید. با نوشتن نام ارز مورد خود اخرین قیمت ان را دریافت کنید. سپاسگزاریم\n`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'help', callback_data: 'help' }],
          [{ text: 'feedback', callback_data: 'feedback' }],
        ],
      },
    }
  );
});

bot.hears(/سلام|هلو|خوبی|های/, (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, arrHi[getRandomInt(6)], {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears(/ربات|بات|علو|الو|کجایی|کوشی/, (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, arrBot[getRandomInt(5)], {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears(/بای|خدافسی|خدافس|خدانگهدار|بدرود/, (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, arrBy[getRandomInt(5)], {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears(/عوضی/, (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, arrInsult[getRandomInt(3)], {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('دلار', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await findCurrency('دلار'), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('یورو', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await findCurrency('یورو'), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('پوند', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await findCurrency('پوند انگلیس'), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('نرخ ارز', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await getAllCurrency(), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('بیت کوین', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await findCryptoCurrency('بیت کوین'), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('اتریوم', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await findCryptoCurrency('اتریوم'), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears('ارز دیجیتال', async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await getAllCryptoCurrency(), {
    reply_to_message_id: ctx.message.message_id,
  });
});

bot.hears(/بورس/, async (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, await Stock(), {
    reply_to_message_id: ctx.message.message_id,
  });
});

// bot.on('text', async (ctx) => {
//   bot.telegram.sendMessage(
//     ctx.from.id,
//     '.برای مشاهده قیمت و تغییرات ارز مورد نظر خود، "ارز دیجیتال" و یا "نرخ ارز" را تایپ و ارسال کنید. پس از آن برای دریافت داده ها چند ثانیه صبر کنید. و همچنین جهت مشاهده دستورالعمل بات گزینه help را انتخاب نمایید. متشکرم.',
//     {
//       reply_to_message_id: ctx.message.message_id,
//     }
//   );
// });

bot.action('help', (ctx) => {
  ctx.deleteMessage();

  bot.telegram.sendMessage(
    ctx.chat.id,
    'برای استفاده از ربات بر روی /start کلیک کنید و جهت دریافت آخرین قیمت نرخ ارز، نرخ ارز مورد نظر خود را ارسال نمایید و چند ثانیه صبر کنید تا داده ها را برای شما ارسال کنیم. و برای مشاهده قیمت تمامی ارزها "ارز دیجیتال" و یا "نرخ ارز" را ارسال نمایید.'
  );
});

bot.action('feedback', (ctx) => {
  ctx.deleteMessage();

  bot.telegram.sendMessage(
    ctx.chat.id,
    'برای ارسال نظر خود بر روی bot کلیک کرده و سپس پیغام خود را ارسال نمایید.',
    {
      reply_markup: {
        inline_keyboard: [[{ text: 'bot', callback_data: 'Bot' }]],
      },
    }
  );
});

bot.action('Bot', (ctx) => {
  ctx.deleteMessage();

  bot.telegram.sendMessage(
    ctx.chat.id,
    'پیشنهادات خود را جهت بهبود ربات با ما در میان بگذارید. پیشاپیش از هر گونه انتقاد و پیشنهاد شما متشکریم.',
    {}
  );
});

bot.launch();
