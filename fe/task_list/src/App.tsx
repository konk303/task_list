import { Center, Container, Heading, Highlight, Separator } from '@chakra-ui/react';
import './App.css'
import ListsContainer from './components/ListsContainer.tsx';
import { Outlet } from 'react-router';

export default function App () {
  return (
    <Container p="0" borderWidth="1px" borderColor="border.disabled" borderRadius="md" maxWidth="2xl" >
      <Center>
        <Heading size="6xl" fontWeight="bold" p="4">
          <Highlight query="Task" styles={ { color: "red.500" } }>
            SimpleTaskList
          </Highlight>
        </Heading>
      </Center>
      <Separator />
      <Outlet />
    </Container>
  );
}
