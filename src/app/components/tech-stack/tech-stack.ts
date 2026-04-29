import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import {
  LucideAngularModule, LucideIconData,
  Cloud, CloudCog, Globe, Settings, Blocks, Box, Bot, GitMerge,
  Terminal, Server, Atom, Database, Zap, Search, MessageSquare,
  Network, ShieldCheck, ChartBar, Flame, TrendingUp, Wind,
} from 'lucide-angular';

interface Tech { label: string; icon: LucideIconData; }

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <section id="stack" class="overflow-hidden">
      <div class="section-inner">
        <span class="section-tag fade-up">// Technology Stack</span>
        <h2 class="fade-up text-shimmer">Tools We Master</h2>
        <p class="section-sub fade-up">
          Technology-agnostic — we select the right tool for each challenge,
          not the most fashionable one.
        </p>
      </div>

      <!-- Marquee rows — full-bleed, outside section-inner -->
      <div class="marquee-section">
        <!-- Row 1: left scroll -->
        <div class="marquee-row">
          <div class="marquee-track left-track" (mouseenter)="pauseRow1()" (mouseleave)="resumeRow1()">
            @for (t of row1; track t.label + '-a') {
              <span class="m-tag">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
            @for (t of row1; track t.label + '-b') {
              <span class="m-tag">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
          </div>
        </div>

        <!-- Row 2: right scroll -->
        <div class="marquee-row">
          <div class="marquee-track right-track" (mouseenter)="pauseRow2()" (mouseleave)="resumeRow2()">
            @for (t of row2; track t.label + '-a') {
              <span class="m-tag">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
            @for (t of row2; track t.label + '-b') {
              <span class="m-tag">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
          </div>
        </div>

        <!-- Row 3: left scroll, fewer items -->
        <div class="marquee-row">
          <div class="marquee-track left-track slow" (mouseenter)="pauseRow3()" (mouseleave)="resumeRow3()">
            @for (t of row3; track t.label + '-a') {
              <span class="m-tag featured">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
            @for (t of row3; track t.label + '-b') {
              <span class="m-tag featured">
                <lucide-icon [img]="t.icon" [size]="13" [strokeWidth]="1.75"></lucide-icon>
                {{ t.label }}
              </span>
            }
          </div>
        </div>
      </div>

      <div class="section-inner pt-0">
        <div class="fade-up stack-note">
          <span class="note-dot"></span>
          Hover any row to pause · 23+ technologies in our active stack
        </div>
      </div>
    </section>
  `,
  styles: [`
    .marquee-section {
      padding: 20px 0 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
    }

    .marquee-row { overflow: hidden; }

    .marquee-track {
      display: flex;
      width: max-content;
      gap: 12px;
      padding: 4px 0;
    }

    .left-track  { animation: marquee-left  32s linear infinite; }
    .right-track { animation: marquee-right 28s linear infinite; }
    .slow        { animation-duration: 42s; }

    .marquee-track:hover,
    .marquee-track.paused { animation-play-state: paused; }

    .m-tag {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.78rem;
      padding: 8px 18px;
      border: 1px solid var(--border);
      border-radius: 3px;
      color: var(--muted);
      letter-spacing: 0.04em;
      white-space: nowrap;
      background: rgba(11, 20, 34, 0.8);
      transition: border-color 0.25s, color 0.25s, background 0.25s,
                  box-shadow 0.25s, transform 0.25s;
      cursor: default;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .m-tag:hover {
      border-color: var(--cyan);
      color: var(--cyan);
      background: var(--cyan-dim);
      box-shadow: 0 0 20px rgba(0,220,200,0.15);
      transform: translateY(-3px);
    }

    .m-tag.featured {
      border-color: rgba(0,220,200,0.25);
      color: rgba(0,220,200,0.7);
      background: rgba(0,220,200,0.05);
    }
    .m-tag.featured:hover {
      border-color: var(--cyan);
      color: var(--white);
      box-shadow: 0 0 28px rgba(0,220,200,0.25);
    }

    .pt-0 { padding-top: 20px !important; }

    .stack-note {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.68rem;
      color: var(--muted);
      letter-spacing: 0.06em;
    }
    .note-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--cyan);
      animation: blink 2s ease-in-out infinite;
      flex-shrink: 0;
      box-shadow: 0 0 6px var(--cyan);
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  `]
})
export class TechStack implements AfterViewInit {
  private el = inject(ElementRef);

  row1: Tech[] = [
    { label: 'AWS',            icon: Cloud      },
    { label: 'Azure',          icon: CloudCog   },
    { label: 'GCP',            icon: Globe      },
    { label: 'Kubernetes',     icon: Settings   },
    { label: 'Terraform',      icon: Blocks     },
    { label: 'Docker',         icon: Box        },
    { label: 'Ansible',        icon: Bot        },
    { label: 'GitHub Actions', icon: GitMerge   },
  ];

  row2: Tech[] = [
    { label: 'Python',        icon: Terminal      },
    { label: 'Node.js',       icon: Server        },
    { label: 'Angular',       icon: Zap           },
    { label: 'React',         icon: Atom          },
    { label: 'PostgreSQL',    icon: Database      },
    { label: 'Redis',         icon: Zap           },
    { label: 'Elasticsearch', icon: Search        },
    { label: 'Apache Kafka',  icon: MessageSquare },
  ];

  row3: Tech[] = [
    { label: 'Cisco',      icon: Network    },
    { label: 'Palo Alto',  icon: ShieldCheck },
    { label: 'Grafana',    icon: ChartBar   },
    { label: 'Prometheus', icon: Flame      },
    { label: 'Splunk',     icon: TrendingUp },
    { label: 'Spark',      icon: Zap        },
    { label: 'Airflow',    icon: Wind       },
  ];

  ngAfterViewInit() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    this.el.nativeElement.querySelectorAll('.fade-up').forEach((e: Element) => obs.observe(e));
  }

  pauseRow1()  { this.el.nativeElement.querySelectorAll('.left-track')[0]?.classList.add('paused'); }
  resumeRow1() { this.el.nativeElement.querySelectorAll('.left-track')[0]?.classList.remove('paused'); }
  pauseRow2()  { this.el.nativeElement.querySelector('.right-track')?.classList.add('paused'); }
  resumeRow2() { this.el.nativeElement.querySelector('.right-track')?.classList.remove('paused'); }
  pauseRow3()  { this.el.nativeElement.querySelector('.slow')?.classList.add('paused'); }
  resumeRow3() { this.el.nativeElement.querySelector('.slow')?.classList.remove('paused'); }
}
