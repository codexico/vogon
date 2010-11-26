jQuery(document).ready(function ($) {

  var vogon = (function () {

    var Produto = function ($prod, detalhes) {
      this.name = $prod.find('.info .name').text();
      this.id = $prod.find('div.product').attr("id");
      this.href = $prod.find('a.link').attr("href");
      this.price = $prod.find('.boxPrice .for').text();
      this.description = $prod.find('.info .description').text();
      if(detalhes ==! false){
        this.detalhes = $detalhes.find('div.ficheTechnique');
      }
    },
    
    Loja = {
        url: "http://www.submarino.com.br",
        urlBusca: "http://www.submarino.com.br/busca",
        urlHslice: "http://www.submarino.com.br/portal/hslice-preview?itemId="
    },
    
    produtos = Array(),
    
    init = function () {
      formInit();
      detalhesHandler();
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
      //TODO: tratar produto nao encontrado
      montaProdutos(res);
      mostraProdutos();      
      //var htmlPaginacao = filtraPaginacao(res);
      //mostraPaginacao(htmlPaginacao);
    },
    
    filtraProdutos = function (html) {
      return $(html.responseText).find('.productVitrine .productList>li');
    },
    
    montaProdutos = function (htmlProdutos) {
      produtos = [];
      $prods = filtraProdutos(htmlProdutos);
      $prods.each( function (index) {
        p = new Produto($(this),false);
        produtos.push(p);
      });
    },
    
    mostraProdutos = function () {
      $("#result").empty();
      var cod = "<ul>";
        for (var i = 0;i<produtos.length;i++) {
          cod += '<li id="' + produtos[i].id + '">';
          cod += '<a class="link" href="' + Loja.url + produtos[i].href + '">';
          cod += '<span class="name">';
          cod += produtos[i].name;
          cod += '</span>';
          cod += '</a>';
          cod += '<br />';
          cod += '<span class="price">';
          cod += produtos[i].price;
          cod += '</span>';
          cod += '<br />';
          cod += '<span class="description">';
          cod += produtos[i].description;
          cod += '</span>';
          cod += '<a class="detalhes" data-id="' + produtos[i].id + '"href="' + Loja.url + produtos[i].href + '">';
          cod += '<span class="name">';
          cod += 'Ver detalhes';
          cod += '</span>';
          cod += '</a>';
          cod += '<br />';
          cod += '<span class="detalhes"></span>';
          cod += "</li>";
        }
      cod += "</ul>";
      $("#result").append(cod);
    },
    
    filtraPaginacao = function (html) {
      return $(html.responseText).find('.productVitrine .pageList').html();
    },
    
    mostraPaginacao = function (htmlPaginacao) {     
      $("#paginacao").empty();
      $("#paginacao").append(htmlPaginacao);
    },
    
    formInit = function () {
      $('#formsearch').submit(function() {
        event.preventDefault();
        var txt = $(this).find('input#txtSearch').val();
        buscar(txt);
        return false;
      });
      return false; 
    },
    
    detalhesHandler = function () {
      $("#result").delegate("a.detalhes", "click", function(){
        event.preventDefault();
        //alert($(this).attr('href'));
        //alert($(this).data('id'))
        buscarDetalhes(this);
	      return false;
      });
    },
    
    buscarDetalhes = function (link) {
      $('#detalhes').empty();
      $('#detalhes').append('<img alt="detalhando.." src="img/ajax-loader.gif">');
      $.ajax({
        type: "GET",
        url: $(link).attr('href'),
        success: function(res){
          console.log("detalhes success");      
          $('#detalhes').remove('img');
          detalhesSuccess(res, $(link).data('id'));
        }
      });
    },
    
    detalhesSuccess = function (res, id) {
      $detalhes = $(res.responseText).find('.productInformation .ficheTechnique');
      console.log($detalhes);
      mostraDetalhes($detalhes, id);
    },
    
    mostraDetalhes = function ($detalhes, id) {
      $('#detalhes').empty();
      $detalhes.each( function (index) {
      $('#detalhes').append($(this).html());
      });
    };
    
    return {
      init: init
    };
  }());

  vogon.init();

});
