const jwt = require('jsonwebtoken');
const fs = require('fs');

console.log("Token fil blir åpna")
const publicKey = fs.readFileSync('../myapp/public.pem', 'utf8');

function verifyToken(req, res, next){ //sjekker om token er valid 
//Ser etter Token
    let token = req.headers.cookie;
    if(token){
        req.user = {};
        req.user.isAuth = false
        token = token.split("auth_token=")[1];
    }
//Verifiserer token
    jwt.verify(token, publicKey, (err, decode) => {
        if (err){
    //        return res.status(401).send('Token har utløpt');
            console.log("Token er feil")
            req.user = {};
            req.user.isAuth = false
        }
        else {
            req.user = decode;
            req.user.isAuth = true
            console.log(decode)
        }
        console.log(req.user.isAuth)
        next();
    })
}



module.exports = verifyToken;