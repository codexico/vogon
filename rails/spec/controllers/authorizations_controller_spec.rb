require File.dirname(__FILE__) + '/../spec_helper'

describe AuthorizationsController do
  fixtures :all
  render_views

  it "index action should render index template" do
    get :index
    response.should render_template(:index)
  end
  
  it "create action should render new template when model is invalid" do
    Authorization.any_instance.stubs(:valid?).returns(false)
    post :create
    response.should render_template(:new)
  end

  it "create action should redirect when model is valid" do
    Authorization.any_instance.stubs(:valid?).returns(true)
    post :create
    response.should redirect_to(authorizations_url)
  end
  
  it "destroy action should destroy model and redirect to index action" do
    authorization = Authorization.first
    delete :destroy, :id => authorization
    response.should redirect_to(authorizations_url)
    Authorization.exists?(authorization.id).should be_false
  end
end
