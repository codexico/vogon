class AuthorizationsController < ApplicationController

  def index
    @authorizations = current_user.authorizations if current_user
    @user = current_user if current_user #para editar tambem dados do user
  end
    
  def create
    omniauth = request.env["omniauth.auth"]
    @auth = Authorization.find_from_hash(omniauth)
    if @auth
      flash[:notice] = "Logou com sucesso."
      session[:user_id] = @auth.user.id
      redirect_to root_path and return
    elsif current_user
      @auth = Authorization.create_from_hash(omniauth, current_user)
      flash[:notice] = "Login adicionado."
      current_user.authorizations.find_or_create_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    else
      @auth = Authorization.create_from_hash(omniauth, current_user)
      session[:user_id] = @auth.user.id
      flash[:notice] = "Seu cadastro foi criado com sucesso."
    end
    redirect_to authorizations_url
  end

  def destroy
    @authorization = current_user.authorizations.find(params[:id])
    @authorization.destroy
    flash[:notice] = "Login deletado com sucesso."
    redirect_to authorizations_url
  end

  def auth_list
    render :partial => "alerta" , :locals => {:prod_id => params[:prod_id]}
  end
end
