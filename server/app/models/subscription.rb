class Subscription < ApplicationRecord
    belongs_to :user
    belongs_to :category
    validates :category_id, presence: true, uniqueness: true

end
