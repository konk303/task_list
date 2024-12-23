import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from './components/ui/provider.tsx';
import RouteSets from './Routes.tsx';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={ client }>
      <Provider>
        <RouteSets />
      </Provider>
    </ApolloProvider >
  </StrictMode >,
)
