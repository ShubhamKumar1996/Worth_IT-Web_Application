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
};

// Creating Class Product as Product is Important aspect of out site.
module.exports = class Product {
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile((products) => {
            if(this.id) {
                const existingProductIndex = products.findIndex(product => product.id===this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                    if(err){
                        console.log(err);
                    }
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err)=>{
                    if(!err){
                        console.log(err);
                    }
                });
            }
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile((products)=>{
            const product = products.find(element =>{ return element.id===id; });
            cb(product);
        });
    }

    static deleteById(id){
        getProductsFromFile((products) => {
            let updatedProducts = products.filter(product => product.id!==id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                if(!err){
                    console.log(err);
                }
            });
        })
    }
};