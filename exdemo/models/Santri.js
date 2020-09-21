var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "appsp5",
});

//list all
exports.santri_list = async function () {
  //query ke tabel santri
  let sql = "SELECT * FROM santri";
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

//detail santri
exports.santri_detail = function (id) {
  //query ke tabel santri
  let sql = "SELECT * FROM santri WHERE id=?";
  return new Promise((resolve) => {
    connection.query(sql, [id], (err, result) => {
      if (!err) resolve(result);
    });
  });
};

//tambah santri
exports.santri_add = function (santri) {
  //query ke tabel santri
  let sql = "INSERT INTO santri(nama,hp,asal) values(?,?,?)";
  return new Promise((resolve) => {
    connection.query(
      sql,
      [santri.nama, santri.hp, santri.asal],
      (err, result) => {
        if (!err) resolve(result);
      }
    );
  });
};

//ubah santri
exports.santri_update = function (santri, id) {
  //query ke tabel santri
  let sql = "UPDATE santri set nama=?,hp=?,asal=?,foto=? WHERE id=?";
  return new Promise((resolve) => {
    connection.query(
      sql,
      [santri.nama, santri.hp, santri.asal, santri.foto, id],
      (e, r) => {
        if (!e) resolve(r);
      }
    );
  });
  // return[];
};

//hapus santri
exports.santri_delete = function (id) {
  //query ke tabel santri
  let sql = "DELETE FROM santri WHERE id=?";
  return new Promise((resolve) => {
    connection.query(sql, [id], (e, r) => {
      if (!e) resolve(r);
    });
  });
};

//upload foto santri
exports.santri_upload = function (foto) {
  //query ke tabel santri
  let sql = "SELECT * FROM santri";
  return [];
};
