# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [ String ], null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :done, Boolean, required: false

    def resolve(id:, name: nil, done: nil)
      task = Task.find(id)
      task.name = name.presence || task.name
      task.done = done unless done.nil?
      if task.save
        { task: task, errors: [] }
      else
        { task: nil, errors: comment.errors.full_messages }
      end
    end
  end
end
