import { gql, useQuery } from "@apollo/client";

const GET_LISTS = gql`
  query QueryLists { lists { id name } }
`;

export default function useLists () {
    const { loading, error, data, refetch } = useQuery(GET_LISTS);
    return { loading, error, data, refetch }
}
