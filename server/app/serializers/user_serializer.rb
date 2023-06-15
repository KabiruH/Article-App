class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :role

  has_one :profile
  # has_many :articles
  has_many :subscriptions
end
