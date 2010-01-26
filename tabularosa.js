/*
 * tabularosa.js
 * Amiel Martin
 * 2010-01-26
 *
 * Placeholder text as an extremely simple jquery plugin.
 */

$.fn.tabularosa = function(value) {
	return this.each(function() {
		var self = $(this),
			klass = 'tabularosa',
			value = value || self.attr('placeholder'),
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
