import { Menu } from "grommet";
import { IconProps, Language } from "grommet-icons";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import styled from "styled-components";
import resources from "../../i18n/resources";

interface IProps {
  changeLanguage: any;
  language: string;
}

interface IState {
  options: string[];
}

class LanguageSelector extends React.Component<IProps & WithTranslation, IState> {
  public render() {
    const { language, changeLanguage, t } = this.props;
    return (
      <Menu
        label={
          <StyledLabel>
            <StyledLanguage size="small" />
            {language.toUpperCase()}
          </StyledLabel>
        }
        items={Object.keys(resources).map(lang => {
          return {
            label: t(`components.languageselector.label.${lang}`),
            onClick: () => changeLanguage(lang)
          };
        })}
        dropAlign={{ bottom: "top" }}
      />
    );
  }
}

const StyledLabel = styled.div`
  /* color: white; */
`;

const StyledLanguage = styled(Language as React.FC<IconProps>)`
  margin-right: 8px;
`;

export default LanguageSelector;
