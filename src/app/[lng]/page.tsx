import Link from "next/link";
import React from "react";
import { useTranslation } from "../i18n";
import { fallbackLng, languages } from "../i18n/settings";

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home(props: HomeProps) {
  const lng = languages.includes(props.params.lng)
    ? props.params.lng
    : fallbackLng;
  const { t } = await useTranslation(lng);

  return (
    <>
      <h1>{t("home")}</h1>
      <Link href={`/${lng}/contact`}>{t("contact")}</Link>
    </>
  );
}
