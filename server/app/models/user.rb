class User < ApplicationRecord
    # Relationships
    has_one :profile
    has_many :articles
    has_many :comments
    has_many :categories, through: :subscriptions
    has_many :subscriptions    
    has_many :articless, through: :articles_categories, source: :article
    # has_many :articles
    # roles
    enum role: [:technicalwriter, :moderator, :admin]

    # Method to allow easy access of a user's role
    def user_type
        User.roles.key(self[:roles])
    end

    # Helper method to encrypt password
    has_secure_password

    # Validations
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP} # checks if the email attribute of a model matches a valid email format
    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 6}, if: -> {new_record? || !password.nil?}

            
    def send_new_article_notifications
        new_article = []
        Articlecategory.each do |article_category|
          if categories.include?(article_category.category)
            new_article += Article.new_articles_for_category(article_category.category.id)
          end
        end
    
        new_articles.each do |article|
          UserMailer.new_article_notification(self, article).deliver_now
        end
    end
end
