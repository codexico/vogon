<div class="produtos index">
	<h2><?php __('Produtos');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('code');?></th>
			<th><?php echo $this->Paginator->sort('url');?></th>
			<th><?php echo $this->Paginator->sort('site_id');?></th>
			<th><?php echo $this->Paginator->sort('created');?></th>
			<th><?php echo $this->Paginator->sort('modified');?></th>
			<th><?php echo $this->Paginator->sort('user_count');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($produtos as $produto):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $produto['Produto']['id']; ?>&nbsp;</td>
		<td><?php echo $produto['Produto']['code']; ?>&nbsp;</td>
		<td><?php echo $produto['Produto']['url']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($produto['Site']['name'], array('controller' => 'sites', 'action' => 'view', $produto['Site']['id'])); ?>
		</td>
		<td><?php echo $produto['Produto']['created']; ?>&nbsp;</td>
		<td><?php echo $produto['Produto']['modified']; ?>&nbsp;</td>
		<td><?php echo $produto['Produto']['user_count']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $produto['Produto']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $produto['Produto']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $produto['Produto']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $produto['Produto']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Produto', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Sites', true), array('controller' => 'sites', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Site', true), array('controller' => 'sites', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Alerts', true), array('controller' => 'alerts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alert', true), array('controller' => 'alerts', 'action' => 'add')); ?> </li>
	</ul>
</div>