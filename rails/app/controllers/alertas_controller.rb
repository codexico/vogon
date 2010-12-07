class AlertasController < ApplicationController
  # GET /alertas
  # GET /alertas.xml
  def index
    @alertas = Alerta.all
  end

  # GET /alertas/1
  # GET /alertas/1.xml
  def show
    @alerta = Alerta.find(params[:id])
  end

  # GET /alertas/new
  # GET /alertas/new.xml
  def new
    @alerta = Alerta.new
  end

  # GET /alertas/1/edit
  def edit
    @alerta = Alerta.find(params[:id])
  end

  # POST /alertas
  # POST /alertas.xml
  def create
    @produto = Produto.new(params[:produto])
    @user = User.new(params[:user])
 
    params[:alerta][:baixar] = false if params[:alerta][:baixar] == nil #TODO: colocar no before
 
    @alerta = Alerta.new(:valor => params[:alerta][:valor], :baixar => params[:alerta][:baixar],
     :user => @user, :produto => @produto)

    if @alerta.save
      render :text => 'ok'
    else
      @alerta.errors.merge!(@user.errors)
      render :text => @alerta.errors.keys
    end
  end

  # PUT /alertas/1
  # PUT /alertas/1.xml
  def update
    @alerta = Alerta.find(params[:id])

    if @alerta.update_attributes(params[:alerta])
      redirect_to(@alerta, :notice => 'Alerta was successfully updated.')
    else
      render :action => "edit"
    end
  end

  # DELETE /alertas/1
  # DELETE /alertas/1.xml
  def destroy
    @alerta = Alerta.find(params[:id])
    @alerta.destroy
    
    redirect_to(alertas_url)
  end
end
