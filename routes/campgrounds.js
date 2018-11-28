var express     = require("express"),
    router      = express.Router(),
	Campground  = require("../models/campground"),
	middleware 	= require("../middleware");

router.get("/", (req,res) => {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds});
		}
	})
});

//create route
router.post("/", middleware.isLoggedIn, (req,res) => {
	//get data from form and add to camgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, author: author}
	// Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) =>{
		if (err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("campgrounds");
		}
	})
	
});

//form to create a new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// Show - shows more info about oe campground
router.get("/:id", (req,res) => {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
	
});

//Edit Campground route

router.get("/:id/edit", middleware.checkCampgroundOwner, (req,res) =>{
	Campground.findById(req.params.id, (err,foundCampground)=>{
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});

//Update Campground route
router.put("/:id", middleware.checkCampgroundOwner, (req,res) => {
	//find and update the campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) =>{
		if (err){
			res.redirect("/campgrounds");
		} else {
			//redirect to that campground's page
			res.redirect(`/campgrounds/${req.params.id}`)
		}
	});
	

});

// Destroy Campground route
router.delete("/:id", middleware.checkCampgroundOwner, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if (err){
			console.log(err);
		} else {
			req.flash("success", "Campground has been deleted")
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;