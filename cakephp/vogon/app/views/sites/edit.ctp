<div class="sites form">
<?php echo $this->Form->create('Site');?>
	<fieldset>
 		<legend><?php __('Edit Site'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('url');
		echo $this->Form->input('active');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Site.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Site.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Sites', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Produtos', true), array('controller' => 'produtos', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Produto', true), array('controller' => 'produtos', 'action' => 'add')); ?> </li>
	</ul>
</div>