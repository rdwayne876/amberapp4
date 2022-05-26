require('dotenv').config()
const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/**
 * 
 *  APP ROUTING
 * 
 */
const indexRoute = require('./routes/index')
const studentRoute = require('./routes/student')
const authRoute = require('./routes/auth');

/**
 * 
 *  APP SESSION
 * 
 */

app.use(cookieParser())
app.use(session({
    secret: 'ecQJ099i5JLW15yU4lnktvrBjiPUuKeJ',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 120000}
}))
app.use(flash())

app.use('/', indexRoute)
app.use('/login', authRoute)
app.use('/students', studentRoute)

app.listen(process.env.APP_PORT)
console.log('Server is listening on port '+ process.env.APP_PORT)