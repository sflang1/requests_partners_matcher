class Request < ApplicationRecord
  validates_presence_of   [:lat, :lng, :area, :phone_number, :material]
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
    }

    response[:assigned_partner] = {
      id: self.assigned_partner.id,
      name: self.assigned_partner.name
    } unless self.assigned_partner.blank?

    response
  end
end