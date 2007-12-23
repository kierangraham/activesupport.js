
// Number Extensions

$w("abs acos asin atan ceil cos exp floor log pow round sin sqrt tan").each(function(method) {
	Number.prototype[method] = Math[method].methodize();
});

Object.extend(Number.prototype, {
	ordinalize: function() {
		return Inflector.ordinalize(this);
	}
});

(function() {
	var ByteExtensions = {
		byte:     function() { return this; },
		kilobyte: function() { return this * 1024; },
		megabyte: function() { return this * (1024).kilobytes(); },
		gigabyte: function() { return this * (1024).megabytes(); },
		terabyte: function() { return this * (1024).gigabytes(); },
		petabyte: function() { return this * (1024).terabytes(); },
		exabyte:  function() { return this * (1024).petabytes(); }
	};
	ActiveSupport.pluralizeMethods(ByteExtensions);
	Object.extend(Number.prototype, ByteExtensions);

	var IntervalExtensions = {
	  second:    function() { return this * 1000; },
	  minute:    function() { return this.seconds() * 60; },
	  hour:      function() { return this.minutes() * 60; },
	  day:       function() { return this.hours() * 24; },
	  week:      function() { return this.days() * 7; },
		fortnight: function() { return this.weeks() * 2; },
		month:     function() { return this.days() * 30; },
		year:      function() { return this.months() * 12 }
	};
	ActiveSupport.pluralizeMethods(IntervalExtensions);
	Object.extend(Number.prototype, IntervalExtensions)
	
	var TimeExtensions = {
	  since: function(reference) { return new Date((reference || new Date()).getTime() + this); },
	  until: function(reference) { return new Date((reference || new Date()).getTime() - this); }
	}
	TimeExtensions.fromNow = TimeExtensions.since.curry(null);
	TimeExtensions.ago = TimeExtensions.until.curry(null);
	TimeExtensions.toDate = (0).ago;
	Object.extend(Number.prototype, TimeExtensions);
})();
