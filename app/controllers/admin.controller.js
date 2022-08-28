const admin = require('../services/admin.services');
const products = require('./products.controller');

const getFirstLetter = (words) => {
    let matches = words.match(/\b(\w)/g);
    return matches.join('').toUpperCase();
}

const delay = (t, data) => {
    return new Promise(resolve => {
        setTimeout(resolve, t, data);
    });
}

exports.resetProductCodes = async (req, res) => {
    await admin.clearCodes()
    let prods = await admin.getDetails()
    for (let i = 0; i < prods.length; i++) {
        let c = getFirstLetter(prods[i].category)
        let sc = getFirstLetter(prods[i].subcategory)
        let code = await products.getNC(c + sc)
        await admin.updateCodes(prods[i].id, code)
        await delay(1000)
    }
    return await res.send({ "re": "running code reset.. " }).status(200);
}