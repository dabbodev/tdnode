var bleno = require('bleno');
var util = require('util');

var NameChar = require('./namechar.js');

function BTService() {
   bleno.PrimaryService.call(this, {
      uuid: '9f97d296-442a-4e30-8209-b2f71753ffae',
      characteristics: [
         new NameChar()
      ]
   });
};

util.inherits(BTService, bleno.PrimaryService);
module.exports = BTService;