var formUrl = 'http://getsimpleform.com/messages/ajax?form_api_token=a690a97203e1625d5e37010e96103e21';
$(function(){
  $('form.contact_form').on('submit', function(e){
  e.preventDefault();
    var submitBtn = $(this).find('.submit-button');
    var formData = $(this).serialize();
    
    submitBtn.addClass('sending');

    $.ajax({
      dataType: 'jsonp',
      url: formUrl,
      data: formData
    }).done(function() {
      setTimeout(function(){
          submitBtn.removeClass('sending').addClass('success');
        }, 600);
    });

  });
});
