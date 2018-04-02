var express = require('express');
var bleno = require('bleno');
var util = require('util');
var exec = require('child_process').exec;
var child;
var ddata = require('./ddata.js');

var http = require('http');
var app = express();

var BTService = require('./service.js');
var service = new BTService();

    app.set('view engine', 'ejs');  //tell Express we're using EJS
    app.set('views', __dirname + '/views');  //set path to *.ejs files
    //put your static files (js, css, images) into /public directory
    app.use('/public', express.static(__dirname + '/public'));

var getCont = function() {
   return service.characteristics[0].ddata.displayd;
}

app.get('/', function(req, res) {
    //render index.ejs file
    res.render('index', {val: getCont()});
});

app.get('/ajax', function(req, res) {
    res.send(getCont());
});

http.createServer(app).listen(4500);

bleno.on('stateChange', function(state) {
   console.log('bleno turning ' + state);
   if (state === 'poweredOn') {
      bleno.startAdvertising('Display #a6F9', [service.uuid]);
   } else {
      bleno.stopAdvertising();
   }
});

bleno.on('advertisingStart', function(error) {
   console.log('advertising ' + (error ? 'error ' + error : 'success'));

   if (!error) {
      bleno.setServices([service]);
   }
});

bleno.on('accept', function(clientAddress) {
   console.log('accepting conection from ' + clientAddress);
});

bleno.on('disconnect', function(clientAddress) {
   console.log('lost conection from ' + clientAddress);

});



