class Alerta < ActiveRecord::Base
  belongs_to :produto
  belongs_to :user

  validates_associated :produto, :user
  
  validates_numericality_of :valor, :greater_than => 0, :allow_blank => true

  validate :deve_ter_opcao, :unless => :valor

  def deve_ter_opcao
    if !self.baixar and !self.disponivel
      if !self.baixar?
        errors.add(:baixar, "baixar")
      end
      if !self.disponivel?
        errors.add(:disponivel, "disponivel")
      end
    end
  end

end
