<?php
echo "produto.php\n";
  
require_once '../lib/cakeutil.php';
require_once '../lib/util.php';
require_once '../model/produto.php';

if(isAjax() && isPost()) {
  print_r ($_POST);
  $produto = new Produto();
  if ( !$produto->validarAcompanhamento() ){
    echo "erro: dados invalidos";
  }else{
    echo "armazenar dados";
  }
  
}else {
  echo "erro: ajax post";
}

