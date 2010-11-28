<?php
class ProdutosController extends AppController {

	var $name = 'Produtos';

	function index() {
		$this->Produto->recursive = 0;
		$this->set('produtos', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid produto', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('produto', $this->Produto->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Produto->create();
			if ($this->Produto->save($this->data)) {
				$this->Session->setFlash(__('The produto has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The produto could not be saved. Please, try again.', true));
			}
		}
		$sites = $this->Produto->Site->find('list');
		$this->set(compact('sites'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid produto', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Produto->save($this->data)) {
				$this->Session->setFlash(__('The produto has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The produto could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Produto->read(null, $id);
		}
		$sites = $this->Produto->Site->find('list');
		$this->set(compact('sites'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for produto', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Produto->delete($id)) {
			$this->Session->setFlash(__('Produto deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Produto was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>