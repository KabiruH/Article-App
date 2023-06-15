class Category < ApplicationRecord
    has_many :article_categories, dependent: :destroy
    has_many :articles, through: :article_categories
    has_many :subscriptions, dependent: :destroy
    has_many :users, through: :subscriptions
end
