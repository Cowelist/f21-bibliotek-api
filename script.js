login_connection(function(err) {
    if (err) throw err;
    console.log('Connected');
    // login_connection.query('CREATE DATABASE mydb', function (err, result){
    //     if (err) throw err;
    //     console.log('Database created');
    });
// });

let Username = "test"
let password = "test"

function login_click() {
    Username = document.getElementById('InUser')
    password = document.getElementById('InPass')
    console.log(Username)
    test()
    return Username && password && database_connection();
}

function database_connection() {
    console.log(Username)
    const host = ('localhost')
    const database = ('F21_bibliotek')
    const mysql = require('mysql2');
    let login_connection = mysql.createConnection({
        host: host,
        password: password,
        database: database
    });
}

function test() {
while (true){
    Username = document.getElementById('InUser')
    console.log(Username)
}}


test()