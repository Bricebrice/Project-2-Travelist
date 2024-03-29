// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// use session here:
require("./config/session.config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "travelist";

app.locals.appTitle = `${capitalize(projectName)} - Travel guides`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// authRouter
const authRouter = require("./routes/auth.routes"); // <== has to be added
app.use("/", authRouter);

//userRouter
const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

//postRouter
const postRouter = require("./routes/post.routes");
app.use("/", postRouter);

//dayRouter
const dayRouter = require("./routes/day.routes");
app.use("/", dayRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
