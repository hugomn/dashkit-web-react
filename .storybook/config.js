import { configure, addDecorator, addParameters } from "@storybook/react";
import React from "react";
import { Grommet, Box } from "grommet";
import theme from "../src/constants/theme";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "../src/i18n/resources";

// automatically import all files ending in *.stories.js
const req = require.context("./stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const GrommetDecorator = storyFn => {
  theme.global.colors.background = "transparent";
  return (
    <Grommet full theme={theme}>
      <Box align="start" justify="start" pad="small" background={theme.global.colors.background}>
        {storyFn()}
      </Box>
    </Grommet>
  );
};
addDecorator(GrommetDecorator);

i18n.use(initReactI18next).init({
  fallbackLng: Object.keys(resources),
  interpolation: {
    escapeValue: false
  },
  keySeparator: false,
  lng: "en",
  resources
});
const i18nDecorator = storyFn => {
  return <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>;
};
addDecorator(i18nDecorator);

addParameters({
  options: {
    name: "DashKit UI",
    url: "https://ui.hugo.im",
    enableShortcuts: true,
    showPanel: false,
    panelPosition: "bottom",
    sidebarAnimations: true,
    theme: undefined
  }
});

configure(loadStories, module);
