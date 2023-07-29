//this js make API that rigester user and sign in with token

// import module 
const express = require('express')
const mysql = require('mysql')
// make an instance of express 
const app = express()
//get json file 
app.use(express.json())

app.all('/Login/Token' , (req , res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "Test"
    })
    

    con.connect((err) => {
        if (err) {
            console.log(err);
        }else{
            console.log('connected!');
            con.query("SELECT * FROM Token WHERE token='" + req.query.token + "'" , ( err ,resualt) =>{
                if (resualt.length == 1) {
                    const username = req.body.username
                    const password = req.body.password
                    const name = req.body.name
                    con.query("SELECT * FROM User WHERE username = '" + username +"'" , (err , resualt) =>{
                        if (resualt.length == 1) {
                            res.json({Message:'301' , Description : 'user already is exist can not login again'})
                        }else{
                            con.query("INSERT INTO User (username, pasword, name) VALUES ('"+username+"','"+password+"','"+name+"')" , (err) =>{
                                if (err) {
                                    console.log(err);
                                    res.json({Message: '310' , Description:err})
                                }else{
                                    res.json({Message: '200' , Description : 'user added'})
                                }
                            })
                        }
                    })
                }else{
                    res.json({Message : '404' , Description : 'this token is not valid'})
                }
            })
        }
    })
})

//listen on port 3000 in local host 
app.listen(3000 , () =>{
    console.log('Server is litenning on port 3000...');
})