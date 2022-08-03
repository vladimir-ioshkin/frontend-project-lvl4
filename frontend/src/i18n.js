import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './languages/index';

const setI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
};

export { setI18n, i18n };
