import { IS_DEVELOPMENT } from "@/config/constants";

export const fallbackLng = "en";
export const languages = [fallbackLng, "uk"];
export const defaultNS = "translation";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: IS_DEVELOPMENT,
    supportedLngs: languages,
    preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    backend: {
      projectId: process.env.LOCIZE_PROJECTID,
    },
  };
}
