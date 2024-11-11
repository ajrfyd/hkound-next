import React from "react";

type FluidSectionProps = {
  children: React.ReactNode;
  clssName?: string;
};
const FluidSection = ({ children, clssName = "" }: FluidSectionProps) => {
  return (
    <div className="section-xs pt-0">
      <div className={`container-fluid ${clssName}`}>{children}</div>
    </div>
  );
};

export default FluidSection;
