import { Center, Container, Heading, Highlight } from '@chakra-ui/react';
import './App.css'
import ListsContainer from './components/ListsContainer.tsx';

export default function App () {
  return (
    <Container borderWidth="1px" borderColor="border.disabled" borderRadius="md" maxWidth="2xl" >
      <Center>
        <Heading size="6xl" fontWeight="bold" align="center">
          <Highlight query="Task" styles={ { color: "red.500" } }>
            SimpleTaskList
          </Highlight>
        </Heading>
      </Center>
      <ListsContainer />
    </Container>
  );
}
