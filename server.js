const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./controllers/workoutController")
const htmlRoutes = require("./controllers/htmlRoutes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout');

app.use(routes)
app.use(htmlRoutes)

app.listen(PORT, () => {
    console.log(`App running on port http//:localhost:${PORT}!`);
  });