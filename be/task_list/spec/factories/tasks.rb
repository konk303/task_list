FactoryBot.define do
  factory :task do
    list { nil }
    name { "MyText" }
    order { 1 }
    done { false }
  end
end
