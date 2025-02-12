const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKey = fs.readFileSync('../myapp/public.pem', 'utf8');

function verifyToken(req, res, next){ //sjekker om token er valid 
//Ser etter Token
    const token = req.headers['autorisasjon']?.split (' ')[1];
    if(!token){
        return res.status(403).send('Token trengs')
    }
//Verifiserer token
    jwt.verify(token, publicKey, (err, decode) => {
        if (err){
            return res.status(401).send('Token har utløpt');
        }
        consoel.log("token er klart og kører selve siden nå")
        req.user = decode;
        next();
    })
}

console.log("token kjører")

module.exports = verifyToken;