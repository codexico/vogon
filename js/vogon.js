jQuery(document).ready(function ($) {

  var vogon = (function () {
    
    var init = function () {
      buscaSubmarino();
    },
    buscaSubmarino =  function () {
      
      $.ajax({
        type: "GET",
        url: "http://www.submarino.com.br/busca",
        data: {q : "wii"},
        success: function(html){
          var listaDeProdutos = $(html.responseText).find('.productVitrine').text();
          console.log(listaDeProdutos);
          $("body").append(listaDeProdutos);
        }
      });
  
    }
   
    return {
        init: init
    };
  }());

  vogon.init();

});
