class ArticleCategoryController < ApplicationController

      # POST /article_category 
      def create
        current_user = User.find_by(session[:user_id])
        if current_user
            article_cat = ArticleCategory.create(article_category_params)
            if article_cat
                render article_cat, status: :created, location: article_cat
            else
                render json: article_cat.errors.full_messages, status: :unprocessable_entity
            end
        else
            render json: { error: 'You need to be logged in '}, status: :unauthorized

        end

        private
        
        def article_category_params
            params.permit(:article_id, :user_id)
            
        end
    end

end
