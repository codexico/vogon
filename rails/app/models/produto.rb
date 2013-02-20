class Produto < ActiveRecord::Base
  validates :codigo, :presence => true
end
