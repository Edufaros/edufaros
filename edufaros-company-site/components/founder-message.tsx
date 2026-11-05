import Image from "next/image";

export function FounderMessage() {
  return (
    <section className="founder-section" id="founder" aria-labelledby="founder-heading">
      <div className="founder-backdrop-grid" aria-hidden="true" />
      <div className="founder-backdrop-glow" aria-hidden="true" />
      <div className="container founder-layout">
        <div className="founder-copy">
          <p className="founder-eyebrow">
            <span className="founder-eyebrow-line" aria-hidden="true" />
            A message from our founder
          </p>
          <div className="founder-edition">
            <span>FOUNDER&apos;S NOTE</span>
            <span className="founder-edition-number">01 / EDUFAROS</span>
          </div>
          <h2 className="founder-heading" id="founder-heading">
            You build their future.
            <span>We help the right students find you.</span>
          </h2>
          <blockquote className="founder-quote">
            “A clear growth system starts with understanding where enquiries come from, what happens next, and what deserves attention.”
          </blockquote>
          <p className="founder-support">
            Education businesses should not have to guess where tomorrow’s enquiries will come from. We bring marketing, conversion and follow-up together—so growth becomes a system you can understand, improve and build on.
          </p>
          <div className="founder-principle">
            <span className="founder-principle-mark" aria-hidden="true">✳</span>
            <span>Strategy with purpose. Systems built to grow.</span>
          </div>
        </div>

        <div className="founder-portrait-column">
          <div className="founder-portrait-frame">
            <Image
              src="/faizan-ul-haque-v2.webp"
              alt="Faizan ul Haque, founder of EduFaros"
              width={280}
              height={341}
              sizes="(max-width: 680px) 280px, (max-width: 980px) 270px, 285px"
              className="founder-portrait-image"
              unoptimized
              priority={false}
            />
            <div className="founder-photo-wash" aria-hidden="true" />
            <div className="founder-portrait-topline">
              <span className="founder-photo-dot" aria-hidden="true" />
              <span>The person behind the system</span>
            </div>
            <div className="founder-portrait-index">EF / 001</div>
          </div>
          <div className="founder-signature">
            <span className="founder-signature-caption">A personal note from</span>
            <span className="founder-signature-name">Faizan ul Haque</span>
            <svg className="founder-signature-underline" viewBox="0 0 330 24" fill="none" aria-hidden="true">
              <path
                d="M4 16C48 4 74 20 119 13C158 7 192 4 228 11C264 18 297 13 326 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span className="founder-signature-role">FOUNDER, EDUFAROS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
