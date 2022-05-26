const express = require('express')
const conn = require('../lib/db')
const router = express.Router()

/**
 * 
 * Display Login
 * 
 */

router.get('/', (req, res) =>{
    res.render('pages/login', {
        title: 'Sign In',
    })
})

/**
 * 
 * AUTHENTICATE USER
 * 
 */

router.post('/authlogin', (req, res) =>{
    var email = req.body.email
    var password = req.body.password

    let sql = 'SELECT * FROM students WHERE email = ? AND BINARY password = ?;' 

    conn.query(sql,[email, password], (err, results) =>{
        console.log(results)

        if(results.length <= 0) {
            req.flash('error', 'Invalid credentials Please try again!')
            res.redirect('/login/')
        } else {
            req.session.loggedIn = true;
            req.session.first_name = results[0].first_name;
            req.session.last_name = results[0].last_name;
            req.session.isAdmin = false;

            res.redirect('/students/dashboard')
        }

            
    })
})

module.exports = router