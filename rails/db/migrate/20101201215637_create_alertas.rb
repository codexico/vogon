class CreateAlertas < ActiveRecord::Migration
  def self.up
    create_table :alertas do |t|
      t.decimal :valor
      t.integer :produto_id
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :alertas
  end
end
