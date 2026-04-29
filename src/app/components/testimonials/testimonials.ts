import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

interface Testimonial { quote: string; initials: string; name: string; role: string; }

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section id="testimonials">
      <div class="section-inner">
        <span class="section-tag fade-up">// Client Feedback</span>
        <h2 class="fade-up">What Our Clients<br>Actually Say</h2>
        <div class="testimonials-grid">
          @for (t of testimonials; track t.name) {
            <div class="testimonial fade-up">
              <p>{{ t.quote }}</p>
              <div class="t-author">
                <div class="t-avatar">{{ t.initials }}</div>
                <div>
                  <div class="t-name">{{ t.name }}</div>
                  <div class="t-role">{{ t.role }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .testimonial {
      background: var(--panel);
      border: 1px solid var(--border);
      padding: 36px;
      border-radius: 2px;
      position: relative;
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .testimonial::before {
      content: '"';
      position: absolute;
      top: 16px; left: 30px;
      font-family: 'Syne', sans-serif;
      font-size: 5rem;
      color: var(--cyan);
      opacity: 0.15;
      line-height: 1;
    }
    .testimonial:hover {
      border-color: rgba(0,220,200,0.3);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(0,220,200,0.1);
      transform: translateY(-4px);
    }

    p {
      font-size: 0.95rem;
      line-height: 1.75;
      color: var(--white);
      margin-bottom: 24px;
      position: relative;
    }

    .t-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .t-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--cyan));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--bg);
      flex-shrink: 0;
    }

    .t-name {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
    }
    .t-role { font-size: 0.78rem; color: var(--muted); }
  `]
})
export class Testimonials implements AfterViewInit {
  private el = inject(ElementRef);

  testimonials: Testimonial[] = [
    { quote: 'HMS Technologies migrated our entire data centre to the cloud in under 8 weeks with zero downtime. The planning and execution were genuinely impressive.', initials: 'MK', name: 'Martha Kimani', role: 'CTO, Horizon Logistics' },
    { quote: 'After a ransomware incident, HMS rebuilt our security posture from the ground up. We passed our ISO 27001 audit six months later.', initials: 'JO', name: 'James Okonkwo', role: 'Head of IT, First Continental Bank' },
    { quote: 'The custom ERP integration saved our team 200+ hours per month. ROI was positive within the first quarter of deployment.', initials: 'SN', name: 'Sara Ndlovu', role: 'Operations Director, AgriFin Group' },
  ];

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
