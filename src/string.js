
// String Extensions

Object.extend(String.prototype, {
	interpolate: function(binding) {
		return new InterpolatableString(this, binding || window).toString();
	},
	pluralize: function() {
		return Inflector.pluralize(this.toString());
	},
	singularize: function() {
		return Inflector.singularize(this.toString());
	}
});
