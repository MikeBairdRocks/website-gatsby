import React from "react";

const Content: React.FunctionComponent = (props) => {
  return (
    <div {...props} className="prose prose-lg dark:prose-dark px-4 max-w-3xl mx-auto sm:px-6 lg:max-w-4xl lg:px-8 xl:max-w-6xl">
      {props.children}
    </div>
  );
};

export default Content;