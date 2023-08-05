import mysql from 'mysql'
import dotenv from 'dotenv'
import { rejects } from 'assert'
import { resolve } from 'path'
import { promises } from 'dns'
dotenv.config()


export default class {
    con = mysql.createConnection({
        host : process.env.Host,
        user : process.env.User,
        password : process.env.Password,
        database : "ToDo"
    })
    

    connect(){
     this.con.connect((err) =>{
        if (err) {
            console.log(err);
            
        } else {
            console.log('connected !');
            
        }
     })   
    }
    /**
     * for use this function you should pass userId that when you login can get and title that you
     * 
     * @param userId 
     * 
     * @returns array of object 
    */
    async readAllToDo(userId : Number) : Promise<any>  { 
        const data = await new Promise((resolve , rejects) =>{
            this.con.query(`SELECT * FROM ToDo WHERE usernumber = ${userId}` , (err , resualt) =>{
                if (err) {
                    rejects(err)
                }else{
                    resolve(resualt)
                }
            })
        })

        return data
    }

    /**
     * * this function read a todo by give userId  and Titke and return a array of object 
     * 
     * @param userId 
     * @param Titile 
     *  
     * @returns array of object
     */
    async readByuserId(userId : Number , Titile : String) : Promise<any>{
        const data = await new Promise((resolve , rejects) =>{
            this.con.query(`SELECT * FROM ToDo WHERE title = ${Titile} AND usernumber = ${userId}` , (err , resualt) =>{
                if (err) {
                    rejects(err)
                } else {
                    resolve(resualt)
                }
            })
        })

        return data
    }
    
    /**
     * this function add todo 
     * @param userId 
     * @param Titile 
     * @param Description 
     * @param Date 
     * 
     * @returns err if there and undifine if work well
     */

    async writeTodo(userId : Number , Titile : String , Description : String , Date : String) : Promise<any>{
        const data = await new Promise((resolve , rejects) =>{
            this.con.query(`INSERT INTO ToDo(title, Description, Date, usernumber) VALUES ('${Titile}','${Description}','${Date}',${userId})` , (err , resualt) =>{
                if (err) {
                    rejects(err)
                } else {
                    resolve("Todo added successfully")
                }
            })
        })


    }
}