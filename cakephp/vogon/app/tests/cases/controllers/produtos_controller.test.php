<?php
/* Produtos Test cases generated on: 2010-11-28 13:11:34 : 1290957034*/
App::import('Controller', 'Produtos');

class TestProdutosController extends ProdutosController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ProdutosControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.produto', 'app.site', 'app.alert', 'app.user');

	function startTest() {
		$this->Produtos =& new TestProdutosController();
		$this->Produtos->constructClasses();
	}

	function endTest() {
		unset($this->Produtos);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

}
?>