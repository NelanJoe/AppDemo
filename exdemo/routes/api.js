// data santri
var express = require("express");
var router = express.Router();
let SantriModel = require("../models/Santri");
let UsersModel = require("../models/Users");
//json web token
var jwt = require('jsonwebtoken');
const passport = require("passport");

/**
 * @swagger
 * tags:
 *      name: santri
 *      description: Pengelolaan santri
 */

/**
 * @swagger
 * path:
 *      /santri:
 *          get:
 *              summary: Get list santri
 *              tags: [Santri]
 *              response:
 *                  "200":
 *                      description: List user
 *                      content: application/json
 */
// get
router.get("/santri", async (req, res) => {
  let data = await SantriModel.santri_list();
  res.jsonp(data);
});

/**
 * @swagger
 * path:
 *      /santri/{id}:
 *          get:
 *              summary: Get detail santri
 *              tags: [Santri]
 *              paramaters:
 *                  in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: id santri
 *              response:
 *                  "200":
 *                      description: detail santri
 *                      content: application/json
 */
router.get("/santri/:id", async (req, res) => {
  let id = req.params.id;
  let data = await SantriModel.santri_detail(id);
  if (data.length) {
    res.jsonp(data[0]);
  } else {
    res.status(404).jsonp("Santri not found");
  }
});
 /** 
  * @swagger
  * path:
  *   /santri:
  *       post:
  *           summary: Tambah santri
  *           tags: [Santri]
  *           requestBody:
  *               required: true
  *               content: 
  *                   application/json:
  *                       schema:
  *                           type: object
  *                           required: [nama]
  *                           properties: 
  *                               nama:
  *                                   type: string
  *                               hp:
  *                                   type: string
  *                               asal:
  *                                   type: string
  *           response: 
  *               "200":
  *                   description: Tambah user
  *                   content: application/json
  */
//post
router.post("/santri",
  passport.authenticate('jwt',{session:false}),
   async (req, res) => {
  let dataBaru = {
    nama: req.body.nama,
    hp: req.body.hp,
    asal: req.body.asal,
    foto: req.body.foto,
  };
  let hasil = await SantriModel.santri_add(dataBaru);
  res.jsonp(hasil);
});

/**
 * @swagger
 * path:
 *      /santri/{id}:
 *          put:
 *              summary: Update santri
 *              tags: [Santri]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                    type: string
 *                                  asal:
 *                                      type: string
 *                                  foto:
 *                                      type: string
 *              response:
 *                  "200":
 *                      description: Update santri
 *                      content: application/json
 */
//put/patch
router.put("/santri/:id", async (req, res) => {
  let id = req.params.id;
  let data = {
    nama: req.body.nama,
    asal: req.body.asal,
    hp: req.body.hp,
    foto: req.body.foto,
  };
  let status = await SantriModel.santri_update(data, id);
  res.jsonp(status);
});

/**
 * @swagger
 * path:
 *      /santri/{id}:
 *          delete:
 *              summary: Hapus santri
 *              tags: [Santri]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              required: [nama]
 *                              properties:
 *                                  nama:
 *                                      type: string
 *                                  hp:
 *                                    type: string
 *                                  asal:
 *                                      type: string
 *                                  foto:
 *                                      type: string
 *              response:
 *                  "200":
 *                      description: Hapus santri
 *                      content: application/json
 */
//delete
router.delete("/santri/:id", async (req, res) => {
  let id = req.params.id;
  let status = await SantriModel.santri_delete(id);
  res.jsonp(status);
});

// ==============Users=================
//get
router.get("/users", async (req, res) => {
  let data = await UsersModel.users_list();
  res.jsonp(data);
});
router.get("/users/:id", async (req, res) => {
  let id = req.params.id;
  let data = await UsersModel.users_detail(id);
  if (data.length) {
    res.jsonp(data[0]);
  } else {
    res.status(404).jsonp("Santri not found");
  }
});
//post
router.post("/users", async (req, res) => {
  let dataBaru = {
    email: req.body.email,
    password: req.body.password,
  };
  let hasil = await UsersModel.users_add(dataBaru);
  res.jsonp(hasil);
});
//put/patch
router.put("/users/:id", async (req, res) => {
  let id = req.params.id;
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  let status = await UsersModel.users_update(data, id);
  res.jsonp(status);
});
//delete
router.delete("/users/:id", async (req, res) => {
  let id = req.params.id;
  let status = await UsersModel.users_delete(id);
  res.jsonp(status);
});

// Get Token (otentikasi)
router.post('/auth',
  passport.authenticate('local-login'),
  (req,res)=>{
    //generate JWT (JSON with token)
    const body = {_id:req.user.id,_email:req.user.email};
    const token = jwt.sign({user:body},'rahasia_banget');
      res.jsonp({token});
    
      res.send("sucess auth with user:"
        +JSON.stringify(req.user));
      
      
      // +req.body.email
      // +","+req.body.password);
  }
)



module.exports = router;
