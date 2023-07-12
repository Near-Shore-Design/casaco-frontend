import React from "react";
import { errorProp } from "./types";

const ErrorMessage: React.FC<errorProp> = ({ field }) => {
  return <span className="text-red-600 text-sm">{field}</span>;
};

export default ErrorMessage;
