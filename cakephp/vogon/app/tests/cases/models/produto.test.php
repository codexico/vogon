<?php
/* Produto Test cases generated on: 2010-11-28 13:11:34 : 1290957034*/
App::import('Model', 'Produto');

class ProdutoTestCase extends CakeTestCase {
	var $fixtures = array('app.produto', 'app.site', 'app.alert', 'app.user');

	function startTest() {
		$this->Produto =& ClassRegistry::init('Produto');
	}

	function endTest() {
		unset($this->Produto);
		ClassRegistry::flush();
	}

}
?>