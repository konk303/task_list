class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.references :list, null: false, foreign_key: true
      t.text :name
      t.integer :order
      t.boolean :done

      t.timestamps
    end
  end
end
