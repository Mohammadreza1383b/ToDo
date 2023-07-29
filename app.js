var mysql = require('mysql')
const express = require('express')
const square = require('./square')
const app = express()
app.use(express.json())
app.post('/',(req,res,next) =>{
    var con = mysql.createConnection({
        host: "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "Test"
    })

    con.connect((err) =>{
        if(err)
            console.log(err);
        const qul = "SELECT * FROM User WHERE name = '" + req.body[0].name + "'"
        con.query(qul , (err , resualt) =>{
            res.send(resualt)
        })
    })
})



app.listen(3000 , () =>{
    console.log('server is listenning on port 3000');
})