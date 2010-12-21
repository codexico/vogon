class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user, :current_user_providers
  
  private
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
        #current_user.authorizations.each do |a| 
          #@current_providers << a.provider
        #end
  end


end
