<div class="sites view">
<h2><?php  __('Site');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Name'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['name']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Url'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['url']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Active'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['active']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Created'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['created']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Modified'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $site['Site']['modified']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Site', true), array('action' => 'edit', $site['Site']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Site', true), array('action' => 'delete', $site['Site']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $site['Site']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Sites', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Site', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Produtos', true), array('controller' => 'produtos', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Produto', true), array('controller' => 'produtos', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Produtos');?></h3>
	<?php if (!empty($site['Produto'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Code'); ?></th>
		<th><?php __('Url'); ?></th>
		<th><?php __('Site Id'); ?></th>
		<th><?php __('Created'); ?></th>
		<th><?php __('Modified'); ?></th>
		<th><?php __('User Count'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($site['Produto'] as $produto):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $produto['id'];?></td>
			<td><?php echo $produto['code'];?></td>
			<td><?php echo $produto['url'];?></td>
			<td><?php echo $produto['site_id'];?></td>
			<td><?php echo $produto['created'];?></td>
			<td><?php echo $produto['modified'];?></td>
			<td><?php echo $produto['user_count'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'produtos', 'action' => 'view', $produto['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'produtos', 'action' => 'edit', $produto['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'produtos', 'action' => 'delete', $produto['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $produto['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Produto', true), array('controller' => 'produtos', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
