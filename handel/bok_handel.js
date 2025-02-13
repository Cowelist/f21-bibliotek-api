const exrpess = require("express")
const app = exrpess()
    
    
    console.log("handel kjører")
    function handel(){
        app.post('/add-bok', (req,res) => {
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
        app.get('/Bok', (req, res) => {
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