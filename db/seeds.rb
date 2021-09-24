# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This will calculate random points approximately within Berlin
def calculate_rand_lat_lng_for_partner
  # Coordinates of a central point in Berlin, Brandenbunger Tor
  central_point_coordinates = {
    lat: 52.51626007592769,
    lng: 13.377783422966164,
  }

  # Find a random distance between 0 a 7 km (approximate radius for Berlin city)
  distance = Random.rand(0..7000)
  angle = Random.rand(-Math::PI..Math::PI)

  distance_x = distance * Math.cos(angle)
  distance_y = distance * Math.sin(angle)

  distance_seconds_longitude = distance_x / 24.384
  distance_seconds_latitude = distance_y / 30.7848

  distance_decimal_longitude = distance_seconds_longitude / 3600
  distance_decimal_latitude = distance_seconds_latitude / 3600

  [central_point_coordinates[:lat] + distance_decimal_latitude, central_point_coordinates[:lng] + distance_decimal_longitude]
end


def seed_materials
  Material.create(name: 'Wood')
  Material.create(name: 'Carpet')
  Material.create(name: 'Tiles')
end

def should_add_wood?(experience_factor)
  experience_factor.to_s(2)[0] == '1'
end

def should_add_carpet?(experience_factor)
  experience_factor.to_s(2)[1] == '1'
end

def should_add_tiles?(experience_factor)
  experience_factor.to_s(2)[2] == '1'
end

def seed_partners
  wood_material = Material.find_by(name: 'Wood')
  carpet_material = Material.find_by(name: 'Carpet')
  tiles_material = Material.find_by(name: 'Tiles')

  # create fifty partners
  50.times.each do
    ActiveRecord::Base.transaction do
      lat, lng = calculate_rand_lat_lng_for_partner
      # random operating radius between 0 and 4 kilometers
      operating_radius = Random.rand(1.0..4.0).round(2)
      # a rating between 2 and 5
      rating = Random.rand(2.0..5.0)

      partner = Partner.create(lat: lat, lng: lng, operating_radius: operating_radius, rating: rating)
      # assing a random amount of experience between 1 and 7
      experience_years = Random.rand(1..7)
      # this is a way of finding a random way to assign which materials the partner will have experience with
      experience_factor = Random.rand(1..7)

      Experience.create(material: wood_material, partner: partner, years: experience_years) if should_add_wood?(experience_factor)
      Experience.create(material: carpet_material, partner: partner, years: experience_years) if should_add_carpet?(experience_factor)
      Experience.create(material: tiles_material, partner: partner, years: experience_years) if should_add_tiles?(experience_factor)
      # create_experiences(partner, experience_years, experience_factor)
    end
  end
end


if Material.count == 0
  seed_materials
end

if Partner.count == 0
  seed_partners
end