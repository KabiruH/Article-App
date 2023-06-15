class WishlistsController < ApplicationController
        # post 'wishlist/add_article/:id'
        def add_article
            article = Article.find(params[:id])
            current_user.wishlist.articles << article
            redirect_to articles_path, notice: 'article added to wishlist'
        end
    
        # Delete wishlist/remove_article/:id
          def remove_article
            article = Article.find(params[:id])
            current_user.wishlist.article.delete(article)
            redirect_to wishlist_path, notice: 'article removed from wishlist'
          end
end
