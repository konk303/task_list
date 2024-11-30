# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
List.find_or_create_by!(name: '冬の旅行') do |list|
  %w[行先決定 日程決定 休暇取得 チケット購入 宿予約].each_with_index do |name, i|
    list.tasks.build(name: name, order: i)
  end
end

List.find_or_create_by!(name: '春の旅行') do |list|
  %w[行先決定 日程決定 休暇取得 チケット購入 宿予約].each_with_index do |name, i|
    list.tasks.build(name: name, order: i, done: i.odd?)
  end
end
