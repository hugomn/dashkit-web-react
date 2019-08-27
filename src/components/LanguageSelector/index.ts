import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../../store";
import { changeLanguage } from "../../store/i18n/actions";
import template from "./template";

export const mapStateToProps = (state: IApplicationState) => {
  return {
    language: state.i18n.language
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (lng: string) => {
      dispatch(changeLanguage(lng));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(template));
