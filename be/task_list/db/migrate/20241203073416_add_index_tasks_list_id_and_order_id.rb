class AddIndexTasksListIdAndOrderId < ActiveRecord::Migration[8.0]
  def change
    add_index :tasks, [:list_id, :order]
  end
end
