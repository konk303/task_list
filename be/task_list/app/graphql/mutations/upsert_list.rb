# frozen_string_literal: true

module Mutations
  class UpsertList < BaseMutation
    field :list , Types::ListType, null: false
    field :errors, [ String ], null: false

    argument :id, ID, required: :nullable
    argument :name, String, required: false

    def resolve(id:, name: nil)
      list = if id == 'newRecord'
               List.new
             else
               List.find(id)
             end
      list.name = name.presence || list.name

      if list .save
        { list: list, errors: [] }
      else
        { list: nil, errors: list.errors.full_messages }
      end
    end
  end
end
