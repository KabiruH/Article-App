class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :user_id
end
