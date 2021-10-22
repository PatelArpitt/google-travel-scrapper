const rp = require('request-promise')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const select = require ('puppeteer-select')
const chalk = require('chalk')
const fs = require('fs')
const download = require('download')
var country_list = require('./resources/list.json')

const Country = require('./models/country.model')
// const url = 'https://www.reddit.com';
// const url = 'https://imgur.com/';
// const url = 'https://www.google.com/travel/things-to-do';
const url = 'https://www.google.com/travel/things-to-do/';
var country
var pages
var country_name
var description
var all_top_sights = []
var top_sight = {}
var top_sight_desc = {}
var image
var download_count = 0

const db = require("./models")
db.mongoose
    .connect(db.url, {
        useNewurlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the 'google-travel-db' Database!");
    })
    .catch(err => {
        console.log("Error while connecting to 'google-travel-db' Database.", err);
        process.exit()
    })      
      
// request("https://www.bullion-rates.com/gold/INR/2007-1-history.htm", (err, res, html) => {
//     if(!err && res.statusCode == 200) {
//         const $ = cheerio.load(html)
//         const datarow = $(".HeaderRow")
//         const output = datarow.find("th").text()

//         $(".DataRow").each((i, data) => {
//             const item = $(data).text()
//             const item2 = $(data).text()
//             const item3 = $(data).text()
            
//             console.log('item1', item, '   item2', item2, '   item3', item3, '   output', output);
//         })
//     }
// })

// request("https://www.google.com/travel/things-to-do?dest_mid=%2Fm%2F07f1x&dest_state_type=main&dest_src=yts&tcfs=EhQKCC9tLzA3ZjF4EghUaGFpbGFuZA#ttdm=7.995356_99.097913_5", (err, res, html) => {
//     if(!err && res.statusCode == 200) {
//         const $ = cheerio.load(html)
//         console.log(html);
//         const datarow = $(".FastGrid")
//         const output = datarow.find("a").attr('href')
//         console.log('output', output)

//             $(".FastGrid").each((i, data) => {
//             const item = $(data).attr('href')
//             const item2 = $(data).attr('href')
//             const item3 = $(data).attr('href')
            
//             console.log('item1', item, '   item2', item2, '   item3', item3, '   output', output);
//         })
//     }
// })

// rp(url)
//   .then(function(html){
//     //success!
//     console.log(html);
//   })
//   .catch(function(err){
//     //handle error
//   });

//WORKING

// country = country_list[0].name
// console.log(country);

puppeteer
.launch({ ignoreHTTPSErrors: true, headless: false })
.then(function(browser) {
  console.log('3');
  reset = browser.newPage()
  search_country(browser.newPage())
  console.log(browser.newPage());
  // return browser.newPage();
})

for(i = 0; i < country_list.length; i++) {
  console.log(chalk.yellow('Country No.'), i+1);
  console.log(chalk.green('Country Name'), country_list[i].name);
  country = country_list[i].name
  process.exit()

  // async function search_country(page) {
  .then(function(page) {
    // console.log('2');
      return page.goto(url).then(function() {
        (async () => {
          await Promise.all([
            await page.waitForSelector('#oA4zhb'),
            await page.type('#oA4zhb', country),
            await page.keyboard.press('Enter'),
            await page.waitForNavigation(),
            page.goto(await page.url())
          ]);
          pages = await page
          scrapper(await page.content())
        }) ()
      });
    })
    async function scrapper(html) {
      // console.log('1');
      var $ = cheerio.load(html)
      
    country_name = $('h1').text()
    description = $('.IFfE8d').text()

    var url_src = $('.XzK3Bf').find('img').attr('src')
    var file = url_src;
    var fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.jpg';
    var filePath = './public/images/';
    
    (async () => {   
      // fs.writeFileSync(filePath + fileName, await download(file));
      download(file).pipe(fs.createWriteStream(filePath + fileName));
      download_count = download_count + 1
      console.log('Downloaded Image of country Id:', download_count);
      image = '/public/images/' + fileName
    }) ()

    see_all_sights()
      
    async function see_all_sights () {
      (async () => {
        await pages.screenshot({path: 'screenshotbe4.png'});
        await Promise.all([
          await pages.waitForSelector('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div'),
          await pages.click("#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div")
        ]);
        await pages.setDefaultNavigationTimeout(0)
        console.log('completed')
        await pages.goto(pages.url())
        await pages.content()
        await pages.screenshot({ path: 'screenshotnew2.png' })
    
    var $ = cheerio.load(await pages.content())
    
    $(".f4hh3d > div > div > div > div").each((i, data) => {
      top_sight = $(data).find('div:first').text()
      top_sight_desc = $(data).find('div:last').text()
      if(top_sight && top_sight_desc) {
        all_top_sights.push(top_sight + ' - ' + top_sight_desc)
      } else if (top_sight) {
        all_top_sights.push(top_sight)
      }
    })
    console.log('Saving to DB!');
    country = new Country()
    country.country_name = country_name
    country.description = description
    country.image = image
    country.top_sights = all_top_sights
    // console.log(country);
    country.save()
    console.log('Total Countries Scraped :', download_count);
  }) ()
}
  

}
}



  // .catch(function(err) {
  //   //handle error
  // });


// puppeteer
//   .launch()
//   .then(function(browser) {
//       console.log('3');
//     return browser.newPage();
//   })
//   .then(function(page) {
//       console.log('2');
//       return page.goto(url).then(function() {
//       // console.log('before', page);
//       // page.click("#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div > button")
//       // console.log('after', page);
//       const element = select(page).getElement('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div > button');
//       console.log('element', element);
//       element.click()
//       return page.content();
//     });
//   })


  // .then(function(country) {
  //   console.log('Saving to DB!');
  //   country = new Country()
  //   country.country_name = country_name
  //   country.description = description
  //   country.image = image
  //   country.top_sights = all_top_sights
  //   console.log(country);
  //   country.save()
  //   console.log('Total Countries Scraped :', download_count);
  // })
  // .catch(function(err) {
  //   //handle error
  // });

//   async function run () {
//     const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: false });
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.screenshot({path: 'screenshotbe4.png'});
//     await Promise.all([
//       await page.waitForSelector('#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div'),
//       await page.click("#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div:nth-child(2) > div.GtiGue.wB1u7d > div > div")
//     ]);
//     await page.setDefaultNavigationTimeout(0)
//     await page.screenshot({ path: 'screenshotnew4.png' })
//     // browser.close()
//     console.log('completed');
// }
// run();

"https://www.google.com/travel/things-to-do?dest_mid=%2Fm%2F03rk0&dest_state_type=main&dest_src=yts&tcfs=EhEKCC9tLzAzcmswEgVJbmRpYQ#ttdm=19.753559_77.299159_3&ttdmf=%252Fm%252F07kctys"
"https://www.google.com/travel/things-to-do/see-all?dest_mid=%2Fm%2F03rk0&dest_state_type=sattd&dest_src=yts&tcfs=EhEKCC9tLzAzcmswEgVJbmRpYQ#ttdm=25.166810_78.014763_5&ttdmf=%25252Fm%25252F081jv3"