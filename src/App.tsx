import React from "react";
import { hot } from "react-hot-loader/root";
import Test from "./page/test";

const App = React.memo(() => {
  console.log(process.env);

  return (
    <div>
      {process.env.NODE_ENV}
      <br />
      {process.env.APP_BASE_URL}
      <br />
      hello ts
      <br />
      hello react
      <Test />
    </div>
  );
});

export default hot(App);
