var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "appsp5",
});

//list all
exports.users_list = async function () {
  //query ke tabel users
  let sql = "SELECT * FROM users";
  return new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (!err) {
        console.log("Suksess:", result);
        resolve(result);
      } else {
        console.log("Terjadi kesalahan:", err);
        resolve([]);
      }
    });
  });
};

//detail users
exports.users_detail = function (id) {
  //query ke tabel users
  let sql = "SELECT * FROM users WHERE id=?";
  return new Promise((resolve) => {
    connection.query(sql, [id], (err, result) => {
      if (!err) resolve(result);
    });
  });
};

//tambah users
exports.users_add = function (users) {
  //query ke tabel users
  let sql = "INSERT INTO users(email,password) values(?,?)";
  return new Promise((resolve) => {
    connection.query(sql, [users.email, users.password], (err, result) => {
      if (!err) resolve(result);
    });
  });
};

//ubah users
exports.users_update = function (users, id) {
  //query ke tabel users
  let sql = "UPDATE users set email=?,password=? WHERE id=?";
  return new Promise((resolve) => {
    connection.query(sql, [users.email, users.password, id], (e, r) => {
      if (!e) resolve(r);
    });
  });
  // return[];
};

//hapus users
exports.users_delete = function (id) {
  //query ke tabel users
  let sql = "DELETE FROM users WHERE id=?";
  return new Promise((resolve) => {
    connection.query(sql, [id], (e, r) => {
      if (!e) resolve(r);
    });
  });
};

//upload foto users
// exports.users_upload  = function(foto) {
//     //query ke tabel users
//     let sql = "SELECT * FROM users";
//     return[];
// }
