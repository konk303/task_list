require 'rails_helper'

RSpec.describe Mutations::ReorderTasks do
    let(:list) { create(:list) }
    let(:task1) { create(:task, list: list, order: 1) }
    let(:task2) { create(:task, list: list, order: 2) }
    let(:task3) { create(:task, list: list, order: 3) }
    subject do
        task_ids = [task3.id, task1.id, task2.id]
         run_graphql_field("Mutation.reorderTasks", nil, arguments: { input: { list_id: list.id, task_ids: task_ids }}) 
    end
    it 'reorders tasks' do 
        expect { subject } .to change { list.reload.tasks }
            .from([task1, task2, task3])
            .to([task3, task1, task2])
    end
end
