import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import actions from "../../store/auth/actions";
import template from "./template";

export interface IDispatchProps {
  bootstrapSession: () => void;
}

export interface IStateProps {
  isSessionBootstrapped: boolean;
}

export const mapStateToProps = (state: IApplicationState): IStateProps => {
  return {
    isSessionBootstrapped: state.auth.isSessionBootstrapped
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    bootstrapSession: () => {
      dispatch(actions.bootstrapSessionRequested());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(template)));
