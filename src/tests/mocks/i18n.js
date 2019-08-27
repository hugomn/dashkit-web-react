import i18n from "i18next";

export const i18nMock = {
  i18n: i18n,
  t: jest.fn(),
  tReady: true
};
