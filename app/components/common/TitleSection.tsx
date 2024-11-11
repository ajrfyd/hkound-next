import React from "react";

type TitleSectionProps = {
  title: string;
};

const TitleSection = ({ title }: TitleSectionProps) => {
  return (
    <div className="section-xs">
      <div className="container-fluid text-center">
        <h1 className="display-1 fw-medium mb-0">{title}</h1>
        {/* <h1 className="display-1 fw-medium mb-0"></h1> */}
      </div>
    </div>
  );
};

export default TitleSection;
