class Database_connection {
    
    not_call(){
        //this.app = express();
    }
    connection() {
        console.log(this.username)
        const host = ('localhost')
        const database = ('F21_Bibliotek')
        const mysql = require('mysql2');

        let login_connection = mysql.createConnection({
            host: host,
            user: "1A.Bibliotekar",//this.username,
            password: "1A",//this.pass,
            database: database
             
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
        console.log('Jeg hatter livet mitt')
        this.app.get('/', (req, res) => {
            console.log("Hei")
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
            console.log("QWERTYU")
        });

        this.app.use(express.urlencoded({ extended: true}));

        // app.post('/submit', (req, res) => {
        //     const { InUser } = req.body;
        //     console.log('test')
        // })

    };
    }




const run = new Database_connection();
run.connection();
run.file_connect();
//run.test('1A.Bibliotekar', '1A');

//redline 
