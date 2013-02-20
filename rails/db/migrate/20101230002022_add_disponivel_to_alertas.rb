class AddDisponivelToAlertas < ActiveRecord::Migration
  def self.up
    add_column :alertas, :disponivel, :boolean, :default => false
  end

  def self.down
    remove_column :alertas, :disponivel
  end
end
