const myapp = require('./app');
const Sk_app = new myapp();
const app = Sk_app.transfer();

if (app == 1){
    console.log("Det fungerte")
}