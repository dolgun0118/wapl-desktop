import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DummyTestPage from "./pages/DummyTestPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import StubTestPage from "./pages/StubTestPage.tsx";
import SpyTestPage from "./pages/SpyTestPage.tsx";
import FakeTestPage from "./pages/FakeTestPage.tsx";
import MockTestPage from "./pages/MockTestPage.tsx";
// import { worker } from "./mocks/browser.ts";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");
  return worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dummy",
        element: <DummyTestPage />,
      },
      {
        path: "stub",
        element: <StubTestPage />,
      },
      {
        path: "spy",
        element: <SpyTestPage />,
      },
      {
        path: "fake",
        element: <FakeTestPage />,
      },
      {
        path: "mock",
        element: <MockTestPage />,
      },
    ],
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
