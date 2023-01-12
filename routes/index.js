const router = require("express").Router();
const path = require("path");
var app = require("express")();

const textRouter = require("./textRouter");
const todoRouter = require("./todoRouter");
const userRouter = require("./userRouter");

router.use("/api/generaltext", textRouter);
router.use("/api/todo", todoRouter);
router.use("/api/users", userRouter);

//If no backend API routes are hit, redirect to front end
//resolve simply let the compiler ignore the security risks of using a relative path
//could be vulnerable to malwares
router.use(function (req, res) {
  res.sendFile(path.resolve("./client/build/index.html"));
});

module.exports = router;
