import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <div class="progress-bar" [style.width.%]="scrollProgress()"></div>

    <nav [class.scrolled]="isScrolled()">
      <a class="nav-logo" href="#">
        <span class="logo-prefix">//</span> HMS Technologies
      </a>

      <ul class="nav-links" [class.open]="menuOpen()">
        <li><a href="#services" (click)="close()">Services</a></li>
        <li><a href="#process" (click)="close()">Process</a></li>
        <li><a href="#stack" (click)="close()">Technology</a></li>
        <li><a href="#testimonials" (click)="close()">Clients</a></li>
        <li><a href="#contact" class="btn-nav" (click)="close()">Get Started</a></li>
      </ul>

      <button class="hamburger" [class.active]="menuOpen()" (click)="toggle()" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="overlay" [class.visible]="menuOpen()" (click)="close()"></div>
  `,
  styles: [`
    .progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--cyan), var(--blue));
      z-index: 200;
      transition: width 0.08s linear;
      box-shadow: 0 0 10px var(--cyan-glow);
    }

    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5%;
      height: 72px;
      background: rgba(5, 10, 18, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      transition: background 0.2s ease;
    }

    nav.scrolled {
      background: rgba(5, 10, 18, 0.97);
    }

    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.3rem;
      letter-spacing: -0.02em;
      color: var(--white);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 101;
    }

    .logo-prefix {
      color: var(--cyan);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 1.1rem;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
    }

    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.88rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      transition: color 0.2s;
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 1px;
      background: var(--cyan);
      transition: width 0.2s ease;
    }

    .nav-links a:hover { color: var(--white); }
    .nav-links a:hover::after { width: 100%; }

    .btn-nav {
      background: var(--cyan) !important;
      color: var(--bg) !important;
      padding: 8px 20px !important;
      border-radius: 4px !important;
      font-weight: 600 !important;
      letter-spacing: 0.02em !important;
      transition: box-shadow 0.2s, opacity 0.2s !important;
    }
    .btn-nav::after { display: none !important; }
    .btn-nav:hover {
      box-shadow: 0 0 20px var(--cyan-glow) !important;
      opacity: 0.9 !important;
      color: var(--bg) !important;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      z-index: 101;
    }
    .hamburger span {
      display: block;
      width: 24px; height: 2px;
      background: var(--white);
      border-radius: 2px;
      transition: transform 0.3s, opacity 0.3s;
    }
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(5, 10, 18, 0.7);
      z-index: 98;
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .overlay.visible { opacity: 1; }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .overlay { display: block; }

      .nav-links {
        position: fixed;
        top: 0; right: 0; bottom: 0;
        width: 280px;
        background: var(--surface);
        border-left: 1px solid var(--border);
        flex-direction: column;
        align-items: flex-start;
        padding: 100px 32px 40px;
        gap: 28px;
        z-index: 99;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      }
      .nav-links.open { transform: translateX(0); }
      .nav-links a { font-size: 1.05rem; }
    }
  `]
})
export class Navbar {
  isScrolled = signal(false);
  menuOpen = signal(false);
  scrollProgress = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 40);
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }

  toggle() { this.menuOpen.update(v => !v); }
  close() { this.menuOpen.set(false); }
}
