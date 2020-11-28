const { Telegraf } = require('telegraf');
require('dotenv').config();
const Markup = require('telegraf/markup');
const countries = require('./countries');

const api = require('covid19-api');
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`
Welcome ${ctx.message.from.first_name}`, Markup.keyboard([
    ['US', 'Russia'],
    ['Kazakhstan', 'Ukraine']
]).extra()

));

bot.help((ctx)=>{
    ctx.reply(countries);
})

bot.on('text', async(ctx) => {
    try{
        let data = {};
        let userMsg = ctx.message.text;
        data = await api.getReportsByCountries(userMsg);
        let formatData = `
Country: ${data[0][0].country}
Cases: ${data[0][0].cases}
Deaths: ${data[0][0].deths}
Recovery: ${data[0][0].recovered}
        `
        
        ctx.reply(formatData);
    }catch{
        ctx.reply('Country Not Found');
    }

});

bot.launch()