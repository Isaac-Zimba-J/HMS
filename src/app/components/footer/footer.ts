import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="nav-logo" href="#">
              <span class="logo-prefix">//</span> HMS Technologies
            </a>
            <p>
              Pioneer in the Next-Gen Technologies — building digital infrastructure
              for forward-thinking organisations across Africa and beyond.
            </p>
          </div>

          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Cloud Infrastructure</a></li>
              <li><a href="#services">Cybersecurity</a></li>
              <li><a href="#services">Custom Software</a></li>
              <li><a href="#services">Network Engineering</a></li>
              <li><a href="#services">AI &amp; Automation</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@hms.tech">hello&#64;hms.tech</a></li>
              <li><a href="tel:+260971234567">+260 97 123 4567</a></li>
              <li><a href="#">CBU Riverside Campus, Lusaka</a></li>
              <li><a href="#">Support Portal</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 HMS Technologies. All rights reserved.</p>
          <div class="footer-socials">
            <a href="#" class="social-icon" title="LinkedIn">in</a>
            <a href="#" class="social-icon" title="GitHub">gh</a>
            <a href="#" class="social-icon" title="Twitter / X">𝕏</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      position: relative;
      z-index: 1;
      background: var(--surface);
      border-top: 1px solid var(--border);
    }

    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 5% 40px;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 50px;
    }

    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      color: var(--white);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .logo-prefix {
      color: var(--cyan);
      font-family: 'IBM Plex Mono', monospace;
    }

    .footer-brand p {
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.7;
      max-width: 240px;
    }

    .footer-col h4 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 18px;
      color: var(--white);
    }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 10px; }
    .footer-col a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.88rem;
      transition: color 0.2s;
    }
    .footer-col a:hover { color: var(--cyan); }

    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-bottom p {
      font-size: 0.78rem;
      color: var(--muted);
      font-family: 'IBM Plex Mono', monospace;
    }

    .footer-socials { display: flex; gap: 16px; }
    .social-icon {
      width: 34px; height: 34px;
      border: 1px solid var(--border);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      color: var(--muted);
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .social-icon:hover {
      border-color: var(--cyan);
      color: var(--cyan);
      box-shadow: 0 0 12px var(--cyan-glow);
    }

    @media (max-width: 768px) {
      .footer-top { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .footer-top { grid-template-columns: 1fr; }
    }
  `]
})
export class Footer {}
