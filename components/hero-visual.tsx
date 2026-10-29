"use client";

import dynamic from "next/dynamic";

const MagicBook = dynamic(() => import("./magic-book"), {
  ssr: false,
  loading: () => (
    <div className="scene-fallback book-scene-fallback" aria-hidden="true">
      <div className="fallback-book">
        <span className="fallback-page fallback-page-left" />
        <span className="fallback-page fallback-page-right" />
        <span className="fallback-spine" />
      </div>
    </div>
  )
});

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Illustration of connected education growth systems">
      <MagicBook />

      <div className="hero-node hero-node-acquire">
        <span className="node-indicator" />
        <span className="node-label">UNDERSTAND</span>
        <strong>Understand the journey</strong>
      </div>
      <div className="hero-node hero-node-convert">
        <span className="node-indicator blue" />
        <span className="node-label">PRIORITIZE</span>
        <strong>Choose the priority</strong>
      </div>
      <div className="hero-node hero-node-automate">
        <span className="node-indicator" />
        <span className="node-label">IMPLEMENT</span>
        <strong>Build what is needed</strong>
      </div>
      <div className="hero-node hero-node-scale">
        <span className="node-indicator blue" />
        <span className="node-label">IMPROVE</span>
        <strong>Learn from evidence</strong>
      </div>

      <div className="visual-coordinates" aria-hidden="true">
        <span>EDU / GROWTH SYSTEMS</span>
        <span>01 — 04 / CONNECTED</span>
      </div>
      <div className="visual-caption">
        <span className="caption-pulse" />
        <span>One connected growth system</span>
      </div>
    </div>
  );
}
