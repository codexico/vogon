require 'test_helper'

class AlertaTest < ActiveSupport::TestCase
  
  test "should not save alerta without valor or baixar" do
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => nil, :baixar => nil)
    assert !alerta.save, "Salvou alerta sem valor ou baixar"
  end
  
  test "valor deve ser decimal ou inteiro positivo" do
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => "asdf")
    assert !alerta.save, "Salvou alerta com valor nao decimal"
    
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => "123")
    assert alerta.save, "Salvou alerta com valor integer"
    
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => "123.45")
    assert alerta.save, "Salvou alerta com ponto decimal"
    
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => "123,45")
    assert !alerta.save, "Salvou alerta com virgula decimal"
    
    alerta = Alerta.new(:user_id => 1, :produto_id => 1, :valor => "-123")
    assert !alerta.save, "Salvou alerta com valor negativo"
  end
  
end
