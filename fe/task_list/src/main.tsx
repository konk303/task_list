import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client ={ client }>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
