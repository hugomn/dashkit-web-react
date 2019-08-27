import { Grommet } from "grommet";
import React, { useEffect } from "react";
import { WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { ToastContainer } from "react-toastify-redux";
import theme from "../../constants/theme";
import Routes from "../../routes";
import Loading from "../Loading";
import { IDispatchProps, IStateProps } from ".";

type IProps = IDispatchProps & IStateProps & RouteComponentProps & WithTranslation;

const App: React.FC<IProps> = ({ bootstrapSession, isSessionBootstrapped }) => {
  useEffect(() => {
    bootstrapSession();
  }, [bootstrapSession]);
  return isSessionBootstrapped ? (
    <Grommet full theme={theme}>
      <Routes />
      <ToastContainer />
    </Grommet>
  ) : (
    <Loading />
  );
};

export default App;
