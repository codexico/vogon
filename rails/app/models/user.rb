class User < ActiveRecord::Base
  has_many :alertas, :dependent => :destroy
  
  validates :email, :presence => true, :email => true
end
