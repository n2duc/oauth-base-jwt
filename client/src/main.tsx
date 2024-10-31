import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/index.tsx";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./stores/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <BrowserRouter> */}
          <AppRouter />
        {/* </BrowserRouter> */}
      </PersistGate>
    </Provider>
  </StrictMode>
);
