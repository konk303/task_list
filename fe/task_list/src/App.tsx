import './App.css'
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  { lists
    { id name }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.lists.map(({ id, name }) => (
    <div key={id}>
      <h3>{name}</h3>
      <br />
    </div>
  ));
}





export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  );
}
