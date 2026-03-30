import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import { Provider } from "react-redux";
import { store } from "./app.store";

const App = () => {
  return (
    <>
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </>
  );
};

export default App;

//imp topic-  hydration
//refresh karne pe redux store ka data chala jata hay, isliye hum hydration use karte hay taki hamara data refresh hone ke baad bhi store me rahe.

/*

🎯 Interview-Ready Answer
“Hydration in Redux refers to the process of initializing or restoring the Redux store with existing data, 
such as data from the server, local storage, or preloaded state. It is commonly used in SSR frameworks like Next.js 
or with libraries like redux-persist to maintain state across page reloads.”
*/