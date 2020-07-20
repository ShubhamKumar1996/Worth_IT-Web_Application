// We Put all database Connection code in models

// Working With file System
const fs = require("fs");
const path = require("path");

// Creating Class Product as Product is Important aspect of out site.
module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
        // Describing where data will get stored.
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            "data", 
            "product.json"
        );
        
        // To Store new Product in file. We first need to read it.
        fs.readFile(p, (err, fileContent)=>{
            let products =  [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                if(err!=null){
                    console.log(err);
                }
            });
        }); 
    }

    static fetchAll(cb){
        // To Store new Product in file. We first need to read it.
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            "data", 
            "product.json"
        );
        
        // ReadFile is a asynchronous function so if handle it normally by
        // returning array. we mistakenly sending undefined because we are unable
        // to fetch file before program reaches the return statement.
        // Thats why here we are using callback function, where we will simply
        // call the function which is passed in fetch() function after array is fetched
        // from file.
        fs.readFile(p, (err, fileContent)=>{
            let products = [];
           if(!err){
               products = JSON.parse(fileContent);
           }
           cb(products);
        });
    }
}