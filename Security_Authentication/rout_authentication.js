const express = require('express');
const router = express.Router();
const verifyToken = require('../Security_Authentication/token_authentication.js');

router.get('/', verifyToken, (req, res) => { //Spør token_... om taken er valid, hvis ja så sender den deg vidre, hvis ikke så blir du på samme side
    res.send(`Bruker: ${req.user.Brukernavn} har logget seg inn`)
    console.log("router kjører login autorisasjon")
});

console.log("rout kjører")

module.exports = router;