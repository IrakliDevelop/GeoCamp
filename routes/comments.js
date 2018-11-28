var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
	Comment     = require("../models/comment"),
	middleware 	= require("../middleware");

router.get("/new", middleware.isLoggedIn, (req,res) => {
	//find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if (err){
			console.log(err);
		} else {
			res.render("comments/new", {campground : campground});
		}
	});
	
});

router.post("/", middleware.isLoggedIn, (req,res) => {
	//lookup campground using ID
	Campground.findById(req.params.id, (err,campground) => {
		if (err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//create new comment
			//connect new comment to campground
			//redirect to campground showpage
			Comment.create(req.body.comment, (err, comment) => {
				if (err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Successfully created a comment");
					res.redirect(`/campgrounds/${campground._id}`);
				}
			})
		}
	});
	
});


//Edit Comment route

router.get("/:comment_id/edit", middleware.checkCommentOwner, (req,res)=>{
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err){
			res.redirect("back")
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
		}
	});
	
});

//Update Comment route

router.put("/:comment_id", middleware.checkCommentOwner, (req,res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err,updatedComment)=>{
		if (err){
			res.redirect("back");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

//Destroy Comment route

router.delete("/:comment_id", middleware.checkCommentOwner, (req,res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err){
			console.log(err);
		} else {
			req.flash("success", "Comment has been deleted");
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});





module.exports = router;