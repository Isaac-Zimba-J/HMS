import {
  Component, AfterViewInit, OnDestroy,
  ElementRef, HostListener, inject, signal,
} from '@angular/core';
import { Globe } from '../globe/globe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Globe],
  template: `
    <section class="hero">
      <!-- Ambient orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>

      <!-- Mouse spotlight -->
      <div class="spotlight" #spotlight></div>

      <!-- Canvas particles -->
      <canvas class="particle-canvas"></canvas>

      <!-- Wireframe globe -->
      <div class="globe-wrap" aria-hidden="true">
        <app-globe></app-globe>
      </div>

      <!-- Floating 3D cubes -->
      <div class="cubes" aria-hidden="true">
        <div class="cube-wrap" style="left:8%;animation-duration:18s;animation-delay:0s">
          <div class="cube s-sm"><div class="f"></div><div class="f bk"></div><div class="f l"></div><div class="f r"></div><div class="f tp"></div><div class="f bt"></div></div>
        </div>
        <div class="cube-wrap" style="left:22%;animation-duration:24s;animation-delay:3s">
          <div class="cube s-md"><div class="f"></div><div class="f bk"></div><div class="f l"></div><div class="f r"></div><div class="f tp"></div><div class="f bt"></div></div>
        </div>
        <div class="cube-wrap" style="left:38%;animation-duration:20s;animation-delay:7s">
          <div class="cube s-sm"><div class="f"></div><div class="f bk"></div><div class="f l"></div><div class="f r"></div><div class="f tp"></div><div class="f bt"></div></div>
        </div>
        <div class="cube-wrap" style="left:52%;animation-duration:28s;animation-delay:1s">
          <div class="cube s-lg"><div class="f"></div><div class="f bk"></div><div class="f l"></div><div class="f r"></div><div class="f tp"></div><div class="f bt"></div></div>
        </div>
        <div class="cube-wrap" style="left:15%;animation-duration:22s;animation-delay:11s">
          <div class="cube s-md"><div class="f"></div><div class="f bk"></div><div class="f l"></div><div class="f r"></div><div class="f tp"></div><div class="f bt"></div></div>
        </div>
      </div>

      <!-- Floating tech chips -->
      <div class="chips" aria-hidden="true">
        @for (chip of floatingChips; track chip.label) {
          <span class="chip" [style]="chip.style">{{ chip.label }}</span>
        }
      </div>

      <!-- Main content -->
      <div class="hero-content">
        <!-- Status badge -->
        <div class="hero-tag anim-in" style="animation-delay:0ms">
          <span class="blink-dot"></span>
          SYSTEM ONLINE — Accepting New Projects
        </div>

        <!-- Headline -->
        <h1 class="anim-in" style="animation-delay:80ms">
          Pioneer in the<br>
          <em>Next-Gen</em> Technologies
        </h1>

        <!-- Typewriter line -->
        <div class="typewriter-row anim-in" style="animation-delay:160ms">
          <span class="tw-label">Specialising in</span>
          <span class="tw-text">{{ typedText() }}</span><span class="tw-cursor" [class.blink]="cursorBlink()">|</span>
        </div>

        <!-- Sub -->
        <p class="hero-sub anim-in" style="animation-delay:240ms">
          HMS Technologies delivers end-to-end IT solutions — cloud architecture,
          cybersecurity, and custom software. We don't just solve problems;
          we engineer the future.
        </p>

        <!-- CTAs -->
        <div class="flex gap-4 flex-wrap anim-in" style="animation-delay:340ms">
          <a href="#contact" class="btn-primary">Start a Project</a>
          <a href="#services" class="btn-outline">View Services</a>
        </div>
      </div>

      <!-- Terminal widget -->
      <div class="hero-terminal anim-in" style="animation-delay:480ms">
        <div class="t-header">
          <div class="t-dot red"></div>
          <div class="t-dot yellow"></div>
          <div class="t-dot green"></div>
          <span class="t-title">hms&#64;nexcore:~$</span>
        </div>
        <div class="t-body">
          <div class="t-line"><span class="t-prompt">❯</span> <span class="t-cmd">system uptime</span></div>
          <div class="t-line t-out">✓ 99.97% availability · 12yr runtime</div>
          <div class="t-line"><span class="t-prompt">❯</span> <span class="t-cmd">projects --count</span></div>
          <div class="t-line t-out"><span class="t-hi">200+</span> delivered · <span class="t-hi">48</span> countries</div>
          <div class="t-line"><span class="t-prompt">❯</span> <span class="t-cmd">status --live</span></div>
          <div class="t-line t-green">● ACCEPTING NEW PROJECTS</div>
          <div class="t-line mt-1"><span class="t-prompt">❯</span> <span class="t-cursor-blink">_</span></div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="scroll-hint anim-in" style="animation-delay:700ms">
        <div class="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 120px 5% 80px;
      overflow: hidden;
      z-index: 1;
    }

    /* Orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(110px);
      pointer-events: none;
      will-change: transform;
    }
    .orb-1 {
      width: 650px; height: 650px;
      background: radial-gradient(circle, rgba(0,220,200,0.2), transparent 70%);
      top: -120px; right: -120px;
      animation: orb-drift 12s ease-in-out infinite alternate;
    }
    .orb-2 {
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(5,117,230,0.22), transparent 70%);
      bottom: 0; left: 8%;
      animation: orb-drift 16s ease-in-out infinite alternate-reverse;
    }
    .orb-3 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(255,77,109,0.08), transparent 70%);
      top: 60%; right: 30%;
      animation: orb-drift 20s ease-in-out infinite alternate;
    }
    @keyframes orb-drift {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(30px, 40px) scale(1.05); }
    }

    /* Mouse spotlight */
    .spotlight {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      transition: background 0.1s ease;
    }

    /* Particles */
    .particle-canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }


    /* Floating chips */
    .chips {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }
    .chip {
      position: absolute;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.63rem;
      color: rgba(0,220,200,0.55);
      border: 1px solid rgba(0,220,200,0.2);
      padding: 3px 9px;
      border-radius: 2px;
      background: rgba(0,220,200,0.04);
      animation: float-chip linear infinite;
      white-space: nowrap;
    }

    /* Hero content */
    .hero-content {
      max-width: 620px;
      position: relative;
      z-index: 2;
    }

    /* Status badge */
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.75rem;
      color: var(--cyan);
      border: 1px solid var(--border);
      padding: 5px 14px;
      border-radius: 2px;
      margin-bottom: 28px;
      letter-spacing: 0.06em;
      background: rgba(0,220,200,0.05);
    }
    .blink-dot {
      width: 6px; height: 6px;
      background: var(--cyan);
      border-radius: 50%;
      flex-shrink: 0;
      animation: blink 1.4s ease-in-out infinite;
      box-shadow: 0 0 8px var(--cyan);
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }

    /* Headline */
    h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2.8rem, 6vw, 5rem);
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }
    h1 em {
      font-style: normal;
      color: transparent;
      -webkit-text-stroke: 1.5px var(--cyan);
      position: relative;
    }

    /* Typewriter row */
    .typewriter-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 28px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.88rem;
    }
    .tw-label {
      color: var(--muted);
      flex-shrink: 0;
      letter-spacing: 0.02em;
    }
    .tw-text {
      color: var(--cyan);
      font-weight: 500;
      letter-spacing: 0.04em;
      min-width: 220px;
    }
    .tw-cursor {
      color: var(--cyan);
      font-weight: 300;
      font-size: 1.1rem;
    }
    .tw-cursor.blink { animation: cursor-blink 0.8s step-end infinite; }
    @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }

    .hero-sub {
      font-size: 1.05rem;
      color: var(--muted);
      max-width: 500px;
      margin-bottom: 44px;
      line-height: 1.75;
    }

    /* Load-in */
    .anim-in {
      opacity: 0;
      transform: translateY(24px);
      animation: slide-up 0.7s ease forwards;
    }
    @keyframes slide-up { to { opacity: 1; transform: translateY(0); } }

    /* Terminal widget */
    .hero-terminal {
      position: absolute;
      right: 7%; top: 50%;
      transform: translateY(-50%);
      width: 300px;
      background: rgba(11, 20, 34, 0.94);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      backdrop-filter: blur(20px);
      box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,220,200,0.06),
                  inset 0 1px 0 rgba(255,255,255,0.04);
      z-index: 2;
      animation: terminal-float 6s ease-in-out infinite;
    }
    @keyframes terminal-float {
      0%,100% { transform: translateY(-50%) translateY(0px); }
      50%      { transform: translateY(-50%) translateY(-10px); }
    }
    .t-header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: rgba(255,255,255,0.04);
      border-bottom: 1px solid var(--border);
    }
    .t-dot { width: 10px; height: 10px; border-radius: 50%; }
    .red    { background: #ff5f57; }
    .yellow { background: #febc2e; }
    .green  { background: #28c840; }
    .t-title {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.63rem;
      color: var(--muted);
      margin-left: 6px;
    }
    .t-body {
      padding: 14px 16px;
      display: flex; flex-direction: column; gap: 5px;
    }
    .t-line {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.7rem; line-height: 1.5;
      color: var(--muted);
    }
    .mt-1 { margin-top: 4px; }
    .t-prompt { color: var(--cyan); margin-right: 6px; }
    .t-cmd    { color: var(--white); }
    .t-out    { padding-left: 16px; color: #4a8fa8; }
    .t-hi     { color: var(--cyan); font-weight: 600; }
    .t-green  { padding-left: 16px; color: #28c840 !important; }
    .t-cursor-blink { color: var(--cyan); animation: cursor-blink 1s step-end infinite; }

    /* Scroll hint */
    .scroll-hint {
      position: absolute; bottom: 40px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      z-index: 2;
    }
    .scroll-line {
      width: 1px; height: 48px;
      background: linear-gradient(to bottom, var(--cyan), transparent);
      animation: scroll-pulse 2s ease-in-out infinite;
    }
    .scroll-hint span {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.58rem; letter-spacing: 0.16em; color: var(--muted);
    }
    @keyframes scroll-pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

    @media (max-width: 1100px) { .hero-terminal { display: none; } .globe-wrap { display: none; } }
    @media (max-width: 768px) {
      .hero { padding: 100px 5% 60px; }
      .scroll-hint { display: none; }
      .typewriter-row { flex-wrap: wrap; font-size: 0.78rem; }
      .tw-text { min-width: 160px; }
    }
  `]
})
export class Hero implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);

  typedText = signal('');
  cursorBlink = signal(true);

  floatingChips = [
    { label: 'Kubernetes', style: 'left:72%;bottom:10%;animation-duration:9s;animation-delay:0s' },
    { label: 'Terraform',  style: 'left:82%;bottom:5%;animation-duration:12s;animation-delay:2s' },
    { label: 'AWS',        style: 'left:68%;bottom:20%;animation-duration:8s;animation-delay:4s' },
    { label: 'Docker',     style: 'left:76%;bottom:30%;animation-duration:11s;animation-delay:1s' },
    { label: 'Python',     style: 'left:60%;bottom:8%;animation-duration:10s;animation-delay:3s' },
    { label: 'GCP',        style: 'left:88%;bottom:15%;animation-duration:7s;animation-delay:5s' },
    { label: 'Ansible',    style: 'left:64%;bottom:25%;animation-duration:13s;animation-delay:0.5s' },
    { label: 'Kafka',      style: 'left:79%;bottom:40%;animation-duration:9s;animation-delay:6s' },
  ];

  private readonly words = [
    'Cloud Infrastructure',
    'Cybersecurity',
    'AI & Automation',
    'Custom Software',
    'Network Engineering',
  ];
  private wordIdx = 0;
  private charIdx = 0;
  private deleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  private animId = 0;
  private particles: { x:number; y:number; vx:number; vy:number; size:number; opacity:number }[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    this.startTypewriter();
    this.initParticles();
  }

  ngOnDestroy() {
    if (this.typeTimer) clearTimeout(this.typeTimer);
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const section = this.el.nativeElement.querySelector('.hero') as HTMLElement;
    const spotlight = this.el.nativeElement.querySelector('.spotlight') as HTMLElement;
    if (!section || !spotlight) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(0,220,200,0.08), transparent 70%)`;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.canvas) return;
    this.canvas.width = this.el.nativeElement.offsetWidth;
    this.canvas.height = this.el.nativeElement.offsetHeight;
  }

  private startTypewriter() {
    const word = this.words[this.wordIdx];
    if (!this.deleting) {
      this.typedText.set(word.slice(0, this.charIdx + 1));
      this.charIdx++;
      if (this.charIdx === word.length) {
        this.deleting = true;
        this.typeTimer = setTimeout(() => this.startTypewriter(), 2400);
        return;
      }
    } else {
      this.typedText.set(word.slice(0, this.charIdx - 1));
      this.charIdx--;
      if (this.charIdx === 0) {
        this.deleting = false;
        this.wordIdx = (this.wordIdx + 1) % this.words.length;
      }
    }
    this.typeTimer = setTimeout(() => this.startTypewriter(), this.deleting ? 50 : 90);
  }

  private initParticles() {
    this.canvas = this.el.nativeElement.querySelector('.particle-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.el.nativeElement.offsetWidth;
    this.canvas.height = this.el.nativeElement.offsetHeight;
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.06,
      });
    }
    this.animateParticles();
  }

  private animateParticles() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0,220,200,${p.opacity})`;
      this.ctx.fill();
    }
    this.animId = requestAnimationFrame(() => this.animateParticles());
  }
}
