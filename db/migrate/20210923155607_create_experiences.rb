class CreateExperiences < ActiveRecord::Migration[6.1]
  def change
    create_table :experiences do |t|
      t.references      :material
      t.references      :partner
      t.integer         :years
      t.timestamps
    end
  end
end
