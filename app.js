var express 		= require('express'),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require('mongoose'),
	passport 		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride 	= require("method-override"),
	flash			= require("connect-flash"),
	Campground 		= require("./models/campground"),
	User			= require("./models/user"),
	Comment			= require("./models/comment");


//requiring routes
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

var dbUrl = process.env.DATABASEURL || "mongodb://localhost/geo_camp";
mongoose.connect(dbUrl);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "I don't have imagination",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res, next) => {
	res.locals.currentUser 	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success 		= req.flash("success");
	next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);




const port = process.env.PORT || 3000;

app.listen (port, () => {
	console.log(`The GeoCamp Server Has Started at port ${port}`);
});