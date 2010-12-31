class AddParaToAlertas < ActiveRecord::Migration
  def self.up
    add_column :alertas, :para, :string
  end

  def self.down
    remove_column :alertas, :para
  end
end
