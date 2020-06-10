import React from 'react';
import { hot } from 'react-hot-loader/root';

const App = React.memo(() => {
  return <div>
    {process.env.NODE_ENV}
    hello ts
  </div>
});

export default hot(App);