const Product = require("../models/product");

exports.getProducts = (req, res, next)=>{
    // Code written inside the fetchAll() is a function() which is being
    // passed as an argument and later it get executed in fetchAll() fucntion
    // itself where we are calling this callback function.
    Product.fetchAll((products)=>{
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/"
        });
    });
}

exports.getIndex = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/"
        });
    });
}

exports.getCart = (req, res, next)=>{
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
    });
}

exports.getCheckout = (req, res, next)=>{
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
}