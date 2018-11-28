var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

router.get("/", (req,res) => {
	res.render("landing");
});


//Sign up form
router.get("/register",  (req, res) => {
	res.render("register");
})


//handling sign up
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=> {
		if (err){
			req.flash("error", err.message);
			return res.redirect("register");
		} 
			passport.authenticate("local")(req, res, ()=>{
				req.flash("success", `Welcome to GeoCamp ${user.username}`);
				res.redirect("/campgrounds");
			});
		
	});
});


//Login form
router.get("/login", (req, res)=>{
	res.render("login");
});


//handling login
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		badRequestMessage: "Invalid Username or password",
		failureFlash: true
	}), (req, res)=>{});


//logout
router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "You have logged out");
	res.redirect("/campgrounds");
});

module.exports = router;