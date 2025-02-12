const { publicDecrypt } = require('crypto');
const path = require('path');
const { pathToFileURL } = require('url');

require('dotenv').config()

const verifyToken = require('../Security_Authentication/token_authentication.js');
const router_authentication = require('../Security_Authentication/rout_authentication.js');



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
        this.session = require('express-session');
        this.cokie = require('cookie-parser');

        this.app = this.express();
        this.app.use(this.express.json());
        this.app.use(this.cors());
        this.app.use(this.cokie());
        this.app.use(this.express.static(path.join(__dirname, '..', 'request')));;
        //this.app.use('/rout_authentication.js', verifyToken, router_authentication)
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
        
    
        
   //     this.app.get('/submit', (req, res) => {
    //        const username = req.query.Username;
      //      const password = req.query.Password;
        //    res.sendFile(path.join(__dirname, '..', 'public', 'submit.html'));
          //  console.log(`${username}`)
            //console.log(`${password}`)
  //      })

        this.app.use(this.express.urlencoded({ extended: true}));
    };


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
                    const passordMatch = await bcrypt.compare(Password, bruker.Passord);
                    //req.session.userid = results [0].BrukerID;
                   // console.log(passordMatch)
                    //console.log(bruker)

                    if (!passordMatch){
                       // return res.status(401).json({ error: 'Feil passord'});
                        return res.send('<p>Feil passord</p>');   // }
                    }
// Token gen and check
                    
                    const token = jwt.sign({ Brukernavn: bruker.Username, Rolle: bruker.Rolle}, privatekey, { 
                        algorithm: "RS256",
                        expiresIn: "1h"});

                    console.log(token)

                    try{
                        const decode = jwt.verify(token, publicKey);
                        console.log("decode", )//decode)
                        
                        
                    }
                    catch (err){
                        console.error(err.message)
                    
                    }
// Genererer cookie                    
                    res.cookie('auth_token', token,{
                        httpOnly: true,
                        sameSite: 'Strict',
                        maxAge: 3600000 //1 time
                    });
                    console.log("Logget inn")
                    res.json({ message:'Logget inn'});

                   

                });
                
        });
        this.app.use('/home', verifyToken, router_authentication)
   //         this.app.get('/home', verifyToken, (req, res) =>{
  //              console.log("Ruter burde bli aktivert");
 //               res.json({content: "Ruter er aktivert"});
//            });  
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