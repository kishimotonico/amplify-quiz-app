import { Suspense } from "react";
import { App } from "../App";

const Loading = () => (
  <>
    <div className="loading">
      <div className="spinner"></div>
    </div>
    <style>{`
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </>
);

export const IndexPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
};
