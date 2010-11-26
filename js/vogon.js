jQuery(document).ready(function ($) {

  var vogon = (function () {

    var Produto = function ($prod) {
      this.name = $prod.find('.info .name').text();
      this.id = $prod.find('div.product').attr("id");
      this.description = $prod.find('.info .description').text();
    },
    
    Loja = {
        urlBusca: "http://www.submarino.com.br/busca",
        urlHslice: "http://www.submarino.com.br/portal/hslice-preview?itemId="
    },
    
    produtos = Array();
    init = function () {
      formInit();
    },
    
    buscar = function (txt) {  
      $.ajax({
        type: "GET",
        url: Loja.urlBusca,
        data: {q : txt},
        success: function(res){
          console.log("success");
          buscaSuccess(res);       
        }
      });
    },
    
    buscaSuccess = function (res) {
      montaProdutos(res);
      mostraProdutos();
      
      //var htmlPaginas = filtraPaginas(res);
      //mostraPaginas(htmlPaginas);
    },
    
    filtraProdutos = function (html) {
      return $(html.responseText).find('.productVitrine .productList>li');
    },
    
    montaProdutos = function (htmlProdutos) {
      $prods = filtraProdutos(htmlProdutos);
      $prods.each( function (index) {
        //console.log($(this).find('.info .name').html())
        //alert($(this))
        p = new Produto($(this));
        produtos.push(p);
      })
    },
    
    mostraProdutos = function () {
      $("#result").empty();
      cod = "<ul>";
        for (var i = 0;i<produtos.length;i++) {
          cod += "<li>";
          cod += '<span class="name">';
          cod += produtos[i].name;
          cod += '</span>';
          cod += '<br />';
          cod += '<span class="id">';
          cod += produtos[i].id;
          cod += '</span>';
          cod += '<br />';
          cod += '<span class="description">';
          cod += produtos[i].description;
          cod += '</span>';
          cod += "</li>";
        }
      cod += "</ul>";
      $("#result").append(cod);
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
        buscar(txt);
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
