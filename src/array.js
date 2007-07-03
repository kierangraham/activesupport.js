
// Array Extensions

Array.prototype.toSentence = function() {
	var options = Object.extend({ 
		"connector": "and", 
		"skip_last_comma": false 
	}, arguments[0] || {});
	
	switch (this.size()) {
		case 0: return "";
		case 1: return this.reduce();
		case 2: return $Q("#{this.first()} #{options['connector']} #{this.last()}", this);
		default: return $Q("#{this.slice(0, -1).join(', ')}#{options['skip_last_comma'] ? '' : ','} #{options['connector']} #{this.last()}", this);
	}
};
