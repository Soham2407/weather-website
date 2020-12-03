const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// * Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// * Setup handlebar engine for views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// * Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// ? index route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Soham Nesarikar",
  });
});

// ? about route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Soham Nesarikar",
  });
});

// ? help route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Soham Nesarikar",
  });
});

// ? weather route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  // geoCode callback
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      // foreCast callback
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Soham Nesarikar",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Soham Nesarikar",
    errorMessage: "Page Not Found",
  });
});

// * Listening an server
app.listen(3000, () => {
  console.log("Server is listening");
});
