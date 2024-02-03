import React from "react";

export default function FullScreenLoader({ loading }) {
  let clase;
  if (loading === true) {
    clase = "loading";
  } else if (loading === false) {
    clase = "notLoading";
  }
  return (
    <div className={`initialLoading ${clase} flex justify-center items-center`}>
      <div className="loading-child" />
    </div>
  );
}
