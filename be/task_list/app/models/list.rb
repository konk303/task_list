class List < ApplicationRecord
  has_many :tasks, -> { order(:order) }, dependent: :destroy

  validates :name, presence: true
end
