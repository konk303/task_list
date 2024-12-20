FactoryBot.define do
  factory :task do
    association :list
    name { "MyText" }
    order { 1 }
    done { false }
  end
end
