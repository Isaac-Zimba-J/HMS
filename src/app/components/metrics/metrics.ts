import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

interface Metric {
  value: number; suffix: string; label: string;
  decimals: number; display: string; bar: number;
}

@Component({
  selector: 'app-metrics',
  standalone: true,
  template: `
    <div class="metrics">
      @for (m of metrics; track m.label) {
        <div class="metric fade-up"
             [attr.data-value]="m.value"
             [attr.data-suffix]="m.suffix"
             [attr.data-decimals]="m.decimals">
          <div class="pulse-rings">
            <div class="ring r1"></div>
            <div class="ring r2"></div>
            <div class="ring r3"></div>
          </div>
          <span class="metric-num">{{ m.display }}</span>
          <span class="metric-label">{{ m.label }}</span>
          <div class="metric-bar-wrap">
            <div class="metric-bar" [attr.data-pct]="m.bar"></div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .metrics {
      position: relative; z-index: 1;
      display: flex; flex-wrap: wrap;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      background: rgba(11, 20, 34, 0.65);
      backdrop-filter: blur(8px);
    }

    .metric {
      flex: 1; min-width: 160px;
      padding: 44px 40px 36px;
      border-right: 1px solid var(--border);
      text-align: center;
      position: relative;
      overflow: hidden;
      cursor: default;
    }
    .metric::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--cyan-dim), transparent 60%);
      opacity: 0; transition: opacity 0.3s;
    }
    .metric:hover::before { opacity: 1; }
    .metric:last-child { border-right: none; }

    /* Pulsing rings behind number */
    .pulse-rings {
      position: absolute;
      top: 44px; left: 50%;
      transform: translateX(-50%);
      width: 60px; height: 60px;
      pointer-events: none;
    }
    .ring {
      position: absolute; inset: 0;
      border: 1px solid var(--cyan);
      border-radius: 50%;
      opacity: 0;
      animation: pulse-ring 3s ease-out infinite;
    }
    .r2 { animation-delay: 1s; }
    .r3 { animation-delay: 2s; }

    .metric-num {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 2.6rem;
      color: var(--cyan);
      display: block;
      line-height: 1;
      margin-bottom: 8px;
      position: relative;
      text-shadow: 0 0 20px rgba(0,220,200,0.4);
    }

    .metric-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      position: relative;
      display: block;
      margin-bottom: 16px;
    }

    /* Animated progress bar */
    .metric-bar-wrap {
      position: relative;
      height: 2px;
      background: rgba(255,255,255,0.06);
      border-radius: 1px;
      overflow: hidden;
      margin: 0 auto;
      max-width: 80px;
    }
    .metric-bar {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, var(--cyan), var(--blue));
      border-radius: 1px;
      transition: width 1.8s cubic-bezier(0.25, 1, 0.5, 1);
      box-shadow: 0 0 8px var(--cyan-glow);
    }
    .metric-bar::after {
      content: '';
      position: absolute;
      right: 0; top: -1px;
      width: 4px; height: 4px;
      background: var(--cyan);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--cyan);
    }

    @media (max-width: 480px) {
      .metric { flex: 1 1 50%; padding: 32px 16px 24px; }
      .metric:nth-child(2n) { border-right: none; }
    }
  `]
})
export class Metrics implements AfterViewInit {
  private el = inject(ElementRef);

  metrics: Metric[] = [
    { value: 200,   suffix: '+',  label: 'Projects Delivered',  decimals: 0, display: '0+',   bar: 85 },
    { value: 99.97, suffix: '%',  label: 'Uptime Guaranteed',   decimals: 2, display: '0%',   bar: 100 },
    { value: 12,    suffix: ' yr',label: 'Industry Experience', decimals: 0, display: '0 yr', bar: 60 },
    { value: 48,    suffix: '',   label: 'Countries Served',    decimals: 0, display: '0',    bar: 75 },
  ];

  ngAfterViewInit() {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const parent = el.closest('.metric') as HTMLElement;
        const value   = parseFloat(parent.dataset['value']   ?? '0');
        const suffix  = parent.dataset['suffix']  ?? '';
        const decimals = parseInt(parent.dataset['decimals'] ?? '0');
        this.animCount(el, value, suffix, decimals);

        // Animate progress bar
        const bar = parent.querySelector('.metric-bar') as HTMLElement | null;
        const pct = parseFloat(bar?.dataset['pct'] ?? '0');
        if (bar) setTimeout(() => { bar.style.width = pct + '%'; }, 200);

        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    this.el.nativeElement.querySelectorAll('.fade-up').forEach((e: Element) => fadeObs.observe(e));
    this.el.nativeElement.querySelectorAll('.metric-num').forEach((e: Element) => counterObs.observe(e));
  }

  private animCount(el: HTMLElement, target: number, suffix: string, decimals: number) {
    let start: number | null = null;
    const dur = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (decimals > 0 ? (target * eased).toFixed(decimals) : Math.round(target * eased).toString()) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
