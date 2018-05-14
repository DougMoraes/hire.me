$('.btn-shorten').on('click', function(){

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val(), alias: $('#alias-field').val()},
    success: function(data){
      if (data.err_code){
        var resultHTML = '<p class="result">Alias já utilizado</p>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
      } else {
        var resultHTML = '<a class="result" href= "http://localhost:3000/' + data.shortUrl + '"> http://localhost:3000/' + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
      }
    }
  });

});
