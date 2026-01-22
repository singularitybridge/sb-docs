import React from 'react';
import { Sparkles } from 'lucide-react';
import styles from './Homepage.module.css';

export default function HomepageHero(): React.ReactElement {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          <span>Singularity Bridge</span>
        </div>
        <h1 className={styles.heroTitle}>
          The AI Operating System<br />
          <span className={styles.heroGradient}>for Modern Businesses</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Build teams of AI agents that work like employees — each with their own identity,
          workspace, and tools. Handle any task that can be done with a computer.
          Replace SaaS subscriptions. Scale without hiring.
        </p>
      </div>
    </header>
  );
}
