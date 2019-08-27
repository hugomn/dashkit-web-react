import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import actions from "../../../store/auth/actions";
import template from "./template";

export const mapDispatchToProps = { login: actions.loginRequested };

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(template));
