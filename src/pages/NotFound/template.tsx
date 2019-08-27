import * as React from "react";
import { useTranslation } from "react-i18next";
import CardContainer from "../../templates/Containers/Cards/template";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return <CardContainer>{t("pages.notfound.message")}</CardContainer>;
};

export default NotFound;
