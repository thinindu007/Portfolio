import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
  hue: number;
  flareTime: number; // when > 0, star is flaring
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  width: number;
};

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = width < 768;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Stars ---
    // Adjust density based on device to ensure good performance and prevent clutter on small screens
    const density = isMobile ? 7500 : 4500;
    const minStars = isMobile ? 120 : 280;
    const starCount = Math.max(minStars, Math.floor((width * height) / density));
    
    const stars: Star[] = Array.from({ length: starCount }).map(() => {
      const isBright = Math.random() < 0.06;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: isBright
          ? Math.random() * (isMobile ? 1.2 : 1.6) + (isMobile ? 0.8 : 1.0)
          : Math.random() * (isMobile ? 0.7 : 0.9) + 0.2,
        baseAlpha: isBright
          ? Math.random() * 0.4 + 0.55
          : Math.random() * 0.35 + 0.08,
        twinkleSpeed: Math.random() * 0.8 + 0.3,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * (isMobile ? 0.01 : 0.015),
        vy: (Math.random() - 0.5) * (isMobile ? 0.005 : 0.008),
        hue: Math.random() < 0.3 ? 220 : Math.random() < 0.5 ? 40 : 0,
        flareTime: 0,
      };
    });

    // --- Shooting Stars ---
    const shootingStars: ShootingStar[] = [];
    let shootingStarTimer = 0;
    // Slightly less frequent on mobile
    let nextShootingInterval = (isMobile ? 4000 : 2000) + Math.random() * (isMobile ? 4000 : 3000); 

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.85 + width * 0.05;
      const startY = Math.random() * height * 0.5;
      const angle = (Math.random() * 35 + 12) * (Math.PI / 180);
      const direction = Math.random() < 0.7 ? 1 : -1;
      const speed = (Math.random() * 5 + 4) * (isMobile ? 0.8 : 1);
      const isLarge = Math.random() < 0.25;
      
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed * direction,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: isLarge ? 55 + Math.random() * 25 : 35 + Math.random() * 25,
        length: (isLarge ? 100 + Math.random() * 80 : 50 + Math.random() * 60) * (isMobile ? 0.6 : 1),
        width: isLarge ? (isMobile ? 1.5 : 2.0) : (isMobile ? 0.8 : 1.2),
      });
    };

    // --- Random star flares ---
    let flareTimer = 0;
    let nextFlareInterval = (isMobile ? 2500 : 1500) + Math.random() * 3000;

    // --- Mouse & Touch ---
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    let raf = 0;
    let time = 0;

    const tick = () => {
      const dt = 0.016;
      time += dt;
      shootingStarTimer += 16;
      flareTimer += 16;

      const mouseGlowRadius = isMobile ? 120 : 220;
      const constellationRadius = isMobile ? 100 : 160;
      const pushRadius = isMobile ? 60 : 100;

      ctx.clearRect(0, 0, width, height);

      // --- Subtle nebula glow ---
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.3, height * 0.25, 0,
        width * 0.3, height * 0.25, width * 0.5
      );
      nebulaGrad.addColorStop(0, "rgba(60, 40, 100, 0.04)");
      nebulaGrad.addColorStop(0.5, "rgba(30, 50, 90, 0.02)");
      nebulaGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      const nebulaGrad2 = ctx.createRadialGradient(
        width * 0.75, height * 0.15, 0,
        width * 0.75, height * 0.15, width * 0.35
      );
      nebulaGrad2.addColorStop(0, "rgba(40, 60, 120, 0.03)");
      nebulaGrad2.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, width, height);

      // --- Trigger random star flare ---
      if (flareTimer > nextFlareInterval) {
        const idx = Math.floor(Math.random() * stars.length);
        stars[idx].flareTime = 1.0; // start a 1-second flare
        flareTimer = 0;
        nextFlareInterval = (isMobile ? 2500 : 1500) + Math.random() * 3000;
      }

      // --- Collect stars near mouse for constellation lines ---
      const nearMouseStars: Star[] = [];

      // --- Draw Stars ---
      for (const s of stars) {
        // Slow drift
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around edges
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;
        if (s.y < -5) s.y = height + 5;
        if (s.y > height + 5) s.y = -5;

        // Decay flare
        if (s.flareTime > 0) {
          s.flareTime = Math.max(0, s.flareTime - dt);
        }

        // Twinkle
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        let alpha = s.baseAlpha + twinkle * s.baseAlpha * 0.5;

        // Flare boost — smooth pulse up then down
        let flareBoost = 0;
        if (s.flareTime > 0) {
          const flareProgress = 1 - s.flareTime; // 0 to 1
          flareBoost = Math.sin(flareProgress * Math.PI) * 0.7;
        }

        alpha = Math.max(0.02, Math.min(1, alpha + flareBoost));

        // Mouse/Touch proximity glow + gentle push
        const dxm = mouse.current.x - s.x;
        const dym = mouse.current.y - s.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const mouseBoost = dm < mouseGlowRadius ? (1 - dm / mouseGlowRadius) * 0.6 : 0;

        // Gentle push: stars drift slightly away from cursor/touch
        if (dm < pushRadius && dm > 1) {
          const pushForce = (1 - dm / pushRadius) * 0.12;
          s.x -= (dxm / dm) * pushForce;
          s.y -= (dym / dm) * pushForce;
        }

        // Collect for constellation
        if (dm < constellationRadius) {
          nearMouseStars.push(s);
        }

        const finalAlpha = Math.min(1, alpha + mouseBoost);
        const flareRadiusBoost = flareBoost * (isMobile ? 1.0 : 1.5);
        const finalRadius = s.r + (mouseBoost > 0 ? mouseBoost * 0.8 : 0) + flareRadiusBoost;

        // Color
        if (s.hue === 0) {
          ctx.fillStyle = `rgba(243, 242, 238, ${finalAlpha})`;
        } else if (s.hue === 220) {
          ctx.fillStyle = `rgba(190, 210, 255, ${finalAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 235, 200, ${finalAlpha})`;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, finalRadius, 0, Math.PI * 2);
        ctx.fill();

        // Glow halo for brighter stars or flaring stars
        if ((s.r > (isMobile ? 0.8 : 1.0) && finalAlpha > 0.4) || flareBoost > 0.2) {
          const glowRadius = finalRadius * (flareBoost > 0.2 ? (isMobile ? 4 : 6) : 4);
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
          if (s.hue === 220) {
            glow.addColorStop(0, `rgba(140, 170, 255, ${finalAlpha * 0.15})`);
          } else if (s.hue === 40) {
            glow.addColorStop(0, `rgba(255, 220, 160, ${finalAlpha * 0.12})`);
          } else {
            glow.addColorStop(0, `rgba(243, 242, 238, ${finalAlpha * 0.12})`);
          }
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Constellation lines near cursor/touch ---
      if (nearMouseStars.length > 1) {
        const maxLinks = isMobile ? 4 : 6; // slightly fewer lines on mobile to prevent clutter
        let links = 0;
        for (let i = 0; i < nearMouseStars.length && links < maxLinks; i++) {
          const a = nearMouseStars[i];
          for (let j = i + 1; j < nearMouseStars.length && links < maxLinks; j++) {
            const b = nearMouseStars[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < constellationRadius * 0.9) {
              const lineAlpha = 0.12 * (1 - dist / (constellationRadius * 0.9));
              ctx.strokeStyle = `rgba(150, 170, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              links++;
            }
          }
        }
      }

      // --- Mouse/Touch cursor glow ---
      if (mouse.current.x > -999) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, mouseGlowRadius
        );
        cursorGlow.addColorStop(0, "rgba(100, 130, 255, 0.035)");
        cursorGlow.addColorStop(0.4, "rgba(80, 110, 220, 0.018)");
        cursorGlow.addColorStop(1, "transparent");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, mouseGlowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Shooting Stars ---
      if (shootingStarTimer > nextShootingInterval) {
        spawnShootingStar();
        shootingStarTimer = 0;
        nextShootingInterval = (isMobile ? 4000 : 2000) + Math.random() * (isMobile ? 4000 : 3000);
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;

        const progress = ss.life / ss.maxLife;
        const fadeIn = Math.min(1, progress * 5);
        const fadeOut = 1 - Math.pow(progress, 2);
        const opacity = fadeIn * fadeOut * 0.85;

        if (opacity <= 0 || ss.life > ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Trail
        const speed = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const dirX = ss.vx / speed;
        const dirY = ss.vy / speed;
        const tailX = ss.x - dirX * ss.length * fadeOut;
        const tailY = ss.y - dirY * ss.length * fadeOut;

        const trailGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        trailGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        trailGrad.addColorStop(0.2, `rgba(210, 225, 255, ${opacity * 0.5})`);
        trailGrad.addColorStop(1, "rgba(200, 220, 255, 0)");

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright head glow
        const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, isMobile ? 3 : 4);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.6})`);
        headGlow.addColorStop(1, "transparent");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, isMobile ? 3 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Solid head dot
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian" />
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" />
      <div className="absolute inset-0 noise relative pointer-events-none" />
    </div>
  );
}
