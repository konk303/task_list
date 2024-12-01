# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :reorder_tasks, mutation: Mutations::ReorderTasks
    field :create_task, mutation: Mutations::CreateTask
    field :update_task, mutation: Mutations::UpdateTask
    field :delete_task, mutation: Mutations::DeleteTask

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
