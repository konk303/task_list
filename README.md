# task_list
Simple Task list APP

## frontend
TypeScript: React + Apollo client + Chakra UI (via vite)
## backend
Ruby: rails + graphql-ruby

## features
- `List`
  - editable
  - appendable
  - deletable
  - `debounce` on name edit
  - `has_many :tasks`
- `Task`
  - editable
  - appendable
  - deletable
  - sortable
  - `done` goes bottom of the list
  - `debounce` on name edit

## TODO
- **test**
- Introduce User, with authentication
  - `User.has_many :lists`
