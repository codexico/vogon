class User < ActiveRecord::Base
  has_many :alertas, :dependent => :destroy
  has_many :authorizations
  
  validates :email, :allow_blank => true, :email => true
  
  def self.create_from_hash!(hash)
    #usar email para nome se provider nao fornecer name (yahoo envia name: " ")
    hash['user_info']['name'] = hash['user_info']['email'] if hash['user_info']['name'].strip.empty?

    create(:name => hash['user_info']['name'], :email => hash['user_info']['email'])
  end
  
end
