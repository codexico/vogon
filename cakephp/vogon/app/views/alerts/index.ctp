<div class="alerts index">
	<h2><?php __('Alerts');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('price');?></th>
			<th><?php echo $this->Paginator->sort('produto_id');?></th>
			<th><?php echo $this->Paginator->sort('user_id');?></th>
			<th><?php echo $this->Paginator->sort('active');?></th>
			<th><?php echo $this->Paginator->sort('created');?></th>
			<th><?php echo $this->Paginator->sort('modified');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($alerts as $alert):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $alert['Alert']['id']; ?>&nbsp;</td>
		<td><?php echo $alert['Alert']['price']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($alert['Produto']['id'], array('controller' => 'produtos', 'action' => 'view', $alert['Produto']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($alert['User']['name'], array('controller' => 'users', 'action' => 'view', $alert['User']['id'])); ?>
		</td>
		<td><?php echo $alert['Alert']['active']; ?>&nbsp;</td>
		<td><?php echo $alert['Alert']['created']; ?>&nbsp;</td>
		<td><?php echo $alert['Alert']['modified']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $alert['Alert']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $alert['Alert']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $alert['Alert']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $alert['Alert']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
	));
	?>	</p>

	<div class="paging">
		<?php echo $this->Paginator->prev('<< ' . __('previous', true), array(), null, array('class'=>'disabled'));?>
	 | 	<?php echo $this->Paginator->numbers();?>
 |
		<?php echo $this->Paginator->next(__('next', true) . ' >>', array(), null, array('class' => 'disabled'));?>
	</div>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New Alert', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Produtos', true), array('controller' => 'produtos', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Produto', true), array('controller' => 'produtos', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Users', true), array('controller' => 'users', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New User', true), array('controller' => 'users', 'action' => 'add')); ?> </li>
	</ul>
</div>