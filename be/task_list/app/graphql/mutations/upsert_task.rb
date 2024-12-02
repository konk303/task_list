# frozen_string_literal: true

module Mutations
  class UpsertTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :errors, [ String ], null: false

    argument :id, ID, required: :nullable
    argument :list_id, ID, required: true
    argument :name, String, required: false
    argument :done, Boolean, required: false

    def resolve(id:, list_id:, name: nil, done: nil)
      task = if id.present?
               List.find(list_id).tasks.find(id)
             else
               List.find(list_id).tasks.new(order: 10_000)
             end
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