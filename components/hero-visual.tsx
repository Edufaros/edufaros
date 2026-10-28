"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GrowthScene = dynamic(() => import("./growth-scene"), {
  ssr: false,
  loading: () => <div className="scene-fallback" aria-hidden="true" />
});

export default function HeroVisual() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-visual" aria-label="Illustration of connected education growth systems">
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-glow visual-glow-a" aria-hidden="true" />
      <div className="visual-glow visual-glow-b" aria-hidden="true" />

      {!reducedMotion ? (
        <GrowthScene />
      ) : (
        <div className="scene-fallback" aria-hidden="true">
          <div className="fallback-orbit fallback-orbit-one" />
          <div className="fallback-orbit fallback-orbit-two" />
          <div className="fallback-core">
            <span>EF</span>
          </div>
        </div>
      )}

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