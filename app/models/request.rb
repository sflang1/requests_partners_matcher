class Request < ApplicationRecord
  validates_presence_of   [:lat, :lng, :area, :phone_number, :material]
  belongs_to       :material

  def api_response
    {
      id: self.id,
      material: {
        id: self.material.id,
        name: self.material.name
      },
      area: self.area
    }
  end
end