jQuery(document).ready(function ($) {

  var vogon = (function () {

    var Produto = function ($prod, detalhes) {
      this.name = $prod.find('.info .name').text();
      this.prod_id = $prod.find('div.product').attr("id");
      this.id = $prod.find('div.product').attr("id").replace(/prod_/gi, '');
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
    
    //////////////
    // produtos //
    //////////////
    formInit = function () {
      $('#formsearch').submit(function(event) {
        event.preventDefault(); 
        var txt = $(this).find('input#txtSearch').val();
        buscar(txt);
        return false;
      });
      return false; 
    },
    
    buscar = function (txt) {  
      //TODO: loader
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
      //TODO: mostrar paginacao?
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
          cod += incluirFormAcompanhar(produtos[i]);
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
    
    ////////////////////
    // acompanhamento //
    ////////////////////
    incluirFormAcompanhar = function (prod) {
      var form = '';
      form += '<form id="form_'+prod.id+'" class="acompanhar" action="">';
      form += '  <input type="hidden" class="prod_id" value="'+prod.id+'" name="data[Produto][id]" />';
      form += '  <input type="hidden" value="POST" name="_method" />';
      form += '  <p>Me avise quando este produto estiver abaixo de:</p>';
      form += '  <label for="valor_'+prod.id+'">Valor R$ </label>';
      form += '  <input type="text" id="valor_'+prod.id+'" maxlength="12" name="data[Alert][price]" />';
      form += '  <label for="email_'+prod.id+'">Email: </label>';
      form += '  <input type="text" id="email_'+prod.id+'" name="data[User][email]" />';
      form += '  <button type="submit">Enviar</button>';
      form += '</form>';
      return form;
    },
    
    formAcompanharHandler = function () {
      $("#result").delegate("form.acompanhar", "submit", function(){
        //event.preventDefault();//bug firefox
//        var prod_id = $(this).find('input[name=prod_id]').val().replace(/prod_/gi, '');

        acompanhar($(this));
	      return false;
      });
    },
    
    acompanhar = function ($form) {
      var prod_id = $form.find('input.prod_id').val();
      console.log($form);
      console.log(prod_id);
      console.log($('#form_'+prod_id).serialize());
      $.ajax({
        type: "POST",
        url: "alerts/addAjax",
        data: $('#form_'+prod_id).serialize(),
        success: function(data, textStatus, XMLHttpRequest){
          console.log("acompanhar success");
          if (data === "ok" ){
            acompanharSuccess(prod_id);
          }
          console.log(data);
        }
      });    
    },

    acompanharSuccess = function (prod_id) {
      $("#form_"+prod_id).html('<p class="alertasalvo">OK, assim que o produto atingir este valor um email será enviado</p>');
    },
    
    ///////////////
    // paginacao //
    ///////////////
    filtraPaginacao = function (html) {
      return $(html.responseText).find('.productVitrine .pageList').html();
    },
    
    mostraPaginacao = function (htmlPaginacao) {     
      $("#paginacao").empty();
      $("#paginacao").append(htmlPaginacao);
    },
    
    //////////////
    // detalhes //
    ////////////// 
    detalhesHandler = function () {
      $("#result").delegate("a.detalhes", "click", function(){
        //event.preventDefault();// bug firefox
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
    },
    
    ///////////////////////
    // inicio, listeners //
    //////////////////////
    
    init = function () {
      formInit();
      detalhesHandler();
      formAcompanharHandler();
    };
    
    return {
      init: init
    };
  }());

  vogon.init();

});
