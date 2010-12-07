require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  test "should not save user without email" do
    user = User.new
    assert !user.save, "Salvou user sem email"
  end
  
  test "should not save user with invalid email" do
    user = User.new(:email => 'emailinvalido')
    assert !user.save, "Salvou user com email invalido"
  end
  
end
