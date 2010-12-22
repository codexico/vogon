jQuery(document).ready(function ($) {

  var vogon = (function () {

    var Loja = {
      url: "http://www.submarino.com.br",
      urlBusca: "http://www.submarino.com.br/busca",
      urlHslice: "http://www.submarino.com.br/portal/hslice-preview?itemId=",
      produtosSelector: ".productVitrine .productList>li",
      Produto: function ($prod, detalhes) {
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
      }
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
        p = new Loja.Produto($(this),false);
        produtos.push(p);
        console.log(p)
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
          if(produtos[i].price) {
            cod += produtos[i].price;
          } else {
            cod += "Preço não disponível";
          }
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
          if(produtos[i].price) {
            cod += '  <span class="inserirformalerta rounded" data-id="'+produtos[i].id+'">ALERTA</span>'; 
          }
          cod += '  <div class="clear"></div>';
          cod += '</div>';
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
    inserirFormAlerta = function (prod_id) {
      $.ajax({
        type: "GET",
        url: "/authorizations/auth_list/"+prod_id, //TODO: colocar o partial em Alertas
        success: function(data, textStatus, XMLHttpRequest){
          $("li#"+prod_id).append(data);
        }
      });    
    },
        
    inserirFormAlertaHandler = function () {
      $("#produtos").delegate(".inserirformalerta", "click", function(){
        inserirFormAlerta($(this).data("id"));
      });
    },
    
    formAlertaHandler = function () {
      $("#produtos").delegate("form.alerta", "submit", function(){
        //event.preventDefault();//bug firefox
        
        if ( validarValorAlerta( $(this) ) && validarMeioAlerta( $(this) ) ) {
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
      
      if ( valor != "" && ( price <= valor ) ) {
        $form.find('input[name*="valor"]').addClass('error')
        .after('<p class="errormessage">O valor deve ser menor que o preço!</p>');
        return false;
      }
      return true;
    },
    
    validarMeioAlerta = function ($form) {
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
      inserirFormAlertaHandler();
      formAlertaHandler();
    };
    
    return {
      init: init
    };
  }());

  vogon.init();

});
