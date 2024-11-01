import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App.jsx";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        {" "}
        <App />
      </CurrentUserProvider>
    </BrowserRouter>
  </StrictMode>
);
