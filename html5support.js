/*
 * tabularosa.js
 * Amiel Martin
 * 2010-01-26
 *
 * Add placeholder for browsers that don't support it.
 */

var HTML5Support = {};

(function($){
	var // private members
	// if no value is specified, find placeholder text in this html attribute
	placeholder_attribute = 'placeholder',
	// give the input field this class when the placeholder text is used
	placeholder_klass = placeholder_attribute;
	
	// public functions
	$.extend(HTML5Support, {
		supports_attribute: function(attribute, type) { // should we memoize this?
			return !!(attribute in document.createElement(type || 'input'));
		}
	});

	// private functions
	function tabularosa() {
		var self = $(this),
			value = self.attr(placeholder_attribute),
			set_value = function() {
				if ($.trim(self.val()) == '' || self.val() == value)
					self.val(value).addClass(placeholder_klass);
			},
			clear_value = function() {
				if (self.val() == value)
					self.val('').removeClass(placeholder_klass);
			};
		self.focus(clear_value).blur(set_value).blur();
	}


	// jquery plugins
	
	$.fn.placeholder = function(value) {
		if (HTML5Support.supports_attribute('placeholder')) return this;
		return this.each(tabularosa);
	};
	
	$.fn.autofocus = function() {
		if (HTML5Support.supports_attribute('autofocus')) return this;
		return this.focus();
	};
	
	
	$.autofocus = function() { $('[autofocus]').autofocus(); };
	$.placeholder = function() { $('['+placeholder_attribute+']').placeholder(); };
	
	$.html5support = function() { $.autofocus(); $.placeholder(); };
})(jQuery);
