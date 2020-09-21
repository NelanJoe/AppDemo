var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/contact", function (req, res, next) {
  //   res.render('bla bla')
  res.send('NelanJoe[<a href="https://github.com/NelanJoe"> </a>]');
});

module.exports = router;
