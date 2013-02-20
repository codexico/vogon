class SessionsController < ApplicationController

  def create
    auth = request.env['omniauth.auth']
    unless @auth = Authorization.find_from_hash(auth)
      # Create a new user or add an auth to existing user, depending on
      # whether there is already a user signed in.
      @auth = Authorization.create_from_hash(auth, current_user)
    end

    session[:user_id] = @auth.user.id
    redirect_to root_url, :notice => "Logado com sucesso!"
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Saiu!"
  end

end
