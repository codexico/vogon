<?php
echo "produto.php\n";
  
require_once '../lib/cakeutil.php';

if(isAjax() && isPost()) {
  print_r ($_POST);
}else {
  echo "erro ajax post";
}

