class User < ActiveRecord::Base
  has_many :alertas, :dependent => :destroy
  has_many :authorizations
  
  validates :email, :allow_blank => true, :email => true
  
  def self.create_from_hash!(hash)
    #usar email para nome se provider nao fornecer name
    #(yahoo envia name: " ")
    #(openid envia user_info vazio em alguns casos)
    if hash['user_info']['name']
      if hash['user_info']['name'].strip.empty?
        if hash['user_info']['email']
          hash['user_info']['name'] = hash['user_info']['email'] 
        else
          hash['user_info']['name'] = hash['uid'] 
        end
      end
    else
     if hash['user_info']['email']
        hash['user_info']['name'] = hash['user_info']['email'] 
      else
        hash['user_info']['name'] = hash['uid'] 
      end
    end

    create(:name => hash['user_info']['name'], :email => hash['user_info']['email'])
  end
  
end
