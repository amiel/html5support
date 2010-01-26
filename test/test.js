$(document).ready(function() {

	module("placeholder attribute");

	// browser specific tests for now until we are sure that element.placeholder is a good test for functionality

	if ($.browser.webkit) {
		test("webkit specific support test", function() {
			var input = $('#with_placeholder');
			equal(input[0].placeholder, "foobar", "elements placeholder accessor should have the placeholder value");
		
			input.tabularosa();
			equal(input[0].className, "");
			equal(input.val(), "");
		});
	} else {
		test("not webkit support test", function() {
			var input = $('#with_placeholder'),
				expected_placeholder_value = $.browser.msie ? "foobar" : undefined;
			equal(input[0].placeholder, expected_placeholder_value, "elements placeholder accessor should be undefined");
		
			input.tabularosa();
			equal(input[0].className, "placeholder");
			equal(input.val(), "foobar");
		});
	}
	
	
	
	module("without placeholder attribute");
	test("set manually", function() {
		var input = $('#no_placeholder_manual');
		ok(!input[0].placeholder, "elements placeholder accessor should be undefined");
				
		input.tabularosa("bazfoo");
		equal(input[0].className, "placeholder");
		equal(input.val(), "bazfoo");
	});
	
	
	test("without setting manually should do nothing", function() {
		var input = $('#no_placeholder_nothing');
		ok(!input[0].placeholder, "elements placeholder accessor should be undefined");
				
		input.tabularosa();
		equal(input[0].className, "");
		equal(input.val(), "");
	});
		
});