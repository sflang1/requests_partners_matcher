class CreatePartners < ActiveRecord::Migration[6.1]
  def change
    create_table :partners do |t|
      t.decimal         :lat, precision: 10, scale: 6
      t.decimal         :lng, precision: 10, scale: 6
      t.decimal         :operating_radius
      t.decimal         :rating

      t.timestamps
    end
  end
end
