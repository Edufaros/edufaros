"use client";

import type { ClientLogo } from "@/data/clients";

type Props = {
  logos: ClientLogo[];
};

export default function ClientLogoMarquee({ logos }: Props) {
  return (
    <div
      className="ef-partner-marquee"
      role="region"
      aria-label="Companies and professionals EduFaros has worked with"
      tabIndex={0}
    >
      <div className="ef-partner-marquee__track">
        {[0, 1].map((copy) => (
          <div
            className="ef-partner-marquee__group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {logos.map((logo) => (
              <div className="ef-partner-marquee__item" key={logo.name}>
                <img
                  src={logo.src}
                  alt={copy === 0 ? logo.name : ""}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
