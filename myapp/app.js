const express = require ('express');
const app = express()
const port = 3064

app.get('/', (req, res) => {
    res.send('Hello bob')
})

app.listen(port, () => {
    console.log(`Example app available on http://localhost:${port}`)
})


class Database {
    trigger_activation(username){
        //username = document.getElementById('InUser')
        //this.username = ("Hei")
        console.log(`Hei, ${this.username}`)
        // pass = document.getElementById('InPass')
        // console.log(username)
        // test()
        // return Username && password && database_connection();
    }

    connection(username, pass) {
        console.log(this.username)
        const host = ('localhost')
        const database = ('F21_bibliotek')
        const mysql = require('mysql2');
        let login_connection = mysql.createConnection({
            host: host,
            user: "1A.Bibliotekar",//this.username,
            password: "1A",//this.pass,
            database: database
             
        });

        login_connection.connect(error => {
            if (error){
                console.log('A error has been occured'
                    + 'while connecting to database.');
                    throw error;
            }
          
        }) 


        // login_connection.connect(function(err){
        //     if (err) throw err;
        //     console.log('Connected!');
    // })
    }
    test(username, pass) {
        this.username = username; 
        this.pass = pass;
        // console.log(`Hei, ${this.username}`)
        // console.log(`Hei, ${this.pass}`)
        this.connection()
    }
}


const run = new Database();
run.connection();
//run.test('1A.Bibliotekar', '1A');