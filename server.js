require('./models/db')
// importing all the required files 
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const employeeController = require('./controllers/employeeController');  

var app = express(); // -> it creates a new express application for you

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs.engine({extname:'hbs',defaultLayout:'mainLayout', layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');

app.use('/employee', employeeController)

app.listen(3000, () =>{
    console.log('server started at port 3000');
});
