import Image from "next/image";

const logos = [
  { name: "LinkedIn Coach", src: "/logos/linkedin-coach.svg" },
  { name: "Creative Agency", src: "/logos/creative-agency.svg" },
  { name: "Azan Overseas", src: "/logos/azan-overseas.svg" },
  { name: "Azan Enterprises", src: "/logos/azan-enterprises.svg" },
  { name: "D-Naaz International", src: "/logos/d-naaz-international.svg" },
  { name: "Synergy Career Consultant", src: "/logos/synergy-career-consultant.svg" },
  { name: "Paika", src: "/logos/paika.svg" },
];

export function ClientLogoMarquee() {
  return (
    <section className="partner-marquee-section" aria-labelledby="partner-marquee-title">
      <div className="partner-marquee-band">
        <div className="partner-marquee-band__heading">
          <h2 className="partner-marquee-band__title" id="partner-marquee-title">
            Education companies &amp; professionals we&apos;ve worked with
          </h2>
        </div>
        <div
          className="ef-partner-marquee"
          role="region"
          aria-label="Education companies and professionals EduFaros has worked with"
          tabIndex={0}
        >
          <div className="ef-partner-marquee__track">
            {[0, 1].map((copy) => (
              <div
                className="ef-partner-marquee__group"
                key={copy}
                aria-hidden={copy === 1}
              >
                {logos.map((logo) => (
                  <div className="ef-partner-marquee__item" key={logo.name}>
                    <Image
                      src={logo.src}
                      alt={copy === 0 ? logo.name : ""}
                      width={176}
                      height={82}
                      sizes="(max-width: 680px) 146px, 176px"
                      unoptimized
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
