import { Suspense } from "react";
import { App } from "../App";

const Loading = () => {
  return (
    <div>Loading...</div>
  );
}

export const IndexPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
};
