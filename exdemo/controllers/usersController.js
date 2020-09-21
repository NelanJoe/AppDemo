var Users = require("../models/users.js");

// list all users
exports.admin = async function (req, res) {
  // res.send("BELUM_JADI: List all users");
  let data = await Users.users_list();
  if (data) {
    res.render("users/admin", { list_users: data });
  } else {
    res.send("Data tidak ditemukan");
  }
};

exports.users_list = async function (req, res) {
  // res.send("BELUM_JADI: List all Users");
  let data = await Users.users_list();
  if (data) {
    res.render("users/list", { data_users: data });
  } else {
    res.send("Data tidak ditemukan");
  }
};

// Detail Users berdasarkan id
exports.users_detail = async function (req, res) {
  let users = await Users.users_detail(req.params.id);
  if (users) {
    res.render("users/detail", { users: users[0] });
    // res.send(JSON.stringify(Users));
  }
  // res.send("BELUM_JADI: Detail Users-" + req.params.id);
};

// Ubah Users
exports.users_update = function (req, res) {
  res.send("BELUM_JADI: Update users");
};

//form Users
exports.users_form = function (req, res) {
  res.render("users/form_users");
};

// Tambah Users
exports.users_add = async function (req, res) {
  //baca dari form
  var data = {
    email: req.body.email,
    password: req.body.password,
  };
  let add = await Users.users_add(data);
  if (add) {
    res.redirect("/users");
  } else {
    res.redirect("/users/create");
  }
};

// Hapus Users
exports.users_delete = async function (req, res) {
  let id = req.params.id;
  let hapus = await Users.users_delete(id);
  if (hapus) {
    res.redirect("/users");
  } else {
    res.send("Gagal hapus-" + id);
  }
};

// // Tambah foto Users
// exports.users_upload = function(req,res){
//     res.send("BELUM_JADI: tambah foto Users");
// }
