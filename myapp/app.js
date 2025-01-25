require('dotenv').config()


class Database_connection {
    
    connection() {
        console.log(this.username)
        const mysql = require('mysql2');
        let login_connection = mysql.createConnection({
            host: process.env.UH_DB_HOST,
            user: process.env.UH_DB_USER,
            password: process.env.UH_DB_PASSWORD,
            database: process.env.UH_DB_DATABASE,
        });
        this.express = require('express');
        const ip = process.env.IP;
        const h_ip = process.env.UH_IP
        this.app = this.express();
        const port = 5000;

        login_connection.connect(error => {
            if (error){
                console.log('A error has been occured'
                    + 'while connecting to database.');
                    throw error;
        }
            this.app.listen(port, h_ip, ()=>{
                console.log(`Database connected on ${port}`);
                console.log(`Example app available on http://${h_ip}:${port}`)
                console.log(`${ip}`)
            }
    )} 
    
    )
    };

    file_connect() {
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

        this.app.use(this.express.urlencoded({ extended: true}));
    };

    transfer(){
        return  a = 1
    }
    }

const run = new Database_connection();
run.connection();
run.file_connect();
//run.test('1A.Bibliotekar', '1A');

//redline 

//require('./web_server');

module.exports = Database_connection;

//xdg-open http://example.com
