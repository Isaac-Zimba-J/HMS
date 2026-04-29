import { Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-globe',
  standalone: true,
  template: `<canvas></canvas>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    canvas { display: block; width: 100%; height: 100%; }
  `]
})
export class Globe implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animId = 0;
  private rot = 0;

  private hotspots = [
    { lat: 51.5,  lon: -0.1   },
    { lat: 40.7,  lon: -74    },
    { lat: -26,   lon: 28     },
    { lat: 1.3,   lon: 103.8  },
    { lat: 35.7,  lon: 139.7  },
    { lat: -15.4, lon: 28.3   },
    { lat: 48.9,  lon: 2.3    },
    { lat: 37.8,  lon: -122.4 },
  ];

  ngAfterViewInit() {
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.animId = requestAnimationFrame(() => this.draw());
  }

  ngOnDestroy() { cancelAnimationFrame(this.animId); }

  private resize() {
    const host = this.el.nativeElement;
    this.canvas.width  = host.offsetWidth;
    this.canvas.height = host.offsetHeight;
  }

  private project(latDeg: number, lonDeg: number, r: number, cx: number, cy: number): [number, number, number] {
    const lat = latDeg * Math.PI / 180;
    const lon = (lonDeg + this.rot) * Math.PI / 180;
    const x = r * Math.cos(lat) * Math.sin(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.cos(lon);
    const fov = 600;
    const s = fov / (fov + z);
    return [cx + x * s, cy - y * s, z];
  }

  private draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.44;

    this.ctx.clearRect(0, 0, w, h);

    const lats = [-60, -30, 0, 30, 60];

    for (const lat of lats) {
      const steps = 80;
      for (let i = 0; i < steps; i++) {
        const [x1, y1, z1] = this.project(lat, (i / steps) * 360, r, cx, cy);
        const [x2, y2]     = this.project(lat, ((i + 1) / steps) * 360, r, cx, cy);
        const d = (z1 + r) / (2 * r);
        const a = lat === 0 ? d * 0.5 : d * 0.22;
        this.ctx.strokeStyle = `rgba(0,220,200,${a})`;
        this.ctx.lineWidth = lat === 0 ? 0.9 : 0.45;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      }
    }

    for (let lon = 0; lon < 360; lon += 20) {
      const steps = 40;
      for (let i = 0; i < steps; i++) {
        const lat1 = -80 + (i / steps) * 160;
        const lat2 = -80 + ((i + 1) / steps) * 160;
        const [x1, y1, z1] = this.project(lat1, lon, r, cx, cy);
        const [x2, y2]     = this.project(lat2, lon, r, cx, cy);
        const d = (z1 + r) / (2 * r);
        this.ctx.strokeStyle = `rgba(0,220,200,${d * 0.18})`;
        this.ctx.lineWidth = 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
      }
    }

    for (const lat of lats) {
      for (let lon = 0; lon < 360; lon += 20) {
        const [x, y, z] = this.project(lat, lon, r, cx, cy);
        const d = (z + r) / (2 * r);
        if (d > 0.1) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(0,220,200,${d * 0.65})`;
          this.ctx.fill();
        }
      }
    }

    const t = Date.now() / 1000;
    this.hotspots.forEach((hs, idx) => {
      const [x, y, z] = this.project(hs.lat, hs.lon, r, cx, cy);
      const d = (z + r) / (2 * r);
      if (d < 0.25) return;

      const phase = ((t + idx * 0.55) % 2) / 2;
      const ringA = (1 - phase) * d * 0.7;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3 + phase * 14, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0,220,200,${ringA})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0,220,200,${d * 0.95})`;
      this.ctx.fill();
    });

    this.rot = (this.rot + 0.1) % 360;
    this.animId = requestAnimationFrame(() => this.draw());
  }
}
