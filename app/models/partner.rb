class Partner < ApplicationRecord
  has_many :experiences
  has_many :materials, through: :experiences

  acts_as_mappable
end