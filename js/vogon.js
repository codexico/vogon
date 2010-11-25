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
        success: function(res){
          console.log("success");
          var htmlProdutos = filtraProdutos(res);
          mostraProdutos(htmlProdutos);      
          var htmlPaginas = filtraPaginas(res);
          mostraPaginas(htmlPaginas);          
        }
      });
  
    },
    filtraProdutos = function (html) {
          console.log("filtra")
         return $(html.responseText).find('.productVitrine .productList').html();
    },
    mostraProdutos = function (htmlProdutos) {
          console.log("mostra")
          $("body").append(htmlProdutos);
    },
    filtraPaginas = function (html) {
          console.log("filtraPag")
         return $(html.responseText).find('.productVitrine .pageList').html();
    },
    mostraPaginas = function (htmlPaginas) {
          console.log("mostraPag")
          $("body").append(htmlPaginas);
    }
   
    return {
        init: init
    };
  }());

  vogon.init();

});
