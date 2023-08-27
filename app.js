var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var bodyParser = require('body-parser')

// seqeuelize
// const { Sequelize } = require("sequelize")

// method-override, flash, session
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")

// router
const adminRouter = require("./routes/adminRouter")
const apiRouter = require("./routes/apiRouter")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// method-override
app.use(methodOverride("_method"))
// express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// template sb-admin-2
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
)

// connect-flash
app.use(flash())

// default router
app.use("/", indexRouter)
app.use("/users", usersRouter)

// router
app.use("/admin", adminRouter)
app.use("/api/v1/member", apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
