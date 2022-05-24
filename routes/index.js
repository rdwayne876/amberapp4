const express = require('express')
const conn = require('../lib/db')
const router = express.Router()

router.get('/', (req, res) => {

        let sql = 'SELECT * FROM amberapp4.students;'

        conn.query(sql, (err, results) => {
                if (err)
                        throw err
                else
                        console.log(results);
                res.render('pages/index', {
                        title: "Stony Hill Primary LMS"
                });
        })

})

module.exports = router