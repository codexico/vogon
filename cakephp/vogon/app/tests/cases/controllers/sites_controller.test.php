<?php
/* Sites Test cases generated on: 2010-11-28 13:11:46 : 1290957046*/
App::import('Controller', 'Sites');

class TestSitesController extends SitesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class SitesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.site', 'app.produto', 'app.alert', 'app.user');

	function startTest() {
		$this->Sites =& new TestSitesController();
		$this->Sites->constructClasses();
	}

	function endTest() {
		unset($this->Sites);
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