class Request < ApplicationRecord
  validates_presence_of   [:lat, :lng, :area, :phone_number, :material]
  belongs_to       :material
end