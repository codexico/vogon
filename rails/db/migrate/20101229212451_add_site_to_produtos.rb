class AddSiteToProdutos < ActiveRecord::Migration
  def self.up
    add_column :produtos, :site, :integer
  end

  def self.down
    remove_column :produtos, :site
  end
end
