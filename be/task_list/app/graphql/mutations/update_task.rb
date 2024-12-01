# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [String], null: false

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :order, Integer, required: true
    argument :done, Boolean, required: true

    def resolve(id:, name:, order:, done:)
      task = Task.find(id)
      if task.update(name:, order:, done:)
        { task: task, errors: [] }
      else
        { task: nil, errors: comment.errors.full_messages }
      end
    end
  end
end
