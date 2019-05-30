var cron = require('node-cron');
const config = require('./configs/config');
const scrapper = require('./scrapper');
const storage = require('./storage')

console.log('[Cron Job Started]', new Date().toString())
cron.schedule('*/5 * * * *', async () => {
    await storage.setItem('lastUpdated', new Date().toString())
    console.log('========================================');
    scrapper()
        .then((data) => {
            storage.setItem('products', [...data[0], ...data[1]])
        })
        .catch((err) => {
            console.log(err);
        })
    console.log('[Update Product]:', await storage.getItem('lastUpdated'));
});