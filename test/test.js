$(document).ready(function() {

	// this tests will have to be updated when browsers update
	if ($.browser.webkit) {
		module("Webkit");
		test("should support the fancy attributes", function() {
			equal(HTML5Support.supports_attribute('placeholder'), true, "should support placeholder attribute");
			equal(HTML5Support.supports_attribute('autofocus'), true, "should support autofocus attribute");
		});
	} else {
		module("Non-webkit browsers. If this fails, it may be due to a browser updating");
		test("should not support fancy attributes", function() {
			equal(HTML5Support.supports_attribute('placeholder'), false, "should not support placeholder attribute");
			equal(HTML5Support.supports_attribute('autofocus'), false, "should not support autofocus attribute");
		});
	}
	
	module("placeholder attribute");
	if (HTML5Support.supports_attribute('placeholder')) {
		test("with placeholder support", function() {
			var input = $('#with_placeholder');
			equal(input[0].placeholder, "foobar", "elements placeholder accessor should have the placeholder value");
		
			input.placeholder();
			equal(input[0].className, "");
			equal(input.val(), "");
		});
	} else {
		test("without placeholder support", function() {
			var input = $('#with_placeholder'),
				expected_placeholder_value = $.browser.msie ? "foobar" : undefined; // ie provides js access to incorrect attributes
			equal(input[0].placeholder, expected_placeholder_value, "elements placeholder accessor should be undefined");
		
			input.placeholder();
			equal(input[0].className, "placeholder");
			equal(input.val(), "foobar");
		});
	}
	
	module("autofocus attribute");
	if (HTML5Support.supports_attribute('autofocus')) {
		test("with autofocus support", function() {
			var input = $('#autofocus_test'),
				input_has_been_focused = false;
			
			input.focus(function() {
				input_has_been_focused = true;
			});
			
			input.autofocus();
			ok(!input_has_been_focused, 'input should not have been focused on call to autofocus');
		});
	} else {
		test("without placeholder support", function() {
			var input = $('#autofocus_test'),
				input_has_been_focused = false;
			
			input.focus(function() {
				input_has_been_focused = true;
			});
			
			input.autofocus();
			ok(input_has_been_focused, 'input should have been focused on call to autofocus');
		});
	}
	
	module("support live");
	test("placeholder", function() {
	    $.placeholder();
	    $('form:last').append("<input type='text' placeholder='barbaz' id='added_after' />");
	    var input = $('#added_after');
	    
	    if (HTML5Support.supports_attribute('placeholder')) {
	        equal(input[0].className, "");
			equal(input.val(), "");
	    } else {
	        equal(input[0].className, "placeholder");
			equal(input.val(), "foobar");
	    }
	});
	
});