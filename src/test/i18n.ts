import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { defaultNS, fallbackLng } from "@/app/i18n/settings";

i18n.use(initReactI18next).init({
  lng: fallbackLng,
  fallbackLng: fallbackLng,
  ns: defaultNS,
  defaultNS: defaultNS,
  debug: true,
  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {},
  },
});

export default i18n;
