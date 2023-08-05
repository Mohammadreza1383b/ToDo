import express from 'express';
import databse from '../Models/db'
const app = express();
const db = new databse()
app.get('/todoList' , async (req ,res) =>{
    db.connect()
    // console.log(await db.writeTodo(1000,"InsertTest","test insert code","1401/05/09"));
    console.log(await db.readAllToDo(1001));
    
})
app.listen(3000 , () => {
    console.log('server is listenning on port 3000');
    
})



