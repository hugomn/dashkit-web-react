const mocki18n = {
  changeLanguage: () => {},
  init: () => {},
  t: k => k
};

mocki18n.use = () => mocki18n;

export default mocki18n;
