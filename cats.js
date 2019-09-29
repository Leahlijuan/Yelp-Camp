var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true,useUnifiedTopology: true } );

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);


// add a new cat to db

// var george = new Cat({
//     name: "anothername",
//     age: 111,
//     temperament: "other"

// });

// george.save(function(err, cat){
//     if(err) {
//         console.log("something wrong");
//     } else {
//         console.log("save a cat db");
//         console.log(cat);
//     }
// });


Cat.create({
    name: "sss",
    age: 13,
    temperament: "lafjsldfjlsd"
}, function(err, cat){
    if(err) {
        console.log("it's a err");
        console.log(err);
    } else {
        console.log("one cat");
        console.log(cat);
    }
});

// retrieve all cats from the DB

Cat.find({}, function(err, cats){
    if(err) {
        console.log("it's a err");
        console.log(err);
    } else {
        console.log("all cats");
        console.log(cats);
    }
})