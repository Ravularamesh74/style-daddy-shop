// App.tsx
import React from 'react';
import Router from './router';
import Providers from './providers';

const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
};

export default App;