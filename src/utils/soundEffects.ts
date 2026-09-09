/**
 * Ambient Acoustic Feedback Engine (Web Audio API)
 * Lightweight, zero-dependency procedural harmonic sound effects.
 * Honors user preference with a global mute state.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Check localStorage preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_sound_enabled');
      this.enabled = saved === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.playSparkIgnite();
    }
    return this.enabled;
  }

  public setEnabled(value: boolean): void {
    this.enabled = value;
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_sound_enabled', String(value));
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Harmonic chime when a spark is ignited with energy
   */
  public playSparkIgnite(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  }

  /**
   * Intellectual reaction sound (Paradigm, Contrarian, Rigor, Moonshot)
   */
  public playReactionSound(type?: string): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    const baseFreq =
      type === 'paradigmShift' ? 659.25 : // E5
      type === 'contrarian' ? 440.0 :    // A4
      type === 'empiricalRigor' ? 587.33 : // D5
      880.0;                             // A5 (moonshot)

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  /**
   * Lineage branching sound when remixing an idea
   */
  public playRemixBranch(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    [440, 554.37, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.2);
    });
  }

  /**
   * Cross-pollination fusion sound when merging ideas
   */
  public playMergeFusion(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2); // E5
    osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.4); // B5

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }

  /**
   * Joining a sprint challenge
   */
  public playChallengeJoin(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + idx * 0.05 + 0.25);
    });
  }
}

export const soundEffects = new SoundEngine();
