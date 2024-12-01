# frozen_string_literal: true

module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [String], null: false

    argument :list_id, ID, required: true
    argument :name, String, required: true
    argument :order, Integer, required: true
    argument :done, Boolean, required: true

    def resolve(id:, name:, order:, done:)
      task = List.find(list_id).tasks.build
      if task.save(name:, order:, done:)
        { task: task, errors: [] }
      else
        { task: nil, errors: comment.errors.full_messages }
      end
    end
  end
end
