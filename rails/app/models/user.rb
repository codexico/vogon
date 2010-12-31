class User < ActiveRecord::Base
  has_many :alertas, :dependent => :destroy
  has_many :authorizations
  
  validates :email, :allow_blank => true, :email => true
  
  def self.create_from_hash!(hash)
    create(:name => hash['user_info']['name'])
  end
  
end
