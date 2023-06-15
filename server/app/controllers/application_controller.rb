class ApplicationController < ActionController::Base

    # Enable sessions
    include ActionController::Cookies

    # make available
    helper_method :current_user, :ensure_current_user, :image_url

    private

    def ensure_current_user
        if current_user.nil?
            render json: { error: 'Kindly log in to contribute'}, status: :unauthorized
        end
    end

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id]) 
        end
    end

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

end
