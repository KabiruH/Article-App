class ProfilesController < ApplicationController

    # Handle ActiveRecord Not Found exception
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # Handle ActiveRecord Unprocessable Entity - raised when a record fails to save or validate in the database.
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # GET /profiles
    def index
      profiles = Profile.all
      render json: profiles.map { |profile| ProfileSerializer.new(profile).serializable_hash[:data][:attributes] }, status: :ok
    end
  
    # GET /profiles/:id
    # GET profile that has a user_id params
    def show
      profile = Profile.find_by(user_id: params[:user_id])
      if profile
        render json: ProfileSerializer.new(profile).serializable_hash[:data][:attributes], status: :ok
      else
        render json: { error: "Profile not found" }, status: :not_found
      end
    end
  
    # POST /profiles
    def create
      profile = Profile.new(profile_params)
      if profile.save
        render profile, status: :created, location: @profile
      else
        render json: profile.errors.full_messages, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /profiles/1
    def update
      profile = find_profile
      if @profile.update(profile_params)
        render @profile, status: :ok
      else
        render json: @profile.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /posts/1
    def destroy
      profile = find_profile
      profile.destroy
    end
  
  
    private
    
  
    def find_profile
      Profile.find(params[:id])
    end
  
    # Only allow a list of trusted parameters through.
    def profile_params
      params.require(:profile).permit(:full_name, :bio, :user_id, :image)
    end

    def render_not_found_response
      render json: { error: "Profile not found" }, status: :not_found
    end
  
    def render_unprocessable_entity_response(exception)
        render json: { error: exception.message }, status: :unprocessable_entity
    end
end
