const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);
app.use(express.json())
app.use(cookieParser())


module.exports = app