<?php
/* Alert Test cases generated on: 2010-11-28 13:11:03 : 1290957543*/
App::import('Model', 'Alert');

class AlertTestCase extends CakeTestCase {
	var $fixtures = array('app.alert', 'app.produto', 'app.site', 'app.user');

	function startTest() {
		$this->Alert =& ClassRegistry::init('Alert');
	}

	function endTest() {
		unset($this->Alert);
		ClassRegistry::flush();
	}

}
?>