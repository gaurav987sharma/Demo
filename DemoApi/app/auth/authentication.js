const basicAuth = require('basic-auth');
const dotenv = require('dotenv');
dotenv.config('./env');

exports.auth = function (req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    }
    if (user.name === process.env.USERNAME && user.pass === process.env.PASSWORD) {
      next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    }
}