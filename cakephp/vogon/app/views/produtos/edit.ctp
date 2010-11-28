<div class="produtos form">
<?php echo $this->Form->create('Produto');?>
	<fieldset>
 		<legend><?php __('Edit Produto'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('url');
		echo $this->Form->input('site_id');
		echo $this->Form->input('user_count');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Produto.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Produto.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Produtos', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Sites', true), array('controller' => 'sites', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Site', true), array('controller' => 'sites', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Alerts', true), array('controller' => 'alerts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alert', true), array('controller' => 'alerts', 'action' => 'add')); ?> </li>
	</ul>
</div>