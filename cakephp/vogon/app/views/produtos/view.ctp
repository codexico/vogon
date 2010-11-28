<div class="produtos view">
<h2><?php  __('Produto');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Code'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['code']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Url'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['url']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Site'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $this->Html->link($produto['Site']['name'], array('controller' => 'sites', 'action' => 'view', $produto['Site']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Created'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['created']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modified'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['modified']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('User Count'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $produto['Produto']['user_count']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Produto', true), array('action' => 'edit', $produto['Produto']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Produto', true), array('action' => 'delete', $produto['Produto']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $produto['Produto']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Produtos', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Produto', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Sites', true), array('controller' => 'sites', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Site', true), array('controller' => 'sites', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Alerts', true), array('controller' => 'alerts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alert', true), array('controller' => 'alerts', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Alerts');?></h3>
	<?php if (!empty($produto['Alert'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Price'); ?></th>
		<th><?php __('Produto Id'); ?></th>
		<th><?php __('User Id'); ?></th>
		<th><?php __('Active'); ?></th>
		<th><?php __('Created'); ?></th>
		<th><?php __('Modified'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($produto['Alert'] as $alert):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $alert['id'];?></td>
			<td><?php echo $alert['price'];?></td>
			<td><?php echo $alert['produto_id'];?></td>
			<td><?php echo $alert['user_id'];?></td>
			<td><?php echo $alert['active'];?></td>
			<td><?php echo $alert['created'];?></td>
			<td><?php echo $alert['modified'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'alerts', 'action' => 'view', $alert['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'alerts', 'action' => 'edit', $alert['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'alerts', 'action' => 'delete', $alert['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $alert['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Alert', true), array('controller' => 'alerts', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
