<?php
class AlertsController extends AppController {

	var $name = 'Alerts';

	function index() {
		$this->Alert->recursive = 0;
		$this->set('alerts', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid alert', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('alert', $this->Alert->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Alert->create();
			if ($this->Alert->save($this->data)) {
				$this->Session->setFlash(__('The alert has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The alert could not be saved. Please, try again.', true));
			}
		}
		$produtos = $this->Alert->Produto->find('list');
		$users = $this->Alert->User->find('list');
		$this->set(compact('produtos', 'users'));
	}

	function addAjax() {
	  $this->layout = 'ajax';
    $this->set('resultado', '');
  		
		if (!empty($this->data)) {
			$user = $this->Alert->User->save($this->data['User']);
			$produto = $this->Alert->Produto->save($this->data['Produto']);
			
			if (!empty($user) && !empty($produto)) {
			  $this->data['Alert']['user_id'] = $this->Alert->User->id;
			  $this->data['Alert']['produto_id'] = $this->Alert->Produto->id;
			  
			  if ($this->Alert->save($this->data)) {
			    $this->set('resultado', 'ok');
			  } else {
			    $this->set('resultado', 'ERRO');
				  $this->Session->setFlash(__('The alert could not be saved. Please, try again.', true));
		  	}
		  }
	  }
		$this->render('/elements/ajaxreturn');
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid alert', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Alert->save($this->data)) {
				$this->Session->setFlash(__('The alert has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The alert could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Alert->read(null, $id);
		}
		$produtos = $this->Alert->Produto->find('list');
		$users = $this->Alert->User->find('list');
		$this->set(compact('produtos', 'users'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for alert', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Alert->delete($id)) {
			$this->Session->setFlash(__('Alert deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Alert was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
