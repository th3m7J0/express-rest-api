
const envs = require('../config/loadenvs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../config/database');
const ninjaCrud = require('./routes/ninja');
const morgan = require('morgan');

// envirement variables
console.log(envs);



// set up express app
const app = express();

// cors middleware
app.use(( req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});




// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// inisialize routes
app.use('/api',ninjaCrud);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// handle errors
app.use(function(err, req, res, next) {
    //console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Ressource Not found"});
    else
        res.status(500).json({message: err.message});
});

// listen for requests
app.listen(process.env.PORT || 4000,function () {
    console.log("node env : "+process.env.NODE_ENV);
    console.log(`now listening for requests on port ${process.env.PORT}`);
})


module.exports  = app;
