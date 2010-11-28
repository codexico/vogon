<?php
class Alert extends AppModel {
	var $name = 'Alert';
	var $displayField = 'id';
	/*
	var $validate = array(
		'price' => array(
			'decimal' => array(
				'rule' => array('decimal'),
				'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		)
	);
	*/
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Produto' => array(
			'className' => 'Produto',
			'foreignKey' => 'produto_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
?>
