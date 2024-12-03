# frozen_string_literal: true

module Mutations
  class ReorderTasks < BaseMutation
    field :tasks, [ Types::TaskType ], null: false
    field :errors, [ String ], null: false

    argument :list_id, ID, required: true
    argument :task_ids, [ ID ], required: true

    def resolve(list_id:, task_ids:)
      tasks = List.find(list_id).tasks
      task_ids.map.with_index do |task_id, i|
        tasks.find { |task| task_id == task.id.to_s }.update!(order: i.succ)
      end
      { tasks: tasks, errors: [] }
    end
  end
end
