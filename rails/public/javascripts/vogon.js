jQuery(document).ready(function ($) {

  var vogon = (function () {

    var Produto = function ($prod, detalhes) {
      this.name = $prod.find('.info .name').text();
      this.prod_id = $prod.find('div.product').attr("id");
      this.id = $prod.find('div.product').attr("id").replace(/prod_/gi, '');
      this.href = $prod.find('a.link').attr("href");
      this.img = $prod.find('div.product img').attr("src").replace(/%20/gi, '');
      this.price = $prod.find('.boxPrice .for').text().replace(/por: R\$ /gi, '');
      this.description = $prod.find('.info .description').text();
      if(detalhes ==! false){
        this.detalhes = $detalhes.find('div.ficheTechnique');
      }
    },
    
    Loja = {
        url: "http://www.submarino.com.br",
        urlBusca: "http://www.submarino.com.br/busca",
        urlHslice: "http://www.submarino.com.br/portal/hslice-preview?itemId=",
        produtosSelector: ".productVitrine .productList>li"
    },
    
    produtos = Array(),    
    imagesURL = "http://vogon.com.br/images/",
    //////////////
    // produtos //
    //////////////
    formInit = function () {
      $('#formsearch').submit(function(event) {
      $('#detalhes').empty();
      $('#produtos').empty();
      $('#produtos').append('<img alt="buscando.." src="'+imagesURL+'ajax-loader.gif">');
        event.preventDefault(); 
        var txt = $(this).find('input#txtSearch').val();
        buscar(txt);
        return false;
      });
      return false; 
    },
    
    buscar = function (txt) {  
      $.ajax({
        type: "GET",
        url: Loja.urlBusca,
        data: {q : txt},
        success: function(res){
          buscaSuccess(res);       
        }
      });
    },
    
    buscaSuccess = function (res) {
      montaProdutos(res);
      mostraProdutos();
      //TODO: mostrar paginacao?
    },
    
    filtraProdutos = function (html) {
      return $(html.responseText).find(Loja.produtosSelector);
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
      $("#produtos").empty();
      var cod = "";
      if (produtos.length > 0){//TODO: usar template
          cod = "<ul>";
            for (var i = 0;i<produtos.length;i++) {
              cod += '<li id="' + produtos[i].id + '">';
              cod += '<div>';
              //imagem
              cod += '  <span class="imagem">';
              cod += '    <img src="'+ produtos[i].img +'" alt="'+ produtos[i].name +'">';
              cod += '  </span>';
              //produto
              cod += '  <a class="link" href="' + Loja.url + produtos[i].href + '">';
              cod += '    <span class="name">';
              cod += produtos[i].name;
              cod += '    </span>';
              cod += '  </a>';
              cod += '  <br />';
              cod += '  <span class="price">';
              cod += produtos[i].price;
              cod += '  </span>';
              cod += '  <br /><br />';              
              //detalhes
              cod += '  <span class="description">';
              cod += produtos[i].description;
              cod += '  </span>';
              cod += '  <a class="detalhes" data-id="' + produtos[i].id + '"href="' + Loja.url + produtos[i].href + '">';
              cod += '    <span class="name">Ver detalhes</span>';
              cod += '  </a>';
              cod += '  <br />';
              cod += '  <span class="detalhes"></span>';
              cod += '  <br />';
              cod += '  <div class="clear"></div>';
              cod += '</div>';
              //form alerta_valor_
              cod += incluirFormAlerta(produtos[i]);
              cod += "</li>";
            }
          cod += "</ul>";
      } else {
          cod = "<p>Produto não encontrado, tente novamente</p>"
      }
      $("#produtos").append(cod);
    },
    
    ////////////
    // alerta //
    ////////////
    incluirFormAlerta = function (prod) {
      var form = '';
      form += '<form id="form_'+prod.id+'" accept-charset="UTF-8" action="" class="alerta" id="new_alerta" >';
      
      form += '<input type="hidden" value="'+prod.id+'" name="produto[codigo]" class="prod_id" />';
      form += '<input type="hidden" value="'+prod.price+'" name="tmp[price]" />';
      form += '<p>';
      form += '<label for="alerta_valor_'+prod.id+'">Quando estiver abaixo de R$: </label>';
      form += '<input id="alerta_valor_'+prod.id+'" name="alerta[valor]" size="10" type="text" />';
      form += '</p>';
      form += '<p>';
      form += '<label for="alerta_baixar_'+prod.id+'">ou quando o preço baixar: </label>';
      form += '<input id="alerta_baixar_'+prod.id+'" name="alerta[baixar]" type="checkbox" value="true" />';
      form += '<p>';
      form += 'me alerte por: ';
            form += '<span class="providers">';
      form += '<label for="alerta_twitter_'+prod.id+'">twitter: </label>';
      form += '<input id="alerta_twitter_'+prod.id+'" name="alerta[twitter]" type="checkbox" value="true" />';
      form += '<br />';
      form += '<label for="alerta_facebook_'+prod.id+'">facebook: </label>';
      form += '<input id="alerta_facebook_'+prod.id+'" name="alerta[facebook]" type="checkbox" value="true" />';
      form += '<br />';
      form += '<label for="user_email_'+prod.id+'">email: </label>';
      form += '<input id="user_email_'+prod.id+'" name="user[email]" size="40" type="text" />';
            form += '</span>';
      form += '</p>';
      form += '<button type="submit">Enviar</button>';
      form += '</p>';
      form += '</form>';
      return form;
    },
        
    formAlertaHandler = function () {
      $("#produtos").delegate("form.alerta", "submit", function(){
        //event.preventDefault();//bug firefox
        
        if ( validarValorAlerta( $(this) ) ) {
          alerta($(this));
        }
	      return false;
      });
    },
    
    validarValorAlerta = function ($form) {
    console.log("price = "+ $form.find('input[name*="price"]').val() +" valor ="+ $form.find('input[name*="valor"]').val());
    var price = $form.find('input[name*="price"]').val(),
    valor = $form.find('input[name*="valor"]').val();
      if ( valor != "" ) {
        if ( menorOuIgualFloats(price, valor) ) {
          $form.find('input[name*="valor"]').addClass('error')
          .after('<p class="errormessage">O valor deve ser menor que o preço!</p>');
          return false;
        }
      }
      return true;
    },
    
    menorOuIgualFloats = function (a, b) {
      return (Math.round(parseFloat( a )*100)/100) <= (Math.round(parseFloat( a )*100)/100);
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
        $form.find('input[name*="email"]').addClass('error').after('<span class="errormessage">Email inválido</span>');
      }
      if(data.match(/baixar/gi)){
        $form.find('input[name*="valor"]').addClass('error');
        $form.find('input[name*="baixar"]').addClass('error').after('<p class="errormessage">Escolha um valor ou selecione "baixar"</p>');
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
      formAlertaHandler();
    };
    
    return {
      init: init
    };
  }());

  vogon.init();

});
