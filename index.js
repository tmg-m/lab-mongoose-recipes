const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Tortilla de patata",
      level: "Easy Peasy",
      ingredients: ["egg", "potato"],
      cuisine: "Spanish",
      dishType: "breakfast",
      image: "https://www.gettyimages.es/detail/foto/spanish-omelet-imagen-libre-de-derechos/1144784441?adppopup=true",
      duration: 10,
      creator: "Dani",
      created: 2021,
    })
  })
  .then(() => {
    let eachTitle = "";
    for(let i = 0; i < data.length; i++){
      eachTitle += "\n" + data[i].title
    }
    return Recipe.insertMany(data, console.log(eachTitle))
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {$set:{duration: 100}},
      {new: true, useFindAndModify: false}
    );
  })
  .then(() => {
    console.log("Updated Successfully!")
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(() => {
    console.log("Carrot Cake recipe removed!")
  })
  .then(() => {
    mongoose.connection.close();
  })
  .then(() => {
    console.log("disconected!")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
