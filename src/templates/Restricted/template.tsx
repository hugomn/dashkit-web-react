import * as React from "react";
import BaseTemplate from "../Base";
import { ITemplateProps } from "..";

const RestrictedTemplate: React.FunctionComponent<ITemplateProps> = ({ component }) => {
  return <BaseTemplate component={component} />;
};

export default RestrictedTemplate;
