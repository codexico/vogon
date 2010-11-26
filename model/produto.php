<?php
class Produto {
  
  function validarAcompanhamento(){
    
    if( !is_numeric($_POST['prod_id']) ){
        echo "id invalido";
        return false;    
    }
    if( !is_numeric($_POST['valor']) ){
        echo "valor invalido";
        return false;
    }
    if( !Util::is_email($_POST['email']) ){
        echo "email invalido";
        return false;
    }
    
    return true;
  }

}
