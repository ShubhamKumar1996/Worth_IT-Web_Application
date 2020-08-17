const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename), 
    "data", 
    "cart.json"
);

module.exports = class Cart{
    // cart will look something like this.
    // class cart{
        // products = [{id: id, qty: 1}];
        // totalPrice = 0;
    //}
    static addProduct(id, productPrice){
        // Fetch the previous cart
        // Analyze the cart => Find Existing Product
        // Add new product/increase quantity
        // -------------------------------------------------------------

       

        // Fetch the previous cart.
        fs.readFile(p, (err, fileContent)=>{
            let cart = { products: [], totalPrice: 0 };
           if(!err){
               cart = JSON.parse(fileContent);
           }

            // Analyze the cart => Find Existing Product
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new product/ increase quantity.
            if(existingProduct){      // product found in cart.
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
                
            }else{                           // product not found in cart.   
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + Number(productPrice);
            
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                if(err){
                    console.log("cart Writting error: " + err);
                }
            });
        });
    };

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            return;
          }
          const updatedCart = { ...JSON.parse(fileContent) };
          const product = updatedCart.products.find(prod => prod.id === id);
          if (!product) {
              return;
          }
          const productQty = product.qty;
          updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
          );
          updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;
    
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
        });
      }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            cb(null);
          } else {
            cb(cart);
          }
        });
      }
};
