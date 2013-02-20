class AddBaixarToAlertas < ActiveRecord::Migration
  def self.up
    add_column :alertas, :baixar, :boolean, :default => false
  end

  def self.down
    remove_column :alertas, :baixar
  end
end
