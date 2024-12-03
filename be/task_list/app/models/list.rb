class List < ApplicationRecord
  has_many :tasks, -> { order(:order) }

  validates :name, presence: true
end
