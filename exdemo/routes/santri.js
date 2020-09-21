var express = require("express");
var router = express.Router();

// require controller
var santri_controller = require("../controllers/santriController");

router.get("/admin", santri_controller.admin);

// santri routes
router.get("/", santri_controller.santri_list);
//detail
router.get("/detail/:id", santri_controller.santri_detail);
//form santri
router.get("/create", santri_controller.santri_form);
// prosess add santri
router.post("/create", santri_controller.santri_add);
// proses update santri
router.get("/update/:id", santri_controller.santri_update);
// proses delete santri
router.get("/delete/:id", santri_controller.santri_delete);
// proses delete santri
router.delete("/delete/:id", santri_controller.santri_delete);
// proses upload santri
router.get("/upload/:id", santri_controller.santri_upload);

module.exports = router;
