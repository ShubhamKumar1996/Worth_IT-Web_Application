// We Put all database Connection code in models

// Working With file System
const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename), 
    "data", 
    "product.json"
);

const getProductsFromFile = (cb) => {    
    fs.readFile(p, (err, fileContent)=>{
        let products = [];
       if(!err){
           products = JSON.parse(fileContent);
       }
       return cb(products);
    });
}

// Creating Class Product as Product is Important aspect of out site.
module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}