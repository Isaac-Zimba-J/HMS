import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  template: `
    <section id="contact" class="cta-section">
      <div class="section-inner">
        <span class="section-tag fade-up">// Let's Work Together</span>
        <h2 class="fade-up">Ready to Build<br>Something Exceptional?</h2>
        <p class="fade-up">
          Tell us about your challenge. We'll respond within one business day
          with a practical plan of action — not a sales pitch.
        </p>
        <div class="cta-actions fade-up">
          <a href="mailto:hello@hms.tech" class="btn-primary">Send Us a Brief</a>
          <a href="tel:+260971234567" class="btn-outline">Schedule a Call</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      background: linear-gradient(135deg, var(--panel), var(--surface));
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .cta-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(0,220,200,0.08), transparent 70%);
      pointer-events: none;
    }
    .cta-section::after {
      content: '';
      position: absolute;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(5,117,230,0.06), transparent 70%);
      top: -200px; right: -100px;
      pointer-events: none;
    }

    .section-inner { position: relative; z-index: 1; }

    h2 { font-size: clamp(2rem, 5vw, 3.5rem); }

    p {
      color: var(--muted);
      max-width: 480px;
      margin: 0 auto 40px;
      font-size: 1rem;
      line-height: 1.75;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class Cta implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    this.el.nativeElement.querySelectorAll('.fade-up').forEach((e: Element) => obs.observe(e));
  }
}
