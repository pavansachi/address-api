"use strict";

var address_service = require("./address/service/address.service");
var express = require('express');
var bodyParser = require('body-parser');

var app = new express();

let service = new address_service.AddressService();

register();
initialize();

function register () {

    app.use( bodyParser.json()); 
        app.use(bodyParser.urlencoded({  
        extended: true
    })); 

    app.use('/', function (error, req, res, next) {

        console.log(`
            method: ${JSON.stringify(req.method)}
            params: ${JSON.stringify(req.params)}
            body: ${JSON.stringify(req.body)}
        `);

    next();
    });

    app.post('/', (req, res) => {

        res.setHeader('Content-Type', 'application/json');
       
        try {

            let payload = req.body.payload;
    
            let responseList = service.getResponseList(payload);

            res.send(responseList);

        } catch (e) {

            let msg = {
                "error": "Could not decode request: JSON parsing failed"
            }

            res.status(400).send(msg);
        }
    });
}

function initialize () {

    app.listen(3000, () => {

        console.log('app started on 3000');
    });
}
