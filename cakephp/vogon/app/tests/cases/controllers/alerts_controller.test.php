<?php
/* Alerts Test cases generated on: 2010-11-28 13:11:52 : 1290957592*/
App::import('Controller', 'Alerts');

class TestAlertsController extends AlertsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class AlertsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.alert', 'app.produto', 'app.site', 'app.user');

	function startTest() {
		$this->Alerts =& new TestAlertsController();
		$this->Alerts->constructClasses();
	}

	function endTest() {
		unset($this->Alerts);
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