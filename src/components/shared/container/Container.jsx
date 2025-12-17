import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-10">{children}</div>
  );
};

export default Container;
