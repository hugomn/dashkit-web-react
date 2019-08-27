import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { publicRoutes, restrictedRoutes } from "./constants/routes";
import { IApplicationState } from "./store";
import PublicTemplate from "./templates/Public/template";
import RestrictedTemplate from "./templates/Restricted/template";

interface IProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

export const Routes = (props: IProps) => (
  <Switch>
    {Object.keys(restrictedRoutes).map((key: string) => {
      const { exact = true, path, page } = restrictedRoutes[key];
      return (
        <Route
          exact={exact}
          key={path}
          path={path}
          render={(routeProps: any) =>
            props.isLoggedIn ? (
              <RestrictedTemplate component={page} {...routeProps} />
            ) : (
              <Redirect to={publicRoutes.login.path} />
            )
          }
        />
      );
    })}
    {Object.keys(publicRoutes).map((key: string) => {
      const { exact = true, path, page } = publicRoutes[key];
      return (
        <Route
          exact={exact}
          key={path}
          path={path}
          render={(routeProps: any) => <PublicTemplate component={page} {...routeProps} />}
        />
      );
    })}
  </Switch>
);

export const mapStateToProps = (state: IApplicationState) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Routes)
);
