import { connect } from "react-redux";
import { IApplicationState } from "../../store";
import template from "./template";

export const mapStateToProps = (state: IApplicationState) => {
  return {
    newPasswordRequired: state.auth.newPasswordRequired
  };
};

export default connect(
  mapStateToProps,
  null
)(template);
