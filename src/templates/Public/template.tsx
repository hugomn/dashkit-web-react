import * as React from "react";
import BaseTemplate from "../Base";
import { ITemplateProps } from "..";

const PublicTemplate: React.FunctionComponent<ITemplateProps> = ({ component }) => {
  return <BaseTemplate component={component} />;
};

export default PublicTemplate;
