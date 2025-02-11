const { publicDecrypt } = require('crypto');
const path = require('path');
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
        this.cors = require('cors');
        this.express = require('express');
        this.session = require('express-session')

        this.app = this.express();
        this.app.use(this.express.json());
        this.app.use(this.cors());
        this.app.use(this.express.static(path.join(__dirname, '..', 'request')));;
        // this.app.use(this.session, {
        //     SECRET_KEY: "oWEho#+32Jbwlrpj",
        //     resave: false,
        //     save: false
        // })

        const ip = process.env.IP;
        const h_ip = process.env.UH_IP
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
       
        const path = require('path');

        


        //app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
            console.log("Noe fungerer");
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
        async Brukere(req, res){
            console.log("FUngerer 50/50")
            const jwt = require('jsonwebtoken');
            const bcrypt = require('bcryptjs');
            const fs = require('fs');
            this.app.post('/login', (req, res) => {
                const {Username, Password } = req.body;
                //const SECRET_KEY = process.env.SEC_KEY
                const privatekey = fs.readFileSync('private.pem', 'utf8');
                const publicKey = fs.readFileSync('public.pem', 'utf8');

// Snakker med db
                this.login_connection.query('SELECT * FROM Brukere WHERE Brukernavn = ?', [Username], async (err, results) => {
                    //console.log(results)
                    console.log(req.body)

                    
                    if (err) {
                        //return res.status(500).json({ error: 'Database error'});
                        return res.send('<p>Database error</p>');
                    }
                    if (results.length== 0) {
                        //return res.status(401).json({ error: 'Bruker finnes ikke'});
                        return res.send('<p>Brukernavn finnes ikke</p>');
                    }
                    
// Pass comp
                    const bruker = results[0];
                    //console.log(bruker.Passord)
                    console.log(Username)
                    console.log(Password)
                    const passordMatch = await bcrypt.compare(Password, bruker.Passord);
                    //req.session.userid = results [0].BrukerID;
                   // console.log(passordMatch)
                    console.log(bruker)

                    if (!passordMatch){
                       // return res.status(401).json({ error: 'Feil passord'});
                        return res.send('<p>Feil passord</p>');   // }
                    }

                    res.json({ message:'Logget inn'});
                    const token = jwt.sign({ Brukernavn: bruker.Username, Rolle: bruker.Rolle}, privatekey, { 
                        algorithm: "RS256",
                        expiresIn: "1h"});

                    console.log(token)

                    try{
                        const decode = jwt.verify(token, publicKey);
                        console.log("decode", decode)
                    }
                    catch (err){
                        console.error(err.message)
                    
                    }

                    //res.json({ message: "logget Inn", token, rolle: bruker.rolle});
                });
        });
        }
}




const run = new Database_connection();
run.connection();
run.file_connect();
run.Brukere();
//run.test('1A.Bibliotekar', '1A');

//redline 

//require('./web_server');

module.exports = Database_connection;

//xdg-open http://example.com
//we