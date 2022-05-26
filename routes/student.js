const express = require('express')
const conn = require('../lib/db')
const router = express.Router()


router.get('/', (req, res) => {

    let sql = "SELECT st.id, st.first_name, st.last_name, bk.name AS book_name, rt.due_date"+
    " FROM rentals rt, students st, books bk"+
    " WHERE rt.student_id = st.id"+ 
    " AND rt.book_id = bk.id"

    

    conn.query(sql, (err, results) => {
            if (err)
                    throw err
            else
                    console.log(results);
            res.render('pages/student', {
                    title: "Stony Hill Primary LMS",
                    students: results
            });
    })

})

router.get('/aggregate/:id', (req, res) => {

    let sql = "SELECT st.first_name, st.last_name, COUNT(bk.name) AS book_count"+
    " FROM rentals rt, students st, books bk"+
    " WHERE rt.student_id = st.id"+ 
    " AND rt.book_id = bk.id"+
    " AND st.id = "+ req.params.id
    " GROUP BY st.first_name, st.last_name"

    conn.query(sql, (err, results) => {
            if (err)
                    throw err
            else
                    console.log(results);
            res.render('pages/student-aggregate', {
                    title: "Stony Hill Primary LMS",
                    students: results
                    
            });
    })

})



module.exports = router