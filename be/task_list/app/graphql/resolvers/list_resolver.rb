module Resolvers
  class ListResolver < BaseResolver
    type Types::ListType, null: false
    argument :id, ID

    def resolve(id:)
      ::List.find(id)
    end
  end
end
