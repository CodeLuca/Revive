'use strict';

$(function() {
var formTime = null; 

  $.get('http://api.ipify.org?format=text&callback=?',
    function(text) {
      $('input[name="user_ip"]').val(text);
    }
  );

  $('.close-trigger').click(function() {
    $('aside.open').removeClass('open');
    return false;
  });

  $('form#proposal').submit(function(event) {
    event.preventDefault();
    if (formTime != null){
      if(Date.now() - formTime > 60000){
        formTime = null;
      } else {
        alert('Please wait 60 seconds before submitting another project. \n Thank you.')
        return;
      }
    }

    formTime = Date.now();
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
        url: 'http://178.62.120.141/create',
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

});
