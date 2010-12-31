class AlertasController < ApplicationController
  # POST /alertas
  # POST /alertas.xml
  def create
    @produto = Produto.new(params[:produto])
    if current_user
      @user = current_user
    else
      @user = User.new(params[:user])
    end
 
    params[:alerta][:baixar] = false if params[:alerta][:baixar] == nil #TODO: colocar no before
    params[:alerta][:disponivel] = false if params[:alerta][:disponivel] == nil #TODO: colocar no before

    @alerta = Alerta.new(:valor => params[:alerta][:valor], :baixar => params[:alerta][:baixar],
                         :disponivel => params[:alerta][:disponivel],
                         :user => @user, :produto => @produto)

    if @alerta.save
      render :text => 'ok'
    else
      @alerta.errors.merge!(@user.errors)
      render :text => @alerta.errors.keys
    end
  end

end
