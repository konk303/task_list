require 'rails_helper'

RSpec.describe Mutations::UpsertList do
  let(:list) { create(:list) }
  context "when already exists" do
    subject do
      run_graphql_field("Mutation.upsertList", nil, arguments: { input: { id: list.id, name: 'foo' } })
    end
    it "returns a list" do
      expect(subject[:list].id).to eq(list.id)
    end
    it 'updates name' do
      expect { subject } .to change { list.reload.name }.to('foo')
    end
  end
  context "when new record" do
    subject do
      run_graphql_field("Mutation.upsertList", nil, arguments: { input: { id: "newRecord", name: 'foo' } })
    end
    it "returns a new list" do
      expect(subject[:list].name).to eq("foo")
    end
    it 'creates new record' do
      expect { subject } .to change {List.count }.by(1)
    end
  end
end
