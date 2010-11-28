<?php
/* Site Test cases generated on: 2010-11-28 13:11:45 : 1290957045*/
App::import('Model', 'Site');

class SiteTestCase extends CakeTestCase {
	var $fixtures = array('app.site', 'app.produto', 'app.alert', 'app.user');

	function startTest() {
		$this->Site =& ClassRegistry::init('Site');
	}

	function endTest() {
		unset($this->Site);
		ClassRegistry::flush();
	}

}
?>