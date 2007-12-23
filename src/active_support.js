<%= include 'HEADER' %>

var ActiveSupport = {
	Version: '<%= ACTIVE_SUPPORT_VERSION %>',
	
	pluralizeMethods: function(module) {
		$H(module).each(function(pair) {
			module[pair.first().pluralize()] = module[pair.first()];
		});
	},
	pluralize: function(count, singular) {
		return count.abs() == 1 ? count + " " + singular : count + " " + singular.pluralize();
	}
}

window.pluralize = ActiveSupport.pluralize;

<%= include 'inflector.js',
            'string.js',
            'array.js',
            'number.js',
            'date.js' %>