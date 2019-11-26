const express = require('express');
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
// const env = require('./env');
const router = express.Router(); // Creates a new router object.
// const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
// const authentication = require('./api/routes/authentication')(router);

app.set("port",(process.env.PORT || 8091))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(cors());

app.use('/api',api)
// app.use('/authentication', authentication); 
app.use(express.static('static'))

app.use(morgan('dev'))
// app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
// Use Authentication routes in application
//
//
//
app.use(function(req,res){
    console.log("error shown in the error block")
    const err = new Error('Not Found')
    err.status = 404
    res.json(err)
})

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


// Connect server to Angular 2 Index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Edustage',{useNewUrlParser:true})
mongoose.Promise = global.Promise;

const db = mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open', function(){
    console.log('Connected to Mongo DB')

    app.listen(app.get('port'),function(){
        console.log('API server listening on port' + app.get('port')+ '!')
    })
})

