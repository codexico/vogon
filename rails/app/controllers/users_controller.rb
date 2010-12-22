class UsersController < ApplicationController
  # PUT /users/1
  # PUT /users/1.xml
  def update
    if current_user
      if current_user.id == params[:id].to_i
        @user = current_user
        if @user.update_attributes(params[:user])
          redirect_to(authorizations_path, :notice => 'Atualizado com sucesso.') 
        else
          redirect_to(authorizations_path, :notice => 'Ocorreu um erro, tente novamente por favor.') 
        end
      else
        flash[:notice] = "id incorreto."
        redirect_to root_path and return
      end
    else
      flash[:notice] = "Sem permissao."
      redirect_to root_path and return
    end

  end

  # DELETE /users/1
  # DELETE /users/1.xml
  def destroy
    if current_user
      if current_user.id == params[:id].to_i
        @user = current_user
        @user.destroy
        redirect_to(authorizations_path, :notice => 'Deletado com sucesso.') 
      else
        flash[:notice] = "id incorreto."
        redirect_to root_path and return
      end
    else
      flash[:notice] = "Sem permissao."
      redirect_to root_path and return
    end
  end
end
