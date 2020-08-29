exports.get404 = (req, res, next)=>{                         // Page Not Found Middleware.
    res.status(404).render("404.ejs", {
        pageTitle: "Page Not Found",
        path: "/404",
        isAuthenticated: req.session.isLoggedIn
    });
}