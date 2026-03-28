import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export default function Onboarding() {
  const { setDreamProject, goToScreen } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: canvas.width / 2, y: canvas.height / 2, radius: 150 };

    const mouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', mouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 2;
          const directionY = forceDirectionY * force * 2;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 119, 87, 0.7)'; // #D97757 theme color
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            opacityValue = 1 - distance / 120;
            ctx!.strokeStyle = `rgba(107, 101, 96, ${opacityValue * 0.4})`; // #6B6560
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStart = () => {
    // 임의의 기본값으로 프로젝트 초기화 후 다음 화면으로 이동
    setDreamProject('Claude Code Study Project');
    goToScreen('profile-setup');
  };

  return (
    <div
      onClick={handleStart}
      className="relative min-h-screen w-full overflow-hidden cursor-pointer select-none flex flex-col items-center justify-center p-6"
      style={{ background: '#FAF9F6' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[700px] text-center">
        {/* Top logo/Title */}
        <div className="mb-4 text-sm font-semibold tracking-wider uppercase" style={{ color: '#D97757' }}>
           aixlife presents
        </div>
        
        <h1
          className="mb-6 font-bold tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, color: '#1A1714' }}
        >
          Claude Code Study
        </h1>

        <div className="mb-10 max-w-[500px]">
          <p style={{ color: '#6B6560', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500 }}>
            우주를 항해하듯 새로운 차원의 코딩 학습을 경험하세요.<br />
            여러분의 상상력이 현실의 뉴런처럼 연결되어<br />
            실제 동작하는 프로그램으로 탄생합니다.
          </p>
        </div>

        <div
          className="inline-block animate-pulse font-medium px-6 py-3 rounded-full"
          style={{ background: '#D97757', color: '#fff', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(217,119,87,0.4)' }}
        >
          화면 어디든 클릭해서 시작하기
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full flex flex-col items-center z-20 text-sm gap-1">
        <a 
          href="https://aixlife.co.kr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium hover:underline transition-all"
          style={{ color: '#D97757' }}
          onClick={(e) => e.stopPropagation()}
        >
          aixlife.co.kr
        </a>
        <span style={{ color: '#9D9087' }}>made by aixlife</span>
      </div>
    </div>
  );
}
