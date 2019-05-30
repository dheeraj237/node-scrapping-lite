const cheerio = require('cheerio');
const request = require('request');
const zlib = require('zlib');
const config = require('./configs/config')

const amazonUrl = config.amazonUrl;
let flipkartUrl = config.flipkartUrl;

let flipkartHandler = new Promise((resolve, reject) => {
    let flipkartData = [];
    request(flipkartUrl, async (error, response, body) => {
        if (error) reject(error);
        if (response.headers['content-encoding'] == 'gzip') {
            await zlib.gunzip(body, function (err, dezipped) {
                if (err) throw err;
                body = dezipped.toString();
            });
        }
        // console.log('statusCode:', response && response.statusCode);
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
    request(amazonUrl, async (error, response, body) => {
        if (error) reject(error);
        if (response.headers['content-encoding'] == 'gzip') {
            await zlib.gunzip(body, function (err, dezipped) {
                if (err) throw err;
                body = dezipped.toString();
            });
        }
        // console.log('statusCode:', response, response.statusCode);
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
console.log('[Scrapping]...');

module.exports = () => {
    return Promise.all([flipkartHandler, amazonHandler]);
}