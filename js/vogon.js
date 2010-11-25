jQuery(document).ready(function ($) {

  var vogon = (function () {
    
    var init = function () {
      formInit();
    },
    
    buscaSubmarino = function (txt) {
      
      $.ajax({
        type: "GET",
        url: "http://www.submarino.com.br/busca",
        data: {q : txt},
        success: function(res){
          console.log("success");
          buscaSuccess(res);       
        }
      });
  
    },
    
    buscaSuccess = function (res) {
      var htmlProdutos = filtraProdutos(res);
      mostraProdutos(htmlProdutos); 
      var htmlPaginas = filtraPaginas(res);
      mostraPaginas(htmlPaginas); 
    },
    
    filtraProdutos = function (html) {
      return $(html.responseText).find('.productVitrine .productList').html();
    },
    
    mostraProdutos = function (htmlProdutos) {
      $("#result").empty();
      $("#result").append(htmlProdutos);
    },
    
    filtraPaginas = function (html) {
      return $(html.responseText).find('.productVitrine .pageList').html();
    },
    
    mostraPaginas = function (htmlPaginas) {     
      $("#paginacao").empty();
      $("#paginacao").append(htmlPaginas);
    },
    
    formInit = function () {
      $('#formsearch').submit(function() {
        event.preventDefault();
        var txt = $(this).find('input#txtSearch').val();
        buscaSubmarino(txt);
        return false;
      });
      return false; 
    }
   
    return {
      init: init
    };
  }());

  vogon.init();

});
