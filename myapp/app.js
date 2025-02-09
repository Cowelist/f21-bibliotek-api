const { publicDecrypt } = require('crypto');
const { pathToFileURL } = require('url');

require('dotenv').config()
//require('')




class Database_connection {

    connection() {
        console.log(this.username)
        const mysql = require('mysql2');
        this.login_connection = mysql.createConnection({
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

        this.login_connection.connect(error => {
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
        const cors = require('cors');
        const path = require('path');

        this.app.use(cors());


        //app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
            // login_form();
        });
        
        this.app.get('/submit', (req, res) => {
            const username = req.query.Username;
            const password = req.query.Password;
            res.sendFile(path.join(__dirname, '..', 'public', 'submit.html'));
            console.log(`${username}`)
            console.log(`${password}`)
        })

        this.app.use(this.express.urlencoded({ extended: true}));
    };

    Request(){
        this.app.post('/add-bok', (req,res) => {
            const {Forfatter, Sjanger, Publiserings_dato, Spraak, Bok_Tittel} = req.body;

            if (!Sjanger || !Publiserings_dato || !Spraak || !Bok_Tittel) {
                return res.status(400).json({ error: "Fyll ut Sjanger, Publisering_dato, spraak og Bok_Tittel"});
            }
          
            const sql = 'INSERT INTO bok_data (Forfatter, Sjanger, Publiserings_dato, Spraak, Bok_Tittel) VALUES (?, ?, ?, ?, ?)';
            this.login_connection(sql, [Forfatter, Sjanger, Publiserings_dato, Spraak, Bok_Tittel], (err, result) => {
                if (err) {
                    console.error('Error av lagring bok i databasen', err);
                    res.status(500).json({ error: 'Database error' });
                } 
                else {
                    res.status(201).json({
                        message: 'Boka ble lagt til i databasen',
                        user: {Forfatter, Sjanger, Publiserings_dato, Spraak, Bok_Tittel}
                    });
                }
            });
        });
        this.app.get('/Bok', (req, res) => {
            const sql = 'SELECT * FROM Bok_data';
            this.login_connection(sql, (err, results) => {
                if (err){
                    console.error('Error med å hente data fra databasen', err);
                    res.status(500).json({ error: 'Database error' });
                } 
                else {
                    res.json(results);
                }
            });
        });
    }
    Brukere(){
        const jwt = require('jsonwebtoke');
        const bcrypt = require('bcryptjs');
        this.app.post('/login', (req, res) => {
            const {Brukernavn, Passord } = req.body;

            this.login_connection.query('SELECT * FROM Brukere WHERE Brukernavn = ?', [Brukernavn], async (err, results) => {
                if (err) return res.status(500).json({ error: 'Database error'});
                if (results.lenght === 0) return res.status(401).json({ error: 'Bruker finnes ikke'});

                const bruker = results[0];
                const passordMatch = await bcrypt.compare(Passord, bruker.Passord);

                if (!passordMatch) return res.status(401).json({ error: 'Feil passord'});
                res.json({ message:' Logget inn'});
            });
        });
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
