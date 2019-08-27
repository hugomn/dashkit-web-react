import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import template from "./template";

export default connect(
  null,
  null
)(withTranslation()(template));
