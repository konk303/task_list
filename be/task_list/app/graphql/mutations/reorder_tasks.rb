# frozen_string_literal: true

module Mutations
  class ReorderTasks < BaseMutation
    field :tasks, [ Types::TaskType ], null: false
    field :errors, [ String ], null: false

    argument :list_id, ID, required: true
    argument :task_ids, [ ID ], required: true

    def resolve(list_id:, task_ids:)
      tasks = List.find(list_id).tasks.sort_by { |task| task_ids.index(task.id.to_s) }
      tasks.map.with_index { |task, i| task.update!(order: i.succ) }
      { tasks: tasks, errors: [] }
    end
  end
end
