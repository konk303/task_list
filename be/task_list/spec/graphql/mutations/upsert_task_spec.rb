require 'rails_helper'

RSpec.describe Mutations::UpsertTask do
  let(:list) { create(:list) }
  let(:task) { create(:task, list: list) }
  context "when already exists" do
    subject do
      run_graphql_field("Mutation.upsertTask", nil, arguments: { input: { id: task.id, list_id: list.id, name: 'foo', done: true } }) 
    end
    it "returns a task" do
      expect(subject[:task].id).to eq(task.id) 
    end
    it 'updates name' do
      expect { subject } .to change { task.reload.name }.to('foo')
    end 
    it 'updates done' do
      expect { subject } .to change { task.reload.done }.to(true)
    end 
  end
  context "when new record" do
    subject do
      run_graphql_field("Mutation.upsertTask", nil, arguments: { input: { id: "newRecord", list_id: list.id, name: 'foo', done: true } }) 
    end
    it "returns a new task" do
      expect(subject[:task].id).to eq(list.reload.tasks.last.id)
      expect(subject[:task].name).to eq("foo")
      expect(subject[:task].done).to eq(true)
    end
    it 'creates new record' do
      expect { subject } .to change { list.reload.tasks.count }.by(1)
    end 
  end
end
