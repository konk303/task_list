# task_list
Simple Task list APP

## frontend
TypeScript: React + Apollo client (via vite)
## backend
Ruby: rails + graphql-ruby

## features
- Multiple lists `List.has_many :tasks`
- `Task`
  - appendable
  - deletable
  - sortable
  - `done` goes bottom of the list
  - `debounce` on name input

## TODO
- **test**
- List CRUD feature
- Introduce User, with authentication
  - `User.has_many :lists`
