const supportedLanguageMap = {
  enUS: 'English',
};

const LocalizationService = () => {
  const defaultLocale = 'enUS';

  const getLocales = () => {
    return supportedLanguageMap;
  };

  const getUserLocale = () => {
    return defaultLocale;
  };

  const setUserLocale = (loc) => {
    window.localStorage.setItem('locale', loc);
  };

  const getCurrentLocale = () => {
    return defaultLocale;
  };

  const getLocalizedTextSet = async (keys, locale) => {
    // async import the locale file for given locale
    // and extract the set of localized text values for given keys
    let textSet = {};
    const localizedData = await getLocalizedData(locale);
    if (localizedData) {
      let localizedTextSet = localizedData;
      const keysLocalizedTextSet = Object.keys(localizedTextSet);
      for (const desiredKey of keys) {
        for (const key of keysLocalizedTextSet) {
          if (desiredKey === key) {
            textSet[key] = localizedTextSet[key];
          }
        }
      }
    }
    return textSet;
  };

  const getLocalizedData = async (localeCode) => {
    // get data from folder in public by locale using fetch
    const localizedDataFilePath = process.env.PUBLIC_URL + `/i18n/${localeCode}.json`;
    return fetch(localizedDataFilePath)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        let msg = 'Error Reading data ' + err;
        console.log(msg);
      });
  };

  return {
    setUserLocale,
    getUserLocale,
    getLocales,
    getCurrentLocale,
    getLocalizedTextSet,
  };
};

export default LocalizationService;
