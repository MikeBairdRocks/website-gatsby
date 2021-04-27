import { parseISO, format } from "date-fns";
import React from "react";

type DateProps = {
  value: string
};

const Date: React.FunctionComponent<DateProps> = ({ value }) => {
  const date = parseISO(value);
  return <time dateTime={value}>{format(date, "d LLL yyyy")}</time>;
};

export default Date;