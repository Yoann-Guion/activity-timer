"use client";

import { ScrollText } from "lucide-react";
import { useCurrentLocale, useScopedI18n } from "@locales/client";

export default function LegalContainer() {
  const t = useScopedI18n("pages.legal");
  const currentLocale = useCurrentLocale();

  // Format the last update date based on the current locale
  const lastUpdateDate = new Date("2024-04-08");
  const formattedDate =
    currentLocale === "fr"
      ? lastUpdateDate.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : lastUpdateDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

  return (
    <div className="h-full overflow-auto">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold mb-6">
          <ScrollText className="size-6" aria-hidden="true" />
          {t("mainTitle")}
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.siteOwner")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.name")}Yoann Guion</p>
            <p>{t("text.email")}yoannguion[@]ik.me</p>
            <p>
              {t("text.website")}
              <a
                href="https://yoannguion.com/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://yoannguion.com/
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.hosting")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>Vercel Inc.</p>
            <p>440 N Barranca Avenue #4133</p>
            <p>Covina, CA 91723</p>
            <p>États-Unis</p>
            <p>
              {t("text.hostingWebsite")}
              <a
                href="https://vercel.com"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.liability")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.liability")}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.data")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.data")}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.cookies")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.cookies")}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.propertie")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.propertie")}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t("title.law")}</h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.law")}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            {t("title.lastUpdate")}
          </h2>
          <div className="pl-4 border-l-2 border-primary/20">
            <p>{t("text.lastUpdate", { date: formattedDate })}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
