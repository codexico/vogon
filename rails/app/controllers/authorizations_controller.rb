class AuthorizationsController < ApplicationController

  def index
    @authorizations = current_user.authorizations if current_user
  end
    
  def create
    
    omniauth = request.env["omniauth.auth"]
    @auth = Authorization.find_from_hash(omniauth)
    if @auth
      flash[:notice] = "Signed in successfully."
      session[:user_id] = @auth.user.id
    elsif current_user
      @auth = Authorization.create_from_hash(omniauth, current_user)
      flash[:notice] = "autorizacao adicionada"
      current_user.authorizations.find_or_create_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    else
      @auth = Authorization.create_from_hash(omniauth, current_user)
      session[:user_id] = @auth.user.id
      flash[:notice] = "User criado com a autorizacao"
    end
    redirect_to authorizations_url
    
  end

  def destroy
    @authorization = current_user.authorizations.find(params[:id])
    @authorization.destroy
    flash[:notice] = "Successfully destroyed authorization."
    redirect_to authorizations_url
  end

end
