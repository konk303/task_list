module Resolvers
  class ListsResolver < BaseResolver
    type [Types::ListType], null: false

    def resolve
      ::List.reorder(id: :desc).all
    end
  end
end
