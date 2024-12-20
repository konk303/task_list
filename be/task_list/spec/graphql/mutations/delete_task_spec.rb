require 'rails_helper'

RSpec.describe Mutations::DeleteTask do
    let(:task) { create(:task) }
    subject { run_graphql_field("Mutation.deleteTask", nil, arguments: { input: { id: task.id }}) }
    it 'returns a task' do 
         expect(subject[:task].id).to eq(task.id) 
    end
    it 'deletes a task' do
        subject
         expect { task.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
end
