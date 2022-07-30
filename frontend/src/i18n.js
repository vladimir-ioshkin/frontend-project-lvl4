import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './languages/index.js';
import store from './store';

const setI18n = () => {
  const { applicationStatus: { lng } } = store.getState();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng,
      interpolation: {
        escapeValue: false,
      },
    });
};

export { setI18n, i18n };
