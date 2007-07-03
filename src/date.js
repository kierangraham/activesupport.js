
// Date Extensions

Object.extend(Date, {
  MONTHS: $w("January February March April May June July August September October November December"),
  ABBR_MONTHS: $w("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"),
  WEEKDAYS: $w("Sunday Monday Tuesday Wednesday Thursday Friday Saturday"),
  ABBR_WEEKDAYS: $w("Sun Mon Tue Wed Thu Fri Sat"),
	RELATIVE_DATE_OUTPUT: {
		today: "today",
		yesterday: "yesterday",
		tomorrow: "tomorrow",
		hour_format: "%H:%M, ",
		date_format: "%b %o",
		year_format: ", %Y"
	},
	RELATIVE_TIME_RANGES: {
		0:  "less than a minute",
		15: "#{pluralize(this, 'minute')}",
		25: "less than half an hour",
		35: "about half an hour",
		55: "less than an hour",
		65: "about an hour",
		85: "less than an hour and a half",
		95: "about an hour and a half",
		115: "less than 2 hours",
		125: "about 2 hours",
		145: "less than 2 hours and a half",
		155: "about 2 hours and a half",
		175: "less than 3 hours",
		185: "around 3 hours"
	},
  STRING_FORMATS: {
		"%a": function() { return Date.ABBR_WEEKDAYS[this.getDay()]; },
		"%A": function() { return Date.WEEKDAYS[this.getDay()]; },
		"%b": function() { return Date.ABBR_MONTHS[this.getMonth()]; },
		"%B": function() { return Date.MONTHS[this.getMonth()]; },
		"%c": function() { return this.toLocaleString(); },
		"%d": function() { return this.getDate().toPaddedString(2); },
	  "%H": function() { return this.getHours().toPaddedString(2); },
	  "%I": function() { return (this.getHours() % 12).toPaddedString(2); },
		"%j": function() { throw Error("not implemented"); },
	  "%m": function() { return (this.getMonth() + 1).toPaddedString(2); },
	  "%M": function() { return this.getMinutes().toPaddedString(2); },
		"%o": function() { return this.getDate().ordinalize(); },
	  "%p": function() { return Math.floor(this.getHour() / 12) == 0 ? "AM" : "PM"; },
	  "%S": function() { return this.getSeconds().toPaddedString(2); },
		"%U": function() { throw Error("not implemented"); },
		"%W": function() { throw Error("not implemented"); },
		"%w": function() { return this.getDay(); },
		"%x": function() { throw Error("not implemented"); },
		"%X": function() { throw Error("not implemented"); },
	  "%y": function() { return this.getYear().toPaddedString(2); },
	  "%Y": function() { return this.getFullYear().toPaddedString(4); },
		"%Z": function() { throw Error("not implemented"); }
	},
	now: function() {
		return new Date();
	},
	today: function() {
		return new Date().atBeginningOfDay();
	}
});

Object.extend(Date.prototype, {
  equals: function(otherDate) {
    return this.getFullYear() == otherDate.getFullYear() && this.getMonth() == otherDate.getMonth() && this.getDate() == otherDate.getDate();
  },
  isLeapYear: function() {
    var year = this.getFullYear();
    return (year % 4 == 0 && year % 100 != 0) || year % 400;
  },
  getMonthName: function() {
    return Date.MONTHS[this.getMonth()];
  },
  getDaysInMonth: function() {
    switch (this.getMonth() + 1) {
      case 2:
        return this.isLeapYear() ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  },
  isToday: function() {
    return this.midnight().equals(new Date().midnight());
  },
	succ: function() {
		return (1).second().fromNow();
	},
  toFormattedString: function(format) {
    return format.gsub(/%[a-zA-Z]/, function(pattern) {
      return Date.STRING_FORMATS[pattern].bind(this)().toString();
    }.bind(this)).replace(/%%/, "%");
  },
	relativeDate: function() {
		var targetTime = this.atBeginningOfDay();
		var today = Date.today();
		
		if (targetTime.equals(today)) {
			return Date.RELATIVE_DATE_OUTPUT["today"];
		} else if (targetTime.equals(today.yesterday())) {
			return Date.RELATIVE_DATE_OUTPUT["yesterday"];
		} else if (targetTime.equals(today.tomorrow())) {
			return Date.RELATIVE_DATE_OUTPUT["tomorrow"];
		} else {
			var format = Date.RELATIVE_DATE_OUTPUT["date_format"];
			format += targetTime.getFullYear() == today.getFullYear() ? "" : Date.RELATIVE_DATE_OUTPUT["year_format"];
			return this.strftime(format);
		}
	},
	relativeTime: function() {
		var options = Object.extend({ prefix: "", suffix: "" }, arguments[0] || {});
		var distanceInMinutes = ((Date.now().getTime() - this.getTime()).abs() / 60000).round();
		return $H(Date.RELATIVE_TIME_RANGES).map(function(pair) { 
			return (distanceInMinutes <= pair.first()) ? 
				(options["prefix"] + " " + $Q(pair.last(), distanceInMinutes) + " " + options["suffix"]).strip() : false; 
		}).find(Prototype.K) || $Q("#{this.relativeDate()} at #{this.strftime('%H:%M')}", this);
	},
	since: function(seconds) {
	 	return seconds.since(this);
	},
	ago: function(seconds) {
		return this.since(-seconds);
	},
	beginningOfDay: function() {
		return new Date(this).setHours(0).setMinutes(0).setSeconds(0);
	},
	beginningOfWeek: function() {
		var daysToSunday = this.getDay() == 0 ? 6 : this.getDay() - 1;
		return daysToSunday.days().until(this.beginningOfDay());
	},
	beginningOfMonth: function() {
		return this.beginningOfDay().setDate(1);
	},
	beginningOfQuarter: function() {
		return this.beginningOfMonth().setMonth([9, 6, 3, 0].detect(function(m) { return m <= this.getMonth(); }.bind(this)));
	},
	beginningOfYear: function() {
		return this.beginningOfMonth().setMonth(0);
	},
	endOfDay: function() {
		return new Date(this).setHours(23).setMinutes(59).setSeconds(59);
	},
	endOfMonth: function() {
		return this.beginningOfDay().setDate(this.getDaysInMonth());
	},
	endOfQuarter: function() {
		return this.setMonth([2, 5, 8, 11].detect(function(m) { return m >= this.getMonth(); }.bind(this))).endOfMonth();
	},
	yesterday: function() {
		return this.setDate(this.getDate() - 1);
	},
	tomorrow: function() {
		return this.setDate(this.getDate() + 1);
	}
});

$w("setDate setMonth setFullYear setYear setHours setMinutes setSeconds setMilliseconds setTime").each(function(method) {
	Date.prototype[method + "WithoutChaining"] = Date.prototype[method];
	Date.prototype[method] = function() {
		this[method + "WithoutChaining"].call(this, $A(arguments));
		return this;
	}
});

$w("beginningOfDay beginningOfWeek beginningOfMonth beginningOfQuarter beginningOfYear endOfDay endOfMonth endOfQuarter").each(function(method) {
	Date.prototype["at" + method.charAt(0).toUpperCase() + method.substring(1)] = Date.prototype[method];
});

Date.prototype.strftime = Date.prototype.toFormattedString;
Date.prototype.midnight = Date.prototype.beginningOfDay;
Date.prototype.monday = Date.prototype.beginningOfWeek;

Date.WEEKDAYS.each(function(dayName, dayIndex) {
  Date.prototype["is" + dayName] = function() {
    return this.getDay() % 7 == dayIndex;
  }
});