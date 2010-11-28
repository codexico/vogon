<?php
/* Alert Fixture generated on: 2010-11-28 13:11:02 : 1290957542 */
class AlertFixture extends CakeTestFixture {
	var $name = 'Alert';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10, 'key' => 'primary'),
		'price' => array('type' => 'float', 'null' => false, 'default' => NULL, 'length' => '9,2'),
		'produto_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10),
		'user_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10),
		'active' => array('type' => 'boolean', 'null' => false, 'default' => NULL),
		'created' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'modified' => array('type' => 'datetime', 'null' => false, 'default' => NULL),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'price' => 1,
			'produto_id' => 1,
			'user_id' => 1,
			'active' => 1,
			'created' => '2010-11-28 13:19:02',
			'modified' => '2010-11-28 13:19:02'
		),
	);
}
?>