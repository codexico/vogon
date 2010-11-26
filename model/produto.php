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
  
  function save() {
    $produto_id = $_POST['prod_id'];
    $valor = $_POST['valor'];
    $email = $_POST['email'];    
    
    $mysqli = new mysqli('localhost', 'root', 'root', 'vogon');
    /* check connection */
    if (mysqli_connect_errno ()) {
      printf("Connect failed: %s\n", mysqli_connect_error());
      exit();
    }
    $stmt = $mysqli->prepare("INSERT INTO watch(produto_id, valor, email) VALUES(?, ?, ?);");
    if ($stmt) {
      /* bind parameters for markers */
      $stmt->bind_param("sss", $produto_id, $valor, $email);
      /* execute query */
      $stmt->execute();

      //echo("Affected rows (INSERT):" . $mysqli->affected_rows);
      /* close statement */
      $stmt->close();
    } else {
      echo "erro stmt";
      return false;
    }
    $mysqli->close();
    return true;
  }

}
