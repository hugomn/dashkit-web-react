import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../../store";
import actions from "../../../store/auth/actions";
import { UserRoles } from "../../../store/users/types";
import template from "./template";

export interface IStateProps {
  isAdmin?: boolean;
  isLoggedIn: boolean;
  pathname: string;
}

export const mapStateToProps = ({ auth, router }: IApplicationState): IStateProps => {
  return {
    isAdmin: auth.user && auth.user.roles && auth.user.roles.includes(UserRoles.ADMIN),
    isLoggedIn: auth.isLoggedIn,
    pathname: router.location.pathname
  };
};

export interface IDispatchProps {
  logout: () => void;
  redirect: (path: string, state?: any) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    logout: () => {
      dispatch(actions.logoutRequested());
    },
    redirect: (path: string, state?: any) => {
      dispatch(push(path, state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(template);
