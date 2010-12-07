class Alerta < ActiveRecord::Base
  belongs_to :produto
  belongs_to :user

  validates_associated :produto, :user
  
  validates_presence_of :baixar, :unless => :valor, :message => "Qual o valor do alerta?"
    
  validates_numericality_of :valor, :greater_than => 0
end
