var alphabet = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var base = alphabet.length;

function encode(num){
  var encoded = '';

  num = Math.floor(num);

  while (enconded.length < 3){
    var remainder = num % base;
    num = Math.floor(num / base) + remainder;
    encoded = alphabet[remainder].toString() + encoded;
  }
  
  return encoded;
}

module.exports.encode = encode;