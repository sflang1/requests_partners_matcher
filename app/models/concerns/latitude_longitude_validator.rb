module LatitudeLongitudeValidator
  extend ActiveSupport::Concern

  included do
    validates_presence_of       [:lat, :lng]
    validates_numericality_of   :lat
    validates_numericality_of   :lng
    validate                    :validate_range_lat, :validate_range_lng
  end

  def validate_range_lat
    errors.add(:lat, 'must be between -90 and 90') if self.lat <= -90 || self.lat >= 90
  end

  def validate_range_lng
    errors.add(:lng, 'must be between -180 and 180') if self.lat <= -180 || self.lat >= 180
  end
end