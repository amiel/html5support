/*
 * tabularosa.js
 * Amiel Martin
 * 2010-01-26
 *
 * Add placeholder for browsers that don't support it.
 */

$.fn.tabularosa = function(value) {
	var attribute = 'placeholder', // if no value is specified, find placeholder text in this html attribute
		klass = attribute; // give the input field this class when the placeholder text is used
	
	return this.each(function() {
		// this acurately tests for placeholder compliance
		// tested in Firefox, Safari and Chrome
		if (this.placeholder) return;
		
		if (!value) value = $(this).attr(attribute);
		if (!value) return; // do nothing if we have no value to set
		
		var self = $(this),
			set_value = function() {
				if ($.trim(self.val()) == '' || self.val() == value)
					self.val(value).addClass(klass);
			},
			clear_value = function() {
				if (self.val() == value)
					self.val('').removeClass(klass);
			};
		self.focus(clear_value).blur(set_value).blur();
	});
};
