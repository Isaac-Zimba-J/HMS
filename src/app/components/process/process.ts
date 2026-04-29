import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-process',
  standalone: true,
  template: `
    <section id="process" class="process-bg">
      <div class="section-inner">
        <span class="section-tag fade-up">// How We Work</span>
        <h2 class="fade-up text-shimmer">A Proven Delivery<br>Framework</h2>
        <p class="section-sub fade-up">
          Every engagement follows a structured methodology that eliminates
          guesswork and maximizes outcomes.
        </p>

        <div class="process-steps">
          <!-- Animated connector line -->
          <div class="connector-line">
            <div class="connector-inner"></div>
          </div>

          @for (step of steps; track step.num; let i = $index) {
            <div class="step fade-up">
              <div class="step-num">
                <div class="step-dot">
                  <div class="dot-core"></div>
                  <div class="dot-ring"></div>
                </div>
                {{ step.num }}
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .process-bg { background: var(--surface); }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      position: relative;
    }

    /* Connector line — draws in on scroll */
    .connector-line {
      position: absolute;
      top: 10px; left: 0; right: 0;
      height: 1px;
      background: rgba(0,220,200,0.08);
      overflow: hidden;
    }
    .connector-inner {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, var(--cyan), var(--blue), var(--cyan));
      background-size: 200% 100%;
      opacity: 0.5;
      transition: width 2.2s cubic-bezier(0.25, 1, 0.5, 1);
      animation: line-shimmer 3s linear infinite;
    }
    .connector-inner.drawn { width: 100%; }
    @keyframes line-shimmer {
      0%  { background-position: 0% 0%; }
      100%{ background-position: 200% 0%; }
    }

    .step { padding: 0 32px 0 0; position: relative; }

    .step-num {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.7rem;
      color: var(--cyan);
      letter-spacing: 0.1em;
      margin-bottom: 24px;
      display: flex; align-items: center; gap: 12px;
    }

    .step-dot {
      position: relative;
      width: 10px; height: 10px;
      flex-shrink: 0;
    }
    .dot-core {
      position: absolute; inset: 0;
      border: 2px solid var(--cyan);
      border-radius: 50%;
      background: var(--surface);
      box-shadow: 0 0 8px var(--cyan-glow);
      transition: transform 0.3s, box-shadow 0.3s;
      z-index: 1;
    }
    .dot-ring {
      position: absolute;
      inset: -4px;
      border: 1px solid rgba(0,220,200,0.3);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
      animation: ring-pulse 2.5s ease-out infinite;
    }
    .step:hover .dot-core {
      transform: scale(1.5);
      box-shadow: 0 0 20px var(--cyan-glow);
      background: var(--cyan);
    }
    .step:hover .dot-ring { opacity: 1; }
    @keyframes ring-pulse {
      0%  { transform: scale(1);   opacity: 0.6; }
      100%{ transform: scale(2.5); opacity: 0; }
    }

    h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      margin-bottom: 10px;
      transition: color 0.2s;
    }
    .step:hover h3 { color: var(--cyan); }
    p { color: var(--muted); font-size: 0.88rem; line-height: 1.65; }

    @media (max-width: 768px) {
      .process-steps { grid-template-columns: 1fr; }
      .step { padding: 0 0 36px; }
      .connector-line { display: none; }
    }
  `]
})
export class Process implements AfterViewInit {
  private el = inject(ElementRef);

  steps = [
    { num: '01 / DISCOVER',  title: 'Deep Discovery',    desc: 'We audit your current infrastructure, map technical debt, and define clear success metrics before writing a single line of code.' },
    { num: '02 / ARCHITECT', title: 'System Design',     desc: 'Our engineers blueprint the full solution — infrastructure diagrams, data flows, security controls, and scalability models.' },
    { num: '03 / BUILD',     title: 'Agile Delivery',    desc: 'Sprint-based delivery with continuous stakeholder feedback loops. Working software every two weeks — no black-box development.' },
    { num: '04 / SUSTAIN',   title: 'Long-term Support', desc: 'Post-launch monitoring, iterative improvements, and dedicated support. We stay in the game after go-live.' },
  ];

  ngAfterViewInit() {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 120);
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    this.el.nativeElement.querySelectorAll('.fade-up').forEach((e: Element) => fadeObs.observe(e));

    // Draw the connector line when the section enters view
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const inner = this.el.nativeElement.querySelector('.connector-inner');
          if (inner) inner.classList.add('drawn');
          lineObs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    const steps = this.el.nativeElement.querySelector('.process-steps');
    if (steps) lineObs.observe(steps);
  }
}
