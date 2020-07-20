const Product = require("../models/product");
const { fetchAll } = require("../models/product");

exports.getAddProduct = (req, res, next)=>{
    res.render("add-product", {
        pageTitle: "Add Product", 
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true 
    });
}

exports.postAddProduct = (req, res, next)=>{
    //products.push({title: req.body.title});
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

exports.getProducts = (req, res, next)=>{
    // Code written inside the fetchAll() is a function() which is being
    // passed as an argument and later it get executed in fetchAll() fucntion
    // itself where we are calling this callback function.
    Product.fetchAll((products)=>{
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true

        });
    });
}