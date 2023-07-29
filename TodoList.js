const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

//this is for login and you should send in json file username and password 
app.get('/Login' , (req , res) =>{
    
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) => {
        if (err) {
            console.log(err);
        }else{
            console.log('connected!');
            const username = req.body.username
            const password = req.body.password
            con.query("SELECT * FROM User WHERE username = '"+username+"'" , (err , resualt) =>{
                if (err) {
                    //internal server error
                    console.log(err);
                    res.status(500).json({Message : "500" , Descpiton : err})
                }else{
                    if (resualt.length >0) {
                        //check password
                        if (resualt[0].password == password) {
                            //password is correct 
                            res.status(200).json({Message : "200" , userId : resualt[0].usernkumber})
                        } else {
                            //password is not correct
                            res.status(302).json({Message : "302" , Descpiton : "password is not correct"})
                        }
                    }else{
                        //when server cant find user 
                        res.status(404).json({Message : "404" , Descpiton : "there is not such user"})
                    }
                }
            })
        }
    })
})


//this is for create account and you should send in json file username and password and itself generate userId
app.post('/Login' , (req, res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) => {
        if (err) {
            res.status(500).json({Message : "500" , Descpiton:err})
        } else {
            const username = req.body.username
            const password = req.body.password
            con.query("SELECT * FROM User WHERE username = '"+username+"'" , (err , resualt) =>{
                if (err) {
                    res.status(500).json({Message : "500" , Descpiton : err})
                } else {
                    if (resualt.length) {
                        res.status(401).json({Message : "401" , Descpiton : "username already exist "})
                    } else {
                        con.query("INSERT INTO User(username, password) VALUES ('"+username+"','"+password+"')" , (err) =>{
                            if (err) {
                                res.status(500).json({Message : "500" , Descpiton : err})
                            }else{
                                res.status(200).json({Message : "200" , Descpiton : "new user added successfully"})
                            }
                        })
                    }
                }
            })
            
        }
    })
})

//this function return list of to do for user and API is localhost:3000/ToDoList?usernumber=<usernumber>

app.get('/ToDoList' , (req , res) =>{
    // console.log(req.query.userId);
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) =>{
        if (err) {
            res.status(500).json({Message : "500" , Descpiton:err})
        } else {
            con.query("SELECT * FROM ToDo WHERE usernumber = " + req.query.usernumber , (err , resualt) =>{
                if (err) {
                    res.status(500).json({Message : "500" , Descpiton:err})
                } else {
                    if (resualt.length) {
                        res.status(200).json({Message:"200" , resualt})
                        
                    } else {
                        res.status(200).json({Message : "200" , resualt: []})
                    }
                }
            })
        }
    })
})
// for get a todo its api is localhost:3000/ToDo?title=<title>&usernumber=usernumber that you should send title and userId
app.get('/ToDo' , (req , res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) =>{
        if (err) {
            res.status(500).json({Message : "500" , Descpiton:err})
        } else {
            // console.log(req.query.title);
            // console.log(req.query.userId);
            const title = req.query.title
            const usernumber = req.query.usernumber
            con.query("SELECT * FROM ToDo WHERE title='"+title+"' AND usernumber=" + usernumber , (err ,resualt)  =>{
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(resualt)
                }
            })
        }
    })
})

//for add a todo in database by json file that send title and Date and Descption and usernumber
app.post('/ToDo' , (req , res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) =>{
        if (err) {
            console.log(err);
        }else{
            // console.log(req.body.title);
            // console.log(req.body.Date);
            // console.log(req.body.Descpiton);
            // console.log(req.body.usernumber);
            
            con.query("SELECT * FROM ToDo WHERE title = '"+req.body.title+"' AND usernumber = " + req.body.usernumber , (err , resualt) => {
                // console.log(resualt);
                if (resualt.length) {
                    res.status(301).json({Message : "301" , Descpiton : "this title already exit"})
                } else {
                    con.query("INSERT INTO ToDo(title, Description, Date, usernumber) VALUES ('"+req.body.title+"','"+req.body.Descpiton+"','"+req.body.Date+"',"+req.body.usernumber+")" , (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json({Message : "200" , Descpiton: "todo added successfully"})
                        }
                    })
                }
            })
        }
    })
})

//this is for edit todo by title and usernumber and api is localhost:3000/ToDo?title=<title>&usernumber=usernumber and send in json new title and description and date and usernumber

app.put('/ToDo' , (req , res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) =>{
        if (err) {
            console.log(err.Message);
        } else {
            con.query("UPDATE ToDo SET title='"+req.body.title+"',Description='"+req.body.Descpiton+"',Date='"+req.body.Date+"',usernumber='"+req.body.usernumber+"' WHERE title = '"+req.query.title+"' AND usernumber = " + req.query.usernumber , (err) =>{
                if (err) {
                    res.status(500).json({Message : "500" , Descpiton:err})
                } else {
                    res.status(200).json({Message : 200 , Descpiton:"todo updated !"})
                }
            })
            console.log(req.query.title);
            console.log(req.query.usernumber);
        }
    })
})

//this is for Delete a todo by title and usernumber that send in json file 

app.delete('/ToDo' , (req , res) =>{
    var con = mysql.createConnection({
        host : "localhost",
        user : "Mbagher",
        password : "q7cam8JGxAIIMt8R",
        database : "ToDo"
    })

    con.connect((err) =>{
        if (err) {
            console.log(err);
        } else {
            con.query("DELETE FROM ToDo WHERE title = '"+req.body.title+"' AND usernumber = "+req.body.usernumber , (err) =>{
                if (err) {
                    res.status(500).json({Message : "500" , Descpiton:err})
                } else {
                    res.status(200).json({Message : "200" , Descpiton: "Deleted record!"})
                }
            })
            // console.log(req.body.title + req.body.usernumber);
        }
    })
})

app.listen(3000 , () =>{
    console.log('server is listenning on port 3000');
})