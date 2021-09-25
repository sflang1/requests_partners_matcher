class AddAssignedToRequests < ActiveRecord::Migration[6.1]
  def change
    add_column        :requests, :assigned_id, :integer
    add_foreign_key   :requests, :partners, column: :assigned_id
  end
end
