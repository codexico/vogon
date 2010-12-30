jQuery(document).ready(function ($) {

  var vogon = (function () {

    var LojaFactory = function (nome, id) {
      if (nome === "submarino" || id === 1) {
       return LojaSubmarino;
      }
      else if (nome === "americanas" || id === 2) {
        return LojaAmericanas;
      }
      else {
        return "erro";
      }
    },

    LojaSubmarino = {
      id: 1,
      name: "Submarino",
      url: "http://www.submarino.com.br",
      urlBusca: function (txt) { return "http://www.submarino.com.br/busca"; },
      dataBusca: function (txt) { return {q: txt} },
      //urlHslice: "http://www.submarino.com.br/portal/hslice-preview?itemId=",
      produtosSelector: '.productVitrine .productList>li',
      detalhesSelector: '.productInformation .ficheTechnique',
      Produto: function ($prod, detalhes) {
        this.loja_id = 1; //TODO: está redundante
        this.name = $prod.find('.info .name').text();
        this.id = $prod.find('div.product').attr("id").replace(/prod_/gi, '');
        this.href = $prod.find('a.link').attr("href");
        this.img = $prod.find('div.product img').attr("src").replace(/%20/gi, '');
        this.price = $.trim($prod.find('.boxPrice .for').text().replace(/por: r\$/gi, ''));
        this.disponivel = true;
        if (!this.price){
          this.disponivel = false;
          this.price = "0";
        }
        this.description = $prod.find('.info .description').text();
        if(detalhes ==! false){
          this.detalhes = $detalhes.find('div.ficheTechnique');
        }
      }
    },

    LojaAmericanas = {
      id: 2,
      name: "Americanas.com",
      url: "http://www.americanas.com.br",
      urlBusca: function (txt) {
        return "http://www.americanas.com.br/busca/"+txt;
      },
      dataBusca: function (txt) { return {} },
      //urlHslice: "",
      produtosSelector: '.prods .pList>li',
      detalhesSelector: '.description .infoProdBox',
      Produto: function ($prod, detalhes) {
        this.loja_id = 2; //TODO: redundante
        this.name = $prod.find('.name').text();
        this.id = $prod.find('a.url[rel=product]').attr("href").split(/\//, 3)[2];
        this.href = $prod.find('a.url[rel=product]').attr("href");
        this.img = $prod.find('a.url img.photo').attr("src").replace(/%20/gi, '');
        this.price = $.trim($prod.find('.sale.price').text().replace(/por: r\$/gi, ''));
        this.disponivel = true;
        if (!this.price){
          this.disponivel = false;
          this.price = "0";
        }
        this.description = "";
        if(detalhes ==! false){
          this.detalhes = $detalhes.find('div.detalhes .infoProdBox');
        }
      }
    },
    //loja,
    produtos = [],    
    imagesURL = "http://vogon.com.br/images/",
    //////////////
    // produtos //
    //////////////
    formInit = function () {
      $('#formsearch').submit(function(event) {
        $('#detalhes').empty();
        $('#produtos').empty();
        produtos = [];
        $('#produtos').append('<img class="loadBusca" alt="buscando.." src="'+imagesURL+'ajax-loader.gif">');
        event.preventDefault(); 
        var txt = $(this).find('input#txtSearch').val();
        lojas = Array();
        lojas[0] = "submarino";
        lojas[1] = "americanas";
        for ( x in lojas ) {
          var loja = new LojaFactory(lojas[x]);
          console.log("buscando em "+lojas[x])
          buscar(txt, loja);
        }
        //loja = new LojaFactory("americanas");
        //buscar(txt);
        return false;
      });
      return false; 
    },
    
    buscar = function (txt, loja) {  
      $.ajax({
        type: "GET",
        url: loja.urlBusca(txt),
        data: loja.dataBusca(txt),
        success: function(res){
          buscaSuccess(res, loja);       
        }
      });
    },
   
    buscaSuccess = function (res, loja) {
      //TODO: mostrar paginacao?
      $produtos = filtraProdutos(res, loja);
      appendProdutos($produtos, loja);
    },

    appendProdutos = function ($produtos, loja) {
      if ( $produtos.length > 0 ) {
        $produtos.each( function (index) {
          p = new loja.Produto($(this),false);
          produtos.push(p);
          appendProduto(p, loja);
        });
      } else {
        produtoNaoEncontrado();
      }
      $('#produtos img.loadBusca').remove();
    },

    appendProduto = function (p, loja) {
      if ($('#produtos').find('li#'+p.id).length > 0) {//produto repetido
        console.log('produto repetido '+p.id);
        $primeiro = $('#produtos').find('li#'+p.id);
        $primeiro.css('border', '2px solid red');
        $primeiro.append( htmlProduto(p, loja) );
      } else {
        $('#produtos').append( htmlProduto(p, loja) );
      }
    },
    
    filtraProdutos = function (html, loja) {
      return $(html.responseText).find(loja.produtosSelector);
    },

    produtoNaoEncontrado = function () {   
      $("#produtos").append("<p>Produto não encontrado, tente novamente</p>");
    },
    
    htmlProduto = function (produto, loja) {
      cod = '<li id="' + produto.id + '" data-loja_id="'+loja.id+'">';
      cod += '<div>';
      //loja
      cod += '<span class="loja">';
      cod += loja.name;
      cod += '</span>';
      //imagem
      cod += '<span class="imagem">';
      cod += '<img src="'+ produto.img +'" alt="'+ produto.name +'">';
      cod += '</span>';
      //produto
      cod += '  <a class="link" href="' + loja.url + produto.href + '">';
      cod += '<span class="name">';
      cod += produto.name;
      cod += '</span>';
      cod += '  </a>';
      cod += '  <br />';
      cod += '<span class="price">';
      if(produto.price != "0") {
        cod += produto.price;
      } else {
        cod += "Preço não disponível";
      }
      cod += '</span>';
      cod += '  <br /><br />';              
      //detalhes
      cod += '<span class="description">';
      cod += produto.description;
      cod += '</span>';
      cod += '<a class="detalhes" data-id="' + produto.id + '" data-loja_id="'+loja.id+'" href="' + loja.url + produto.href + '">';
      cod += '<span class="name">Ver detalhes</span>';
      cod += '</a>';
      cod += '  <br />';
      cod += '  <span class="detalhes"></span>';
      cod += '  <br />';
      cod += '  <span class="inserirformalerta rounded" data-id="'+produto.id+'" data-loja="'+loja.id+'" data-price="'+produto.price+'" data-url="'+loja.url+produto.href+'" >ALERTA</span>'; 
      cod += '  <div class="clear"></div>';
      cod += '</div>';
      cod += "</li>";
      return cod;
    },
    
    ////////////
    // alerta //
    ////////////
    inserirFormAlerta = function (prod_id, prod_price, prod_url, site) {
      $.ajax({
        type: "GET",
        url: "/authorizations/auth_list/"+prod_id+"/"+prod_price, //TODO: colocar o partial em Alertas
        success: function(data, textStatus, XMLHttpRequest){
          $("li#"+prod_id).append(data);
          $("form#form_"+prod_id).append('<input type="hidden" value="'+prod_url+'" name="produto[url]" />');
          $("form#form_"+prod_id).append('<input type="hidden" value="'+site+'" name="produto[site]" />');
        }
      });    
    },
        
    inserirFormAlertaHandler = function () {
      $("#produtos").delegate(".inserirformalerta", "click", function(){
        inserirFormAlerta($(this).data("id"), $(this).data("price"), $(this).data("url"), $(this).data("loja"));
      });
    },
    
    formAlertaHandler = function () {
      $("#produtos").delegate("form.alerta", "submit", function(){
        //event.preventDefault();//bug firefox
        
        if ( validarValorAlerta( $(this) ) && validarAuthAlerta( $(this) ) ) {
          alerta($(this));
        }
	return false;
      });
    },
    
    validarValorAlerta = function ($form) {
      $form.find("p.errormessage").remove();
      $form.find('input[name*="valor"]').removeClass('error');
      
      var price = parseFloat($form.find('input[name*="price"]').val()),
      valor = parseFloat($form.find('input[name*="valor"]').val());
      
      if ( (valor != "") && (price != "0") && (price <= valor) ) {
        $form.find('input[name*="valor"]').addClass('error')
        .after('<p class="errormessage">O valor deve ser menor que o preço!</p>');
        return false;
      }
      return true;
    },
    
    validarAuthAlerta = function ($form) {
      $form.find(".meio p.errormessage").remove();
      $form.find('.meio').removeClass('error');
      
      var email = $form.find('input[name*="email"]').val(),
      twitter = $form.find('input[name*="twitter"]').is(':checked'),
      facebook = $form.find('input[name*="facebook"]').is(':checked');
      
      if( email == "" && !twitter && !facebook ){
        $form.find('.meio').addClass('error')
          .after('<p class="errormessage">Escolha uma maneira para receber o alerta!</p>');
        return false;        
      }
      return true;
    },
    
    menorOuIgualFloats = function (a, b) {
      return parseFloat( a )*100 <= parseFloat( b )*100;
    },
    
    alerta = function ($form) {
      var prod_id = $form.find('input.prod_id').val();
      $.ajax({
        type: "POST",
        url: "/alertas",
        data: $('#form_'+prod_id).serialize(),
        success: function(data, textStatus, XMLHttpRequest){
          if (data === "ok" ){
            alertaSuccess($form);
          }else{
            alertaErrors(prod_id, data);
          }
        }
      });    
    },

    alertaSuccess = function ($form) {
      $form.html('<div class="alertasalvo">OK, assim que o produto atingir este valor um email será enviado</div>')
    },
    
    alertaErrors = function (prod_id, data) {
      $form = $('#form_'+prod_id);
      $form.find('.error').removeClass('error');
      $form.find('.errormessage').remove();
      console.log(data);
      if(data.match(/email/gi)){
        $form.find('input[name*="email"]').addClass('error')
          .after('<span class="errormessage">Email inválido</span>');
      }
      if(data.match(/baixar/gi)){
        $form.find('input[name*="valor"]').addClass('error');
        $form.find('input[name*="baixar"]').addClass('error')
          .after('<p class="errormessage">Escolha um valor ou selecione "baixar"</p>');
      }
      if(data.match(/baixar/gi)){
        $form.find('input[name*="valor"]').addClass('error');
        $form.find('input[name*="disponivel"]').addClass('error')
          .after('<p class="errormessage">Escolha um valor ou selecione "disponível"</p>');
      }
      if(data.match(/valor/gi)){
        $form.find('input[name*="valor"]').addClass('error').after('<p class="errormessage">Valor inválido</p>');
      }  
    },
    
    //////////////
    // detalhes //
    ////////////// 
    detalhesHandler = function () {
      $("#produtos").delegate("a.detalhes", "click", function(){
        //event.preventDefault();// bug firefox
        buscarDetalhes(this);
	      return false;
      });
    },
    
    buscarDetalhes = function (link) {
      $('#detalhes').empty();
      $('#produtos li').removeClass('detalhado');
      var top = $(window).scrollTop();
      $('#detalhes').css("top",  top + "px");
      $('#detalhes').append('<img alt="detalhando.." src="'+imagesURL+'ajax-loader.gif">');
      $.ajax({
        type: "GET",
        url: $(link).attr('href'),
        success: function(res){
          $('#detalhes').remove('img');
          detalhesSuccess(res, $(link).data('id'), $(link).data('loja_id'));
        }
      });
    },
    
    detalhesSuccess = function (res, id, loja_id) {
      loja = LojaFactory("", loja_id);
      $detalhes = $(res.responseText).find(loja.detalhesSelector);
      mostraDetalhes($detalhes, id);
    },
    
    mostraDetalhes = function ($detalhes, id) {
      $('#detalhes').empty();
      $detalhes.each( function (index) {
        $('#detalhes').append('<p>Detalhes do Produto:</p>');
        $('#detalhes').append($(this).html());
      });
      var top = ( $(window).height() - $('#detalhes').height() ) / 2+$(window).scrollTop();
      if (top < 0 ) top = 0;      
      $('#detalhes').css("top",  top + "px");
      $('li#'+id).addClass('detalhado');
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
    
    ///////////////////////
    // inicio, listeners //
    ///////////////////////
    init = function () {
      formInit();
      detalhesHandler();
      inserirFormAlertaHandler();
      formAlertaHandler();
    };
    
    return {
      init: init
    };
  }());

  vogon.init();

});
