# frozen_string_literal: true

module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :list_id, Integer, null: false
    field :name, String
    field :order, Integer
    field :done, Boolean
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :list, ListType
  end
end
