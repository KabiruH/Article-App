class Profile < ApplicationRecord
  belongs_to :user

  # ActiveStorage relationship
  has_one_attached :image

end
