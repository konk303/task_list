# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :delete_list, mutation: Mutations::DeleteList
    field :upsert_list, mutation: Mutations::UpsertList
    field :upsert_task, mutation: Mutations::UpsertTask
    field :reorder_tasks, mutation: Mutations::ReorderTasks
    field :delete_task, mutation: Mutations::DeleteTask

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
