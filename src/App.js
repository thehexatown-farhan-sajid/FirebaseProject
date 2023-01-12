import React from "react";
import Artionform from "./router/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
    <Provider store={store}>
      <Artionform />
      </Provider>
    </>
  );
}

export default App;
