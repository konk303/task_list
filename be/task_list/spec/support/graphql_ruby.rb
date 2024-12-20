RSpec.configure do |config|
  config.include GraphQL::Testing::Helpers.for(TaskListSchema)
end
