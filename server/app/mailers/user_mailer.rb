class UserMailer < ApplicationMailer
    def new_article_notification(user, article)
        @user = user
        @article = article
        @category = Category.joins(:article_categories).where(article_categories: {article_id: article.id}).first
        mail(to: user.email, subject: "New article in #{@category ? @category.name : 'uncategorized'} category")
        
        
    end
end
