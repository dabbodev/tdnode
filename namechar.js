var bleno = require('bleno');
var util = require('util');
var BlenoCharacteristic = bleno.Characteristic;
var tts;
var ddata = require('./ddata.js');

function stringToBytes(string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

function bytesToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

var NameChar = function () {
   bleno.Characteristic.call(this, {
      uuid: '001f',
      properties: ['read', 'write']
   });
this.ddata = new ddata();
};
util.inherits(NameChar, BlenoCharacteristic);
NameChar.prototype.onReadRequest = function(offset, callback) {
   console.log('incoming request');
   if(!offset) {
      callback(this.RESULT_SUCCESS, stringToBytes(this.ddata.displayd));
   } else {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
}
   console.log('NameChar - Read: value = ' + this.ddata.displayd);
  
};

NameChar.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
   console.log("recieved " + data);
   var recieved = bytesToString(data);
   console.log(this.ddata.displayd);
   callback(this.RESULT_SUCCESS);
}

module.exports = NameChar;