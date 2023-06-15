class ProfileSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  
  attributes :id, :full_name, :bio, :image_url, :user_id

end
