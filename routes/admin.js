const path = require("path");       //Node Core Module or Inbuilt Module.

const express = require("express");
const router = express.Router();

const rootDir = require("../util/path");

router.get("/add-product", (req, res, next)=>{
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next)=>{
    console.log(JSON.stringify(req.body));
    res.redirect("/");
});

module.exports = router;

