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

// Importing User Defined Modules.

const adminRoutes = require("./routes/admin");
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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next)=>{                         // Page Not Found Middleware.
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// End of MiddleWares.
//_________________________________________________________

// Creating Server
app.listen(8080); // creating server with port 8080.