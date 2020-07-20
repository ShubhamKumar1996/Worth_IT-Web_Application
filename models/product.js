// We Put all database Connection code in models

// This is Working as static database.
const products = [];

// Creating Class Product as Product is Important aspect of out site.
module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save(){
        products.push(this);
    }

    static fetchAll(){
        return products;
    }
}