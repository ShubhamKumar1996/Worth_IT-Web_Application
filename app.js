// Inbuild Packages.

// End of Inbuilt Packages.

// Third Party Packages.

const express = require("express");  // Importing express Module.
const app = express();  //Initializing object which will give us access to various functionality.


// End Of Third Party Packages.

// Importing User Defined Modules.

// End of User Defined Modules.

// Here We write all the Middlewares.

app.use((req, res, next)=>{
    console.log("First MiddleWare");
    next();
});

app.use((req, res, next)=>{
    console.log("Second MiddleWare");
    next();
});

app.use((req, res, next)=>{
    res.send("<h1>Page Not Found</h1>");
});

// End of MiddleWares.

// Creating Server
app.listen(8080); // creating server with port 8080.