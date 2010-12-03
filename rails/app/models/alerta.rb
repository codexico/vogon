class Alerta < ActiveRecord::Base
  belongs_to :produto
  belongs_to :user
end
