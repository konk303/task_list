module Resolvers
  class ListsResolver < BaseResolver
    type [Types::ListType], null: false

    def resolve
      ::List.all
    end
  end
end
