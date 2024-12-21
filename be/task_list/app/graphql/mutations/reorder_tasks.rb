# frozen_string_literal: true

module Mutations
  class ReorderTasks < BaseMutation
    field :list, Types::ListType, null: false
    field :errors, [ String ], null: false

    argument :list_id, ID, required: true
    argument :task_ids, [ ID ], required: true

    def resolve(list_id:, task_ids:)
      list = List.find(list_id)
      task_ids.map.with_index do |task_id, i|
        list.tasks.find { |task| task_id == task.id.to_s }&.update!(order: i)
      end
      { list: list, errors: [] }
    end
  end
end
