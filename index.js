const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();
const path = require('path');

//Database config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/strategy")(passport);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Used below code only when we want to host app on heroku

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

//User connection and validation route and also used to get axios request in react
app.use("/api/users", users); 

// Now We can use axios with api/users API in react
// axios.post("/api/users/register", userInfo)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
