class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.references      :material
      t.decimal         :lat, precision: 10, scale: 6
      t.decimal         :lng, precision: 10, scale: 6
      t.decimal         :area
      t.string          :phone_number

      t.timestamps
    end
  end
end
