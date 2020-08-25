// Inbuild Packages.
const path = require("path");
// End of Inbuilt Packages.
//________________________________________________________
// Third Party Packages.

const express = require("express");  // Importing express Module.
const app = express();  //Initializing object which will give us access to various functionality.
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// End Of Third Party Packages.
//________________________________________________________

// Setting globals declarations

app.set("view engine", "ejs");
app.set("views", "views");

// End of global declarations
//____________________________________________________

// Importing User Defined Modules.

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");  // Importing logic directly.
const User = require("./models/user");
// End of User Defined Modules.
//_________________________________________________________

// Here We write all the Middlewares.

/* In this use() function we will pass this MiddleWare function which is similar to
   what we write in our own written middleware it just perform all the body parsing
   so that we don't need to do it manually.
*/
 app.use(bodyParser.urlencoded({extended:false}));  
 app.use(express.static(path.join(__dirname, "public")));   // Middleware for loading static files.

 app.use((req, res, next) => {                              // Setting User Manually.
    User.findById("5f43bfe2946baf2830d1089f")
      .then(user => {
         req.user = user
         next();
      })
      .catch(err => console.log(err));
 });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// End of MiddleWares.
//_________________________________________________________

// Creating Server
//app.listen(8080); // creating server with port 8080.


// Connection With MongoDB using Mongoose. If we successfully connected to MongoDB then we will spin up the server.
mongoose
   .connect(
      "mongodb+srv://nimcetshubhamkumar:namenames@cluster0.63s8y.mongodb.net/shop?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
      )
   .then(result => {
      User.findOne()
      .then(user => {
         if(!user){
            user = new User({
               name: "shubham", email: "shubham@gmail.com", items: []
            });
            user.save();
         }
      })
      app.listen(8080);
   })
   .catch(err => console.log(err));
