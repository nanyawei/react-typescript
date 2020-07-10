import React from "react";
import { hot } from "react-hot-loader/root";
import A from "./page/A";
import B from "./page/B";

const App = React.memo(() => {
  return (
    <div>
      {process.env.NODE_ENV}
      <br />
      {process.env.APP_BASE_URL}
      <br />
      hello ts
      <br />
      hello react
      <A />
      <B />
    </div>
  );
});

export default hot(App);
