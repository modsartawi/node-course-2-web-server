const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
console.log(port);
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {

    console.log(req.url, req.method);

     var now = new Date().toString();
     var log  = `${now} :\t${req.method}\t${req.url}`;
     console.log(log);
     fs.appendFile('server.log', log + '\n\r', (error)=>{
        if(error){
            console.log('unable to write log');
        }
       
     });


    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',

        welcomeMessage: 'Welcome to the express framework with HBS'
    });
});
app.get('/about', (req, res) => {
    // res.send('<h1>Abount Page</h1>');
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessag: 'Unable to fulfill your request'
    });
});



app.listen(port);