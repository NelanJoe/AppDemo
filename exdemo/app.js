var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var app = express();
//json web token
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appsp5'
})


// ================================

// =========middleware body-parser===
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// =====middleware multer (handle upload file)===
var multer = require("multer");
// var upload = multer({dest:'uploads/'});
// rename file
var storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // let id = req.body.id;
    let id = req.params.id;
    cb(null, id + path.extname(file.originalname));
  },
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
});
var upload = multer({ storage: storage });

app.post("/uploadfoto/:id", upload.single("fotoprofile"), (req, res) => {
  let id = req.params.id;
  //simpan ke database
  let sql = "UPDATE santri SET foto=? WHERE id=?";
  let namaFile = req.params.id + path.extname(req.file.originalname);
  con.query(sql, [namaFile, id], (e, s) => {
    if (!e) {
      res.redirect("/santri");
    }
  });
});

// ==================================

app.use(
  session({
    key: "user_sid",
    secret: "users",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
var passport = require("passport");
require('./auth/auth');
var flash = require("connect-flash");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.post(
  "/auth",
  passport.authenticate("local-login", {
    successRedirect: "/santri/admin",
    failureRedirect: "/login",
    failureFlash: true,
  })
  // function(req,res){
  //   res.send('Proses login...'+req.body.email)
  // }
);
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/login", function (req, res) {
  res.render("login", { message: req.flash("loginMessage") });
});

// ===================================

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var santriRouter = require("./routes/santri");
var apiRouter = require("./routes/api");
const { Strategy } = require("passport");
// var contactRouter = require('./routes/contact');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

//definisikan forder static untuk mdl
app.use(
  express.static(path.join(__dirname, "/node_modules/material-design-lite"))
);
app.use(express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/santri", santriRouter);
app.use("/api", apiRouter);
// app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
