const supportedLanguage = ['TH'];
const fallbackLanugage = 'EN';

export default (req, res, next) => {
  let lang = req.header('accept-language') || fallbackLanugage;
  lang = lang.toUpperCase();

  if (supportedLanguage.indexOf(lang) < 0) {
    lang = fallbackLanugage;
  }

  req.language = lang;
  next();
};
