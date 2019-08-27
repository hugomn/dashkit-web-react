import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { IApplicationState } from "../../../store";
import actions from "../../../store/auth/actions";
import template from "./template";

export const mapStateToProps = (state: IApplicationState) => {
  return {
    email: state.auth.email
  };
};

export const mapDispatchToProps = { setNewPassword: actions.newPasswordChallengeRequested };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(template));
