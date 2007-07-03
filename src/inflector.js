
// Inflector

var Inflector = {
	pluralize: function(word) {
		if (Inflections.uncountables.include(word.toLowerCase()))
			return word;
		return Inflections.plurals.map(function(pair) {
			return word.replace(pair.first(), pair.last());
		}).detect(function(plural) { return word != plural; }) || word;
	},
	singularize: function(word) {
		if (Inflections.uncountables.include(word.toLowerCase()))
			return word;
		return Inflections.singulars.map(function(pair) {
			return word.replace(pair.first(), pair.last());
		}).detect(function(singular) { return word != singular; }) || word;
	},
	ordinalize: function(number) {
		if ($R(11, 13).include(number % 100)) {
			return number + "th";
		}
		switch (number % 10) {
			case 1: return number + "st";
			case 2: return number + "nd";
			case 3: return number + "rd";
			default: return number + "th";
		}
	}
};

var Inflections = {
	plurals: [],
	singulars: [],
	uncountables: [],
	
	plural: function(rule, replacement) {
		this.plurals.unshift([rule, replacement]);
	},
	singular: function(rule, replacement) {
		this.singulars.unshift([rule, replacement]);
	},
	irregular: function(singular, plural) {
		this.plural(new RegExp(singular.charAt(0) + singular.substring(1) + "$", "i"), "$1" + plural.substring(1));
		this.singular(new RegExp(plural.charAt(0) + plural.substring(1) + "$", "i"), "$1" + singular.substring(1));
	},
	uncountable: function(uncountable) {
		this.uncountables = this.uncountables.concat($A(arguments));
	}
};

with (Inflections) {
	plural(/$/, "s");
	plural(/s$/i, "s");
	plural(/(ax|test)is$/i, "$1es");
	plural(/(octop|vir)us$/i, "$1i");
	plural(/(alias|status)$/i, "$1es");
	plural(/(bu)s$/i, "$1ses");
	plural(/(buffal|tomat)o$/i, "$1oes");
	plural(/([ti])um$/i, "$1a");
	plural(/sis$/i, "ses");
	plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
	plural(/(hive)$/i, "$1s");
	plural(/([^aeiouy]|qu)y$/i, "$1ies");
	plural(/([^aeiouy]|qu)ies$/i, "$1y");
	plural(/(x|ch|ss|sh)$/i, "$1es");
	plural(/(matr|vert|ind)ix|ex$/i, "$1ices");
	plural(/([m|l])ouse$/i, "$1ice");
	plural(/^(ox)$/i, "$1en");
	plural(/(quiz)$/i, "$1zes");
	
	singular(/s$/i, '');
	singular(/(n)ews$/i, '$1ews');
	singular(/([ti])a$/i, '$1um');
	singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');
	singular(/(^analy)ses$/i, '$1sis');
	singular(/([^f])ves$/i, '$1fe');
	singular(/(hive)s$/i, '$1');
	singular(/(tive)s$/i, '$1');
	singular(/([lr])ves$/i, '$1f');
	singular(/([^aeiouy]|qu)ies$/i, '$1y');
	singular(/(s)eries$/i, '$1eries');
	singular(/(m)ovies$/i, '$1ovie');
	singular(/(x|ch|ss|sh)es$/i, '$1');
	singular(/([m|l])ice$/i, '$1ouse');
	singular(/(bus)es$/i, '$1');
	singular(/(o)es$/i, '$1');
	singular(/(shoe)s$/i, '$1');
	singular(/(cris|ax|test)es$/i, '$1is');
	singular(/([octop|vir])i$/i, '$1us');
	singular(/(alias|status)es$/i, '$1');
	singular(/^(ox)en/i, '$1');
	singular(/(vert|ind)ices$/i, '$1ex');
	singular(/(matr)ices$/i, '$1ix');
	singular(/(quiz)zes$/i, '$1');
	
	irregular("person", "people");
	irregular("man", "men");
	irregular("child", "children");
	irregular("sex", "sexes");
	irregular("move", "moves");
	
	uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep");
};
