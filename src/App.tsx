import React from 'react';
import { hot } from 'react-hot-loader/root';

const App = React.memo(() => {
  const [disabled, setDisabled] = React.useState(false);


  return <div>
    frgtrhgrgvf
    <br/> 
    {process.env.NODE_ENV}
    <button disabled={disabled} onClick={() => setDisabled(!disabled)}>点击</button>
  </div>
});

export default hot(App);