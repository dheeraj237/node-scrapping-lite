const storage = require('node-persist');

(async () => {
    await storage.init({
        dir: __dirname + '/storage',
        stringify: JSON.stringify,
        parse: JSON.parse,
        // encoding: 'utf8',
    })
    console.log('[Strorage Iniitialized]'); // yourname
})();

module.exports = storage;