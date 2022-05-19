const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin-controller");
const fileUpload = require("../middleware/file-upload");
const middlewares = require("../middleware/middlewares");

const router = express.Router();

router.post("/login", middlewares.loginMiddleware(), adminController.login);
router.post("/launchjackpot", () => {
  console.log(`Launch JP`);
});

router.post("/pickwinner", (req, res) => {});

router.post("/postpondjackpot", (req, res) => {
  const { date } = res.body;
  console.log(date);
});
