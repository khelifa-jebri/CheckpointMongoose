const mongoose = require("mongoose");

// Connecting to Data Base
mongoose.connect("mongodb://127.0.0.1:27017/checkpointmongoose", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection Successfully ..."))
    .catch((err) => console.log(err));

// creating the personSchema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: [String]
});

// creating the model
const Person = mongoose.model("person", personSchema);

//Create a Model of person
const person = new Person({
    name: "Ahmed Telili",
    age: 20,
    favoriteFoods: ["Couscous", "Brik"],
});

//Save a Record in Data Base
person.save((err) => {
    if (err) throw err;
    console.log("person added succesfully!");
});

//Create and save Many Records with model.create()
arrayOfPeople = [{ name: 'Mohamed', age: 40, favoriteFoods: ["Soupe", "Salade"] },
    { name: 'Saoussen', age: 25, favoriteFoods: ["Crepe", "Chawerma", "Lablabi"] },
    { name: 'Faten', age: 18, favoriteFoods: ["Plat Tounsi", "Makloub"] }
]
Person.create(arrayOfPeople, (err) => {
    if (err) throw err;
    console.log("People added succesfully!");
});

//Use model.find() to Search Your Database
Person.find({}, (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: { $all: ["Couscous", "Brik"] } }, (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Use model.findById() to Search Your Database By _id
Person.findById("60cdaa58101db20a10a409e9", (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Perform Classic Updates by Running Find, Edit, then Save
Person.findByIdAndUpdate("60cdaa58101db20a10a409eb", { $push: { favoriteFoods: "hamburger" } }, (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({ name: "Saoussen" }, { age: 20 }, (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove("60cdaa58101db20a10a409e9", (err, data) => {
    if (err) throw err;
    console.log(data);
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.deleteMany({ name: "Mary" }, (err, data) => {
    if (err) throw err;
    console.log(data);
})

//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: { $all: "burritos" } }) // find all users
    .limit(2) // limit to Two items
    .sort({ name: 1 }) // sort ascending by name
    .select({ age: false }) // select firstName only
    .exec((err, data) => { // execute the query
        if (err) throw err;
        console.log(data);
    })


Person.find({}, (err, data) => {
    if (err) throw err;
    console.log(data);
});