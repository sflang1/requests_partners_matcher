class AddPriceToPartners < ActiveRecord::Migration[6.1]
  def change
    add_column    :partners, :price, :decimal, precision: 10, scale: 6
  end
end
