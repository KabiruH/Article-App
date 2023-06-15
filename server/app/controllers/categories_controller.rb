class CategoriesController < ApplicationController

    # Handle ActiveRecord Not Found exception
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # Handle ActiveRecord Unprocessable Entity - raised when a record fails to save or validate in the database.
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    #GET categories 

    def index
        categories = Category.all
        render json: categories, status: :ok
    end

    #POST /categories

    def create 
        category = Category.create!(category_params)
        render json: category, status: :created
    end

    # DELETE /categories/:id
    
    def destroy
        current_user = User.find_by(sessions[:id])
        category = Category.find(params[:id])
        if category
            unless current_user.technicalwriter?
                category.destroy
                head :no_content
            else
                render json: { error: "Unauthorized access" }, status: :forbidden
            end
        else
            render json: { error: "category not found"}, status: :not_found
        end
    end

    private

    def find_category
        Category.find(params[:id])
    end

    def category_params
        params.permit(:name, :description)
    end

    def render_not_found_response
        render json: { error: "Category not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { error: exception.message }, status: :unprocessable_entity
    end
end
