import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/index.tsx";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./stores/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-center" reverseOrder={false} />
          <AppRouter />
        </PersistGate>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
