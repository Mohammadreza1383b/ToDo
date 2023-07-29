var mysql = require('mysql')
const express = require('express')
const { title } = require('process')

const app = express()

app.listen(3000)


///  'http://localhost:3000/api?id='+ id 

app.get('/api' , (req , res) => {
    console.log(req.query.id);
    console.log(req.query.name);
    res.json({message:'OK'})
    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "Mbagher",
    //     password: "q7cam8JGxAIIMt8R",
    //     database : "Test"
    // });
    
    // const id = 2
    // const name = "vafadari'"
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     var sql = "SELECT * FROM User ";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         // console.log(result);
    //         res.send({name : result[0].name})
    //         console.log(req.body);
    //       });
    //   });
      
})

