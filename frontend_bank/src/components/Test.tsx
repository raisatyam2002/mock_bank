import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        //@ts-ignore
        resolve(import("./LazyComponent"));
      }, 3000); // Simulate a 3-second delay
    })
);

function Test() {
  return (
    <div>
      <h1>Suspense Demo</h1>
      <Suspense fallback={<div>Loading Lazy Component...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default Test;
