import React from "react";

type PlaceHolderProps = {
  placeholder: string;
};

const PlaceHolder = ({ placeholder }: PlaceHolderProps) => <p>{placeholder}</p>;

export default PlaceHolder;
