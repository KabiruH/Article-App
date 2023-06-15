class SubscriptionsController < ApplicationController

    # POST /subscriptions Subscribe to article categories
  
    def create
      subscription = Subscription.create(user_id: params[:user_id] , category_id: params[:category_id])
      if subscription
        render json: subscription, status: :accepted, notice: "Subscriptions saved successfully."
      else
        render json:subscription.errors.full_messages, status: :unprocessable_entity
      end
    end
        
    # DELETE /subscription Unsubscribe from category
  
    def destroy
      subscription = Subscription.find(params[:id])
      if subscription
        subscription.destroy
        head :no_content
      else
        render json: subscription.errors, status: :unprocessable_entity
      end
    end

end
