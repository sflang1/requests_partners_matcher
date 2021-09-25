class Partner < ApplicationRecord
  include LatitudeLongitudeValidator

  has_many :experiences
  has_many :materials, through: :experiences

  acts_as_mappable

  def api_response
    {
      id: self.id,
      name: self.name,
      operating_radius: self.operating_radius,
      rating: self.rating,
      lat: self.lat,
      lng: self.lng,
      price: self.price,
      experiences: experiences.map {|experience| { years: experience.years, material: { id: experience.material.id, name: experience.material.name } }}
    }
  end
end