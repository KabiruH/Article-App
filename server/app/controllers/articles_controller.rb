class ArticlesController < ApplicationController
    # Handle ActiveRecord Not Found exception
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # Handle ActiveRecord Unprocessable Entity - raised when a record fails to save or validate in the database.
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    # GET /articles
    def index
        articles = Article.all
        render json: articles.map { |article| ArticleSerializer.new(article).serializable_hash[:data][:attributes] }, include: :users, status: :ok
        # options = {
        #     include: [:comments]
        # }
        # render json: ArticleSerializer.new(articles, options).serializable_hash, status: :ok
    end

    # GET /articles/:id
    def show
        article = find_article
        render json: ArticleSerializer.new(article).serializable_hash[:data][:attributes], status: :ok
    end

    # POST /articles (If logged in)
    def create
        current_user = User.find_by(session[:user_id])
        if current_user
            article = Article.new(article_params)
            if article.save
                render article, status: :created, location: article
            else
                render json: article.errors.full_messages, status: :unprocessable_entity
            end
        else
            render json: { error: 'You need to be logged in to post an article '}, status: :unauthorized
        end
    end

    # PATCH /articles/:id  (If logged in)

    def update
        article = find_article
        current_user = User.find_by(session[:user_id])
        
        if current_user && (current_user == article.user || current_user.role == "admin")
            if article.update(status: params[:status])
                render json: article, status: :accepted
            else
                render json: article.errors, status: :unprocessable_entity
            end
        else
          render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
        end
    end


    # DELETE /articles/:id (Article owner or admin)
    def destroy
        current_user = User.find_by(id: session[:user_id])
        article = find_article
        if current_user && (current_user == article.user || current_user.role == "admin")
            article.destroy
            head :no_content
        else
            render json: { error: "You do not have permission to delete this article" }, status: :unauthorized
        end
    end

    # Like
    def like
        article = find_article
        article.likes += 1
        article.save
        render json: article, status: :ok
    end

    # Dislike
    def dislike
        article = find_article
        article.dislikes += 1
        article.save
        render json: article, status: :ok
    end

    private

    def find_article
        Article.find(params[:id])
    end


    def article_params
        params.require(:article).permit(:title, :body, :user_id, :image)
    end

    def render_not_found_response
        render json: { error: "Article not found" }, status: :not_found
    end
    
    def render_unprocessable_entity_response(exception)
        render json: { error: exception.message }, status: :unprocessable_entity
    end
end
