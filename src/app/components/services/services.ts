import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { LucideAngularModule, LucideIconData, Cloud, Lock, Code, Network, Bot, Wrench } from 'lucide-angular';

interface Service { icon: LucideIconData; title: string; desc: string; bullets: string[]; }

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <section id="services">
      <div class="section-inner">
        <span class="section-tag fade-up">// What We Do</span>
        <h2 class="fade-up text-shimmer">Enterprise-Grade<br>IT Services</h2>
        <p class="section-sub fade-up">
          From the ground up, we architect, deploy, and secure digital systems
          that scale with your business.
        </p>
        <div class="services-grid">
          @for (s of services; track s.title) {
            <div class="service-card fade-up">
              <div class="card-inner">

                <!-- Front face -->
                <div class="card-front">
                  <div class="glow-border"></div>
                  <div class="scan-line"></div>
                  <div class="service-icon">
                    <lucide-icon [img]="s.icon" [size]="22" [strokeWidth]="1.5"></lucide-icon>
                  </div>
                  <h3>{{ s.title }}</h3>
                  <p>{{ s.desc }}</p>
                  <span class="flip-hint">hover to explore →</span>
                </div>

                <!-- Back face -->
                <div class="card-back">
                  <div class="back-icon">
                    <lucide-icon [img]="s.icon" [size]="32" [strokeWidth]="1.5"></lucide-icon>
                  </div>
                  <h3>{{ s.title }}</h3>
                  <ul>
                    @for (b of s.bullets; track b) {
                      <li><span class="bullet-dot"></span>{{ b }}</li>
                    }
                  </ul>
                  <a href="#contact" class="service-link">
                    Start a project <span class="arrow">→</span>
                  </a>
                </div>

              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
    }

    /* Perspective container — stays as grid cell */
    .service-card {
      background: var(--bg);
      height: 320px;
      perspective: 1100px;
      cursor: default;
    }

    /* Flip wrapper */
    .card-inner {
      position: relative;
      width: 100%; height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .service-card:hover .card-inner { transform: rotateY(180deg); }

    /* Shared face styles */
    .card-front, .card-back {
      position: absolute;
      inset: 0;
      padding: 36px 32px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
    }

    /* ── Front ── */
    .card-front {
      background: var(--surface);
    }
    .card-front::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--cyan-dim), transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    .service-card:hover .card-front::after { opacity: 1; }

    .glow-border {
      position: absolute; inset: 0;
      border: 1px solid transparent;
      pointer-events: none;
      z-index: 5;
      opacity: 0;
      transition: opacity 0.3s;
      background: linear-gradient(var(--surface), var(--surface)) padding-box,
                  conic-gradient(from var(--angle, 0deg), var(--cyan), var(--blue), var(--cyan)) border-box;
    }
    .service-card:hover .glow-border {
      opacity: 1;
      animation: border-spin 3s linear infinite;
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes border-spin { to { --angle: 360deg; } }

    .scan-line {
      position: absolute; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
      opacity: 0;
      pointer-events: none;
      z-index: 10;
    }
    .service-card:hover .scan-line {
      opacity: 0.6;
      animation: scan-down 1.5s ease-in-out infinite;
    }
    @keyframes scan-down { 0%{top:-2%} 100%{top:102%} }

    .service-icon {
      width: 48px; height: 48px;
      border: 1px solid var(--border);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
      position: relative; z-index: 1;
      background: var(--bg);
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
      color: var(--muted);
    }
    .service-card:hover .service-icon {
      border-color: var(--cyan);
      box-shadow: 0 0 20px var(--cyan-glow);
      transform: scale(1.08) rotate(-3deg);
      color: var(--cyan);
    }

    .card-front h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      margin-bottom: 10px;
      position: relative; z-index: 1;
      transition: color 0.2s;
    }
    .service-card:hover .card-front h3 { color: var(--cyan); }

    .card-front p {
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.65;
      position: relative; z-index: 1;
    }

    .flip-hint {
      position: absolute;
      bottom: 18px; right: 20px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.62rem;
      color: rgba(0,220,200,0.35);
      letter-spacing: 0.04em;
      transition: color 0.3s;
    }
    .service-card:hover .flip-hint { color: rgba(0,220,200,0.6); }

    /* ── Back ── */
    .card-back {
      transform: rotateY(180deg);
      background: var(--panel);
      border: 1px solid rgba(0,220,200,0.18);
      display: flex;
      flex-direction: column;
    }

    .back-icon {
      margin-bottom: 12px;
      color: var(--cyan);
      opacity: 0.85;
    }

    .card-back h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      color: var(--cyan);
      margin-bottom: 14px;
    }

    .card-back ul {
      list-style: none;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-back li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--white);
      opacity: 0.88;
    }
    .bullet-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: var(--cyan);
      flex-shrink: 0;
      box-shadow: 0 0 6px var(--cyan-glow);
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--cyan);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      text-decoration: none;
      margin-top: 16px;
      letter-spacing: 0.04em;
      border: 1px solid rgba(0,220,200,0.25);
      padding: 7px 14px;
      border-radius: 3px;
      transition: background 0.2s, border-color 0.2s;
      align-self: flex-start;
    }
    .service-link:hover {
      background: var(--cyan-dim);
      border-color: var(--cyan);
    }
    .arrow { transition: transform 0.2s; display: inline-block; }
    .service-link:hover .arrow { transform: translateX(4px); }
  `]
})
export class Services implements AfterViewInit {
  private el = inject(ElementRef);

  services: Service[] = [
    {
      icon: Cloud, title: 'Cloud Infrastructure',
      desc: 'Multi-cloud architecture design, migration, and ongoing management across AWS, Azure, and GCP. Built for performance and cost efficiency.',
      bullets: ['Multi-cloud migration', 'IaC with Terraform', 'Cost optimisation', '99.99% SLA design'],
    },
    {
      icon: Lock, title: 'Cybersecurity',
      desc: 'Penetration testing, SOC-as-a-service, SIEM implementation, and compliance frameworks. Your data, locked down.',
      bullets: ['VAPT assessments', 'SOC-as-a-service', 'ISO 27001 advisory', 'Incident response'],
    },
    {
      icon: Code, title: 'Custom Software',
      desc: 'Bespoke applications built with modern stacks. APIs, SaaS platforms, internal tooling — designed to solve real operational problems.',
      bullets: ['API & SaaS platforms', 'Agile sprint delivery', 'CI/CD pipelines', 'Scalable architecture'],
    },
    {
      icon: Network, title: 'Network Engineering',
      desc: 'Enterprise LAN/WAN, SD-WAN, VPN, and wireless infrastructure. Designed for reliability, security, and future-proofing.',
      bullets: ['SD-WAN & VPN design', 'Cisco & Palo Alto', 'Network segmentation', 'Wireless site surveys'],
    },
    {
      icon: Bot, title: 'AI & Automation',
      desc: 'Workflow automation, ML pipelines, and AI integrations that eliminate bottlenecks and surface actionable intelligence.',
      bullets: ['ML model deployment', 'RPA workflows', 'Data pipelines', 'LLM integrations'],
    },
    {
      icon: Wrench, title: 'Managed IT Support',
      desc: '24/7 helpdesk, proactive monitoring, patch management, and on-site support. Technology that just works.',
      bullets: ['24/7 monitoring', 'Patch management', 'On-site engineers', 'SLA-backed response'],
    },
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
    this.el.nativeElement.querySelectorAll('.fade-up').forEach((e: Element) => fadeObs.observe(e));
  }
}
