require 'rails_helper'

RSpec.describe Mutations::DeleteList do
  let(:list) { create(:list) }
  subject { run_graphql_field("Mutation.deleteList", nil, arguments: { input: { id: list.id }}) }
  it 'returns a list' do
    expect(subject[:list].id).to eq(list.id)
  end
  it 'deletes a list' do
    subject
    expect { list.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
