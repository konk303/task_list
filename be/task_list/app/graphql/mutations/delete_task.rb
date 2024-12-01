# frozen_string_literal: true

module Mutations
  class DeleteTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [ String ], null: false

    argument :id, ID, required: true

    def resolve(id:)
      task = Task.find(id)
      if task.destroy
        { task: task, errors: [] }
      else
        { task: nil, errors: comment.errors.full_messages }
      end
    end
  end
end
