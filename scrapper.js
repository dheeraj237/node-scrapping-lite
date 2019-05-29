const cheerio = require('cheerio');
const request = require('request');
const zlib = require('zlib');
const fs = require('fs');
const config = require('./configs/config')

console.log('config ', config)
const amazonUrl = 'https://www.amazon.in/s?k=mens+polo+t+shirt&rh=n%3A1571271031%2Cn%3A1968122031&dc&crid=1YCM5LZ91TPSG&qid=1558927571&rnid=3576079031&sprefix=Mens+po%2Caps%2C258&ref=sr_nr_n_2';
let flipkartUrl = 'https://www.flipkart.com/men/tshirts/pr?sid=2oq%2Cs9b%2Cj9y&otracker=nmenu_sub_Men_0_T-Shirts';

let flipkartHandler = new Promise((resolve, reject) => {
    let flipkartData = [];
    console.log('flipkartUrl ', flipkartUrl)
    request(flipkartUrl, function (error, response, body) {
        if (error) reject(error);
        // console.log('statusCode:', response && response.statusCode);
        response.pipe(fs.createWriteStream('data/flipkart.html'))
        var $ = cheerio.load(body);
        //search items container
        $('._2LFGJH').each(function (items) {
            let productName = $(this).find('._2mylT6').attr('title').toLowerCase().includes('polo') ? $(this).find('._2mylT6').attr('title') : "";
            let productURL = $(this).find('a._2mylT6').attr('href');
            let productPrice = $(this).find('div._1vC4OE').text();
            if (productName && productURL && productPrice) {
                flipkartData.push({
                    'productName': productName,
                    'productURL': 'https://www.flipkart.com' + productURL,
                    'productPrice': productPrice.replace("₹", ""),
                    'platform': 'flipkart'
                });
            }
        });
        // console.log('flipkartData ', allProduct, allProduct.length);
        resolve(flipkartData);
    });
});


let amazonHandler = new Promise((resolve, reject) => {
    let amazonData = [];
    console.log('amazonUrl ', amazonUrl)
    request(amazonUrl, async (error, response, body) => {
        if (error) reject(error);
        if (response.headers['content-encoding'] == 'gzip') {
            await zlib.gunzip(body, function (err, dezipped) {
                if (err) throw err;
                body = dezipped.toString();
            });
        }
        // console.log('statusCode:', response, response.statusCode);
        // response.pipe(fs.createWriteStream('data/amazon.html'))
        var $ = cheerio.load(body);
        //search items container
        $('.s-result-list .sg-row').each(function (idx, el) {
            let productName = $(this).find('.a-size-base-plus').text().toLowerCase().includes('cotton') ? $(this).find('.a-size-base-plus').text() : "";
            let productURL = $(this).find('.a-link-normal').attr('href');
            let productPrice = $(this).find('.a-price-whole').text();
            if (productName && productURL && productPrice) {
                amazonData.push({
                    'productName': productName,
                    'productURL': 'https://www.amazon.in' + productURL,
                    'productPrice': productPrice,
                    'platform': 'amazon'
                });
            };
        });
        // console.log('amazonData ', allProduct, allProduct.length);
        resolve(amazonData);
    });
});
console.log('scrapping...');

module.exports = () => {
    return Promise.all([flipkartHandler, amazonHandler]);
}