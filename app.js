var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true,useUnifiedTopology: true } );

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "slamon",
//         image: "https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg",
//         description: "tough way, no water, no house, no man"
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("create a new camp");
//             console.log(campground);
//         }
//     }
// )


// var campgrounds = [
//     {name: "slamon", image: "https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg"},
//     {name: "somewhere", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwPlVYKccUaLOCUCzdbJzBVlGgwnaQkDoR1ZRd4EAghuhfqiUmA"},
// ];


app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

// show form
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// this page should be after the "/campgrounds/new"
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) { 
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});

// CREATE - add new campgrounds to 
app.post("/campgrounds", function(req, res){
    // get data from form and add t camps array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampgounds = {name: name, image: image, description: description};
    // create new campground and save to db
    Campground.create(newCampgounds, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            // redirect to /campgrounds page 
            res.redirect("/campgrounds");
        }
    })
    
});
app.listen(8080, () => {
    console.log('running on http://localhost:8080');
});
