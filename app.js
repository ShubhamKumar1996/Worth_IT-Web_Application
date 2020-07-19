// Inbuild Packages.
const path = require("path");
// End of Inbuilt Packages.
//________________________________________________________
// Third Party Packages.

const express = require("express");  // Importing express Module.
const app = express();  //Initializing object which will give us access to various functionality.
const bodyParser = require("body-parser");

// End Of Third Party Packages.
//________________________________________________________

// Setting globals declarations

app.set("view engine", "ejs");
app.set("views", "views");

// End of global declarations
//____________________________________________________

// Importing User Defined Modules.

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// End of User Defined Modules.
//_________________________________________________________

// Here We write all the Middlewares.

/* In this use() function we will pass this MiddleWare function which is similar to
   what we write in our own written middleware it just perform all the body parsing
   so that we don't need to do it manually.
*/
app.use(bodyParser.urlencoded({extended:false}));  
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next)=>{                         // Page Not Found Middleware.
    res.render("404.ejs", {
        pageTitle: "Page Not Found",
        path: ""
    });
});
// End of MiddleWares.
//_________________________________________________________

// Creating Server
app.listen(8080); // creating server with port 8080.