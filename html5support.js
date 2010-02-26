/*
 * html5support.js
 * Amiel Martin
 * 2010-01-26
 *
 * Support certain HTML 5 attributes with javascript, but only if the browser doesn't already support them.
 */

var HTML5Support = (function($){
	var // private members
		// give the input field this class when the placeholder text is used
		placeholder_klass = 'placeholder',
		// this will become our HTML5Support object
		h5 = {};
	
	// public functions
	h5.supports_attribute = function(attribute, type) { // should we memoize this?
		return attribute in document.createElement(type || 'input');
	}

	// private functions
	function tabularosa() {
		var self = $(this),
			value = self.attr('placeholder'),
			set_value = function() {
				if ($.trim(self.val()) == '' || self.val() == value)
					self.val(value).addClass(placeholder_klass);
			},
			clear_value = function() {
				if (self.val() == value)
					self.val('').removeClass(placeholder_klass);
			};
		self.live('focus', clear_value);
		self.live('blur', set_value);
		self.trigger('blur');
	}


	// jquery plugins
	
	$.fn.placeholder = function(value) {
		if (h5.supports_attribute('placeholder')) return this;
		return this.each(tabularosa);
	};
	
	$.fn.autofocus = function() {
		if (h5.supports_attribute('autofocus')) return this;
		return this.focus();
	};
	
	
	$.autofocus = function() { $('[autofocus]').autofocus(); };
	$.placeholder = function() { $('[placeholder]').placeholder(); };
	
	$.html5support = function() { $.autofocus(); $.placeholder(); };
	
	return h5;
})(jQuery);
