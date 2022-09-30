const authentication = require('../services/auth.services');
var md5 = require('md5');

exports.login = async (req, res) => {
    let results = await authentication.login(req.body.u, md5(req.body.p));
    return res.send({ results }).status(200);
}