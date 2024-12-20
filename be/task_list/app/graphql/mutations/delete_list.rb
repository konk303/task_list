# frozen_string_literal: true

module Mutations
  class DeleteList < BaseMutation
    field :list, Types::ListType, null: false
    field :errors, [ String ], null: false

    argument :id, ID, required: true

    def resolve(id:)
      list = List.find(id)
      if list.destroy
        { list: list, errors: [] }
      else
        { list: nil, errors: task.errors.full_messages }
      end
    end
  end
end
