'use strict';
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, p) {
		p = p || 0;
		return this.substr(p, searchString.length) === searchString;
	};
}