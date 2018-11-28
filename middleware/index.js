//all the middleware goes here
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
var middlewareObj = {}

middlewareObj.checkCampgroundOwner = function(req,res,next){
    //if user is logged in
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err,foundCampground)=>{
            if (err){
				req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // if logged in user's id matches author's id
                if (foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
					req.flash("error", "You don't have permission to perform that action");
                    res.redirect("back");
                }
            }
        });
    } else {
		req.flash("error", "You need to be logged in to perform that action");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwner = function(req,res,next){
	//if user is logged in
	if (req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err,foundComment)=>{
			if (err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// if logged in user's id matches author's id
				if (foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to perform that action");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to perform that action");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res, next){
	if (req.isAuthenticated()){
		return next();
	} 
	req.flash("error", "You need to be logged in to perform that action");
	res.redirect("/login");
}


module.exports = middlewareObj;