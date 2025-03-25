// Install EJS, Express, and MongoDB in Terminal

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");

app.use(express.json());

const countrySchema = new mongoose.Schema({
  country: { type: String },
  flagURL: { type: String },
  population: { type: Number },
  officialLanguage: { type: String },
  hasNuclearWeapons: { type: Boolean },
});

const Country = mongoose.model("Country", countrySchema, "Countries");

// Create a POST route for "/add/country" that adds a country using the request body (3 points)
// Use postman to add at least THREE different countries
app.post("/add/country", async (req, res) => {
  console.log(req.body)
  const addCountry = await new Country ({
    country: req.body.country,
    flagURL: req.body.flagURL,
    population: req.body.population,
    officialLanguage: req.body.officialLanguage,
    hasNuclearWeapons: req.body.hasNuclearWeapons,
  }).save()
  console.log(addCountry)
  res.json(addCountry)
})

// Create a GET route for "/" that renders countries.ejs with every country from the Countries collection (1 point)
app.get("/", async (req, res) => {

  const countries = await Country.find({})
  res.render("countries.ejs", {countries})
})

// Go to countries.ejs and follow the tasks there (2 points)


// Create a dynamic PATCH route handler for "/update/{name}" that modifies the population of the country specified in the path (3 points)
// Test this route on post man
app.patch("/country/update/:name", async (req,res) => {
  const response = await Country.findOneAndUpdate ({
     name: req.params.name,
  }, {
    population: req.body.population,
  })
res.json(response)
})

// Create a DELETE route handler for "/delete/country" that deletes a country of your choice (3 points)
// Test this route on post man
app.delete("/delete/:country", async (req,res) => {
  const countryName = req.params.countryName
  const response = await Country.findOneAndDelete ({
     name: req.params.name
  })
res.json(response)
})

async function startServer() {
  
    // add your SRV string with a database called countries
  await mongoose.connect("mongodb+srv://SE12:CSH2025@sophia2107.tpz8y.mongodb.net/?retryWrites=true&w=majority&appName=Sophia2107");

  app.listen(3000, () => {
    console.log("Server is running");
  });
}

startServer();
