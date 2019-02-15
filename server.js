const express = require("express");
const path = require("path");
const passport = require('passport');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

const routes = require("./routes/routes");
const secureRoutes = require("./routes/secure-routes");
require('./auth/auth');

/* Connect to the database */
mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);
app.use("/api", passport.authenticate('jwt', { session: false }), secureRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
