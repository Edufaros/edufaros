"use client";

import MagicBook from "./magic-book";

export function HeroBookVisual() {
  return (
    <div className="hero-book-art" aria-label="An animated open book representing the EduFaros growth approach">
      <div className="hero-visual">
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
          <span className="node-label">BUILD</span>
          <strong>Build what is needed</strong>
        </div>
        <div className="hero-node hero-node-scale">
          <span className="node-indicator blue" />
          <span className="node-label">IMPROVE</span>
          <strong>Learn from evidence</strong>
        </div>

        <div className="visual-caption">
          <span className="caption-pulse" aria-hidden="true" />
          <span>One connected growth system</span>
        </div>
      </div>
    </div>
  );
}
