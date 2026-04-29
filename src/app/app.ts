import { Component, HostListener } from '@angular/core';
import { Navbar }       from './components/navbar/navbar';
import { Hero }         from './components/hero/hero';
import { Metrics }      from './components/metrics/metrics';
import { Services }     from './components/services/services';
import { Process }      from './components/process/process';
import { TechStack }    from './components/tech-stack/tech-stack';
import { Testimonials } from './components/testimonials/testimonials';
import { Cta }          from './components/cta/cta';
import { Footer }       from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, Metrics, Services, Process, TechStack, Testimonials, Cta, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private dotX = 0;
  private dotY = 0;
  private ringX = 0;
  private ringY = 0;
  private rafId = 0;

  constructor() {
    // Kick off the ring lerp loop after first render
    requestAnimationFrame(() => this.lerpRing());
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.dotX = e.clientX;
    this.dotY = e.clientY;
    const dot = document.querySelector('.cursor-dot') as HTMLElement | null;
    if (dot) {
      dot.style.left = this.dotX + 'px';
      dot.style.top  = this.dotY + 'px';
    }
  }

  private lerpRing() {
    this.ringX += (this.dotX - this.ringX) * 0.12;
    this.ringY += (this.dotY - this.ringY) * 0.12;
    const ring = document.querySelector('.cursor-ring') as HTMLElement | null;
    if (ring) {
      ring.style.left = this.ringX + 'px';
      ring.style.top  = this.ringY + 'px';
    }
    this.rafId = requestAnimationFrame(() => this.lerpRing());
  }
}
