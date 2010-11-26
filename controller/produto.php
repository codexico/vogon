<?php
//echo "produto.php\n";
  
require_once '../lib/cakeutil.php';
require_once '../lib/util.php';
require_once '../model/produto.php';

$salvo = "false";
if(isAjax() && isPost()) {
  //print_r ($_POST);
  $produto = new Produto();
  if ( !$produto->validarAcompanhamento() ){
    echo "erro: dados invalidos";
  }else{
    //echo "armazenar dados";
    if ( !$produto->save() ){
      echo "erro ao salvar";
    }else{
      //echo "acompanhamneto salvo com sucesso!";
      $salvo = "true";
    }
  }  
}else {
  echo "erro: ajax post";
}

echo $salvo;

