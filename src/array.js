
// Array Extensions

Array.prototype.toSentence = function() {
	var options = Object.extend({ 
		"connector": "and", 
		"skip_last_comma": false 
	}, arguments[0] || {});
	
	switch (this.length) {
		case 0:  return "";
		case 1:  return this.first().toString();
		case 2:  return this[0] + " " + options.connector + " " + this[1];
		default: return this.slice(0, -1).join(', ') + (options.skip_last_comma ? ' ' : ', ') + options.connector + " " + this[this.length-1];
	}
};
