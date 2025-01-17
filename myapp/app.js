require('dotenv').config()
class Database_connection {
    
    connection() {
        console.log(this.username)
        const mysql = require('mysql2');
        let login_connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
             
        });
        const express = require('express');
        const ip = '192.168.1.21'
        this.app = express();
        const port = 5000;

        login_connection.connect(error => {
            if (error){
                console.log('A error has been occured'
                    + 'while connecting to database.');
                    throw error;
        }
            this.app.listen(port, ip, ()=>{
                console.log(`Database connected on ${port}`);
                console.log(`Example app available on http://192.168.1.21:${port}`)
            }
    )} 

    )};

    file_connect() {
        const express = require('express');
        const path = require('path');

        //app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
            // login_form();
        });
        
        this.app.get('/submit', (req, res) => {
            const username = req.query.Username;
            const password = req.query.Password;
            res.send(`Hei`)
            console.log(`${username}`)
            console.log(`${password}`)
        })

        this.app.use(express.urlencoded({ extended: true}));
    };
    }
class Web_connection{

}





const run = new Database_connection();
run.connection();
run.file_connect();
//run.test('1A.Bibliotekar', '1A');

//redline 
