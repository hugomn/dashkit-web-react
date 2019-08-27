import i18n from "i18next";
import * as React from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IApplicationState } from "../store";
import { changeLanguage } from "../store/i18n/actions";
import markdownProcessor from "./markdownProcessor";
import resources from "./resources";

i18n
  .use(initReactI18next)
  .use(markdownProcessor)
  .init({
    fallbackLng: Object.keys(resources),
    interpolation: {
      escapeValue: false
    },
    keySeparator: false,
    lng: "en",
    resources
  });

interface IProps {
  language: string;
  changeLanguage: any;
}

class I18N extends React.PureComponent<IProps> {
  public componentDidMount() {
    this.props.changeLanguage(this.props.language);
  }

  public render() {
    return <I18nextProvider i18n={i18n}>{this.props.children}</I18nextProvider>;
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  language: state.i18n.language
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (lng: string) => {
      dispatch(changeLanguage(lng));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(I18N);
