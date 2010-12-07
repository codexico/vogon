require 'test_helper'

class ProdutoTest < ActiveSupport::TestCase

  test "should not save produto without codigo" do
    produto = Produto.new(:codigo => nil )
    assert !produto.save, "Salvou produto sem codigo"
  end
  
end
