'use strict';

var raw_points;

$.get('http://api.ipify.org?format=text&callback=?',
  function(text) {
    $('input[name="user_ip"]').val(text);
  }
);

$.get('http://codeluca.me/points',
  function(text) {
    raw_points = text;
  }
);

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};
  

$('.close-trigger').click(function() {
  $('aside.open').removeClass('open');
  return false;
});

$('form#proposal').submit(function(event) {
  event.preventDefault();

  // var check_login = function() {

  // };

  var form_valid = function() {
    if($('[required]').val().length === 0) {
      return false;
    } else {
      return true;
    }
  };

  console.log(form_valid)

  var success = function() {
    console.log('Success');
  };

  var error = function() {
    console.log('Error');
  }
  
  if(form_valid) {
    
    $.ajax({
      method: 'POST',
      url: 'http://codeluca.me/create',
      data: {
        'ip': $('input[name="user_ip"]').val(),
        'name': $('input[name="project_name"]').val(),
        'desc': $('textarea[name="project_desc"]').val(),
        'photo': null,
        'lat': Lat,
        'lng': Lng
      },
      success: success,
      error: error
    });
  } else {
    console.log('Requirements failed');
  }
});
