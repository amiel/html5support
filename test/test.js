$(document).ready(function() {

  // 
  //   
  // if ($.browser.webkit) {
  //   module("Webkit");
  //   test("should support the fancy attributes", function() {
  //     equal(HTML5Support.supports_attribute('placeholder'), true, "should support placeholder attribute");
  //     equal(HTML5Support.supports_attribute('autofocus'), true, "should support autofocus attribute");
  //   });
  // } else {
  //   module("Non-webkit browsers");
  //   test("should not support fancy attributes", function() {
  //     equal(HTML5Support.supports_attribute('placeholder'), false, "should not support placeholder attribute");
  //     equal(HTML5Support.supports_attribute('autofocus'), false, "should not support autofocus attribute");
  //   });
  // }

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
          expected_placeholder_value = $.browser.msie ? "foobar" : undefined;
      equal(input[0].placeholder, expected_placeholder_value, "elements placeholder accessor should be undefined");

      input.placeholder();
      equal(input[0].className, "placeholder");
      equal(input.val(), "foobar\u00A0\u00A0\u00A0");
    });
  }



  module("Password placeholder");
  if (HTML5Support.supports_attribute('placeholder')) {
    test("with placeholder support", function() {
      var input = $('#password_field'),
          n_fields = $('#test_form input').length;
      input.placeholder();
      equal($('#test_form input').length, n_fields, "expected the number of fields not to change");
    });
  } else {
    test("without placeholder support", function() {
      var input = $('#password_field'),
          n_fields = $('#test_form input').length;

      input.placeholder();

      var placeholder = input.next();
      equal($('#test_form input').length, n_fields+1, "there should still be 4 input fields");
      equal(placeholder.length, 1, 'we expect the new placeholder input to exist');
      ok(!input.is(':visible'), 'the input field should have been hidden');
      ok(placeholder.is(':visible'), "we should start out by seeing the placeholder");

      placeholder.focus();

      ok(input.is(':visible'), 'the input field should have been shown');
      ok(!placeholder.is(':visible'), 'the placeholder should have been hidden');

      // we could go through a whole cycle, but the next test does...

      input.blur();
    });

    test("without placeholder support and with already a value in the password field", function() {
      var input = $('#password_with_value'),
          n_fields = $('#test_form input').length;

      input.placeholder();

      var placeholder = input.next();
      equal($('#test_form input').length, n_fields+1, "there should still be 3 input fields");
      equal(placeholder.length, 1, 'we expect the new placeholder input to exist');
      ok(input.is(':visible'), 'the input field should have been hidden');
      ok(!placeholder.is(':visible'), "we should start out by seeing the placeholder");

      input.focus();

      ok(input.is(':visible'), 'the input field should still be shown');
      ok(!placeholder.is(':visible'), 'the placeholder should still be hidden');

      input.val(' '); input.blur();

      ok(!input.is(':visible'), 'the input field should have been hidden');
      ok(placeholder.is(':visible'), "the placeholder should have been shown");

      placeholder.focus(); input.val('secret').blur();

      ok(input.is(':visible'), 'the input field should be shown');
      ok(!placeholder.is(':visible'), 'the placeholder should be hidden');
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

    test("without placeholder support with the full attribute specifier", function() {
      var input = $('#autofocus_attr_test'),
          input_has_been_focused = false;

      input.focus(function() {
        input_has_been_focused = true;
      });

      input.autofocus();
      ok(input_has_been_focused, 'input should have been focused on call to autofocus');
    });

  }

});
