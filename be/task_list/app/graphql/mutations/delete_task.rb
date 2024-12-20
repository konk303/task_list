# frozen_string_literal: true

module Mutations
  class DeleteTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [ String ], null: false

    argument :list_id, ID, required: true
    argument :id, ID, required: true

    def resolve(id:, list_id:)
      task = List.find(list_id).tasks.find(id)
      if task.destroy
        { task: task, errors: [] }
      else
        { task: nil, errors: task.errors.full_messages }
      end
    end
  end
end
