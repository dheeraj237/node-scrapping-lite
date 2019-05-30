const storage = require('node-persist');

(async () => {
    await storage.init({
        dir: __dirname + '/data',
        stringify: JSON.stringify,
        parse: JSON.parse,
        // encoding: 'utf8',
    })
    await storage.setItem('products', [])
    console.log('[Strorage Iniitialized]');
})();

module.exports = storage;