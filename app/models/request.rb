class Request < ApplicationRecord
  include LatitudeLongitudeValidator

  validates_presence_of       [:area, :phone_number, :material]
  validates_numericality_of   :area, greater_than: 0

  belongs_to        :material
  belongs_to        :assigned_partner, class_name: 'Partner', foreign_key: :assigned_id, optional: true

  enum status: %i(created assigned)

  def api_response
    response = {
      id: self.id,
      material: {
        id: self.material.id,
        name: self.material.name
      },
      area: self.area,
      status: self.status,
      phone_number: self.phone_number,
      lat: self.lat,
      lng: self.lng
    }

    response[:assigned_partner] = {
      id: self.assigned_partner.id,
      name: self.assigned_partner.name,
      price: self.assigned_partner.price
    } unless self.assigned_partner.blank?

    response
  end
end