import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
