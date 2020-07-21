exports.get404 = (req, res, next)=>{                         // Page Not Found Middleware.
    res.render("404.ejs", {
        pageTitle: "Page Not Found",
        path: "/404"
    });
}