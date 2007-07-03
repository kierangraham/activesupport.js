
// String Interpolation

var InterpolatableString = Class.create();
InterpolatableString.prototype = {
	initialize: function(string, binding) {
		this.string = string;
		this.tokens = (string.match(/#{([^}]+)}/ig) || []).map(function(token) { 
			return new InterpolatableString.Token(token, binding);
		});
	},
	toString: function() {
		return this.tokens.inject(this.string.toString(), function(result, token) {
			return result.gsub(token.toRegExp(), token.evaluate()).toString();
		}.bind(this));
	}
};

InterpolatableString.Token = Class.create();
InterpolatableString.Token.prototype = {
	initialize: function(token, binding) {
		this.token = token.replace(/^#{(.*)}$/, "$1");
		this.binding = binding;
	},
	toRegExp: function() {
		var token = ("#{" + this.token + "}").replace(/\(/, "\\(").replace(/\)/, "\\)").replace(/\[/, "\\[").replace(/\]/, "\\]").replace(/\./, "\\.").replace(/\-/, "\\-");
		return new RegExp(token, "i");
	},
	evaluate: function() {
		var token = this.token;
		return (function() { return eval(token); }.bind(this.binding))();
	}
};

var $Q = function(string, binding) {
	return string.interpolate(binding || window);
};
