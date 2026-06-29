import { useEffect, useRef } from 'react';
import styles from './ConfettiCanvas.module.css';

const DEFAULT_COLORS = ['#7C3AED', '#FF6B57', '#14B8A6', '#F59E0B', '#10B981', '#EF4444'];

export default function ConfettiCanvas({ colors }) {
  const COLORS = (colors && colors.length > 0) ? colors : DEFAULT_COLORS;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      drift: (Math.random() - 0.5) * 2,
    }));

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
