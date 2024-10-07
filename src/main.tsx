import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { EditPage } from "./pages/EditPage.tsx";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/edit",
    element: <EditPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
