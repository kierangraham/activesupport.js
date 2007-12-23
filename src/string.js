
// String Extensions

Object.extend(String.prototype, {
	pluralize: function() {
		return Inflector.pluralize(this.toString());
	},
	singularize: function() {
		return Inflector.singularize(this.toString());
	}
});
