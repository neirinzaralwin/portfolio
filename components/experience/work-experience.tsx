"use client";

import { FadeIn } from "@/components/ui/transition";
import { SectionTitle } from "@/components/ui/section-title";
import { BRAND_GRADIENT_CLASSES } from "@/lib/brand";
import styles from "./work-experience.module.css";

const colors = BRAND_GRADIENT_CLASSES;

const timelineItems = [
  {
    date: "Dec 2024 — Feb 2026",
    title: "Senior Mobile & Full-Stack Developer",
    company: "Flying Rocket Co., Ltd.",
    companyUrl: undefined as string | undefined,
    description:
      "Built consumer marketplace and hospitality products end-to-end — auctions, payments, boutique workflows, hotel PMS, channel manager sync, and SCB Thai QR payments.",
    colorIndex: 0,
  },
  {
    date: "2022 — 2024",
    title: "Senior Mobile & Backend Developer",
    company: "GoldSilver Central",
    companyUrl: "https://www.goldsilvercentral.com.sg",
    description:
      "Led mobile and backend work on a Singapore bullion trading platform — gold-saving wallets, token exchange, multi-wallet support, market charts, chat, and TensorFlow image classification.",
    colorIndex: 1,
  },
  {
    date: "2021 — 2022",
    title: "Senior Mobile Developer",
    company: "App.com.mm",
    companyUrl: "https://app.com.mm/",
    description:
      "Shipped consumer apps across e-commerce, education, food, and travel for the Myanmar market, and helped scale the engineering team from 5 to 100 people.",
    colorIndex: 2,
  },
  {
    date: "2020 — 2021",
    title: "Junior Mobile Developer",
    company: "Tech Plus Solution",
    companyUrl: "https://techplussolution.com/",
    description:
      "Built early-career mobile products for retail and POS, including a lightweight point-of-sale system, native Fortune app migration, and color-based inventory management.",
    colorIndex: 0,
  },
  {
    date: "",
    title: "Bachelor of Computer Science",
    company: undefined as string | undefined,
    companyUrl: undefined as string | undefined,
    description: undefined as string | undefined,
    colorIndex: 3,
  },
];

export default function WorkExperience() {
  return (
    <div
      id="experience"
      className={`${styles.page_wrapper} w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-20 py-12 md:py-20`}
    >
      <SectionTitle light="Career" emphasis="Timeline" />

      <div className={styles.section_timeline}>
        <div className={styles.container}>
          <div className={styles.timeline_component}>
            <div className={styles.timeline_progress} />

            {timelineItems.map((item) => (
              <FadeIn key={`${item.date}-${item.title}`} className="w-full">
                <div className={styles.timeline_item}>
                  <div className={styles.timeline_left}>
                    <div
                      className={`${styles.timeline_date_text} ${colors[item.colorIndex]} bg-clip-text text-transparent`}
                    >
                      {item.date}
                    </div>
                  </div>
                  <div className={styles.timeline_centre}>
                    <div
                      className={`${styles.timeline_circle} ${colors[item.colorIndex]}`}
                    />
                  </div>
                  <div className={styles.timeline_right}>
                    <div className={styles.margin_bottom_medium}>
                      <div className={styles.timeline_text}>{item.title}</div>
                    </div>
                    {item.company && (
                      <div className={styles.margin_bottom_medium}>
                        <div className={styles.inline_block}>
                          {item.companyUrl ? (
                            <a
                              href={item.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${styles.timeline_link} ${styles.inline_block}`}
                            >
                              {item.company}
                            </a>
                          ) : (
                            <span className={styles.timeline_link}>
                              {item.company}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {item.description && (
                      <div className={styles.margin_bottom_xlarge}>
                        <p className={styles.text_colour_lightgrey}>
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}

            <div className={styles.overlay_fade_top} />
            <div className={styles.overlay_fade_bottom} />
          </div>
        </div>
      </div>
    </div>
  );
}
