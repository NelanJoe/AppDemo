var express = require("express");
var router = express.Router();
// ========= SWAGGER =================
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// --- konfigurasi swagger
const options = {
  swaggerDefinition : {
    openapi: "3.0.3",
    info:{
      title: "Dokumentasi API Aplikasi SP5",
      version: "1.0.0",
      description: "Dokumentasi cara menggunakan API aplikasi sp5",
      contact:{
        name: "Nelan Website",
        url: "http://pejuangtahadjud.net",
        email: "subuhan@masjid.net"
      }
    },
    servers:[
      {url:"http://localhost:3000/api"}
    ]
  },
  apis: ['./routes/api.js']
}

const specs = swaggerJsdoc(options);
router.use("/docs",swaggerUi.serve);
router.get("/docs",swaggerUi.setup(specs,{explorer:true})
);



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Assalamualaikum" });
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("./list", function (req, res, next) {
  res.render("santri");
});

router.get("./login", function (req, res, next) {
  res.render("login");
});

router.get("/contact", function (req, res, next) {
  res.render("contact");
  // res.send('NelanJoe[<a href="https://github.com/NelanJoe"> </a>]');
});

module.exports = router;
