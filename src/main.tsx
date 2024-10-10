import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { AdminPage } from "./pages/AdminPage.tsx";
import { EditPage } from "./pages/EditPage.tsx";
import { IndexPage } from "./pages/IndexPage.tsx";
import { OverlayPage } from "./pages/OverlayPage.tsx";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />
  },
  {
    path: "/admin",
    element: <AdminPage />
  },
  {
    path: "/edit",
    element: <EditPage />
  },
  {
    path: "/overlay",
    element: <OverlayPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
