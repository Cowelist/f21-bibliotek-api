//const module = require ('/home/elev/Documents/GitHub/f21-bibliotek-api/myapp/app.js')
const express = require ('express');
const app = express()
const port = 3064

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Example app available on http://localhost:${port}`)
})
