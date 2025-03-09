
import React, { useEffect, useRef } from 'react';

const CodeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code snippets
    const codeSnippets = [
      "for (i=0; i<array.length; i++)",
      "function calculate() {",
      "return new Promise((resolve, reject) => {",
      "const data = await fetch('/api/data');",
      "if (condition === true) {",
      "export default function Component() {",
      "useState, useEffect, useRef",
      "<div className='container'>",
      "const [state, setState] = useState(null);",
      "addEventListener('click', () => {})",
      "import React from 'react';",
      "npm install --save",
      "git commit -m 'Update'",
      "docker-compose up -d",
      "console.log('Debug');",
      "try { ... } catch(e) { ... }",
      "async/await pattern",
      "map(item => item.id)",
      "reduce((acc, val) => acc + val, 0)",
      "filter(user => user.active)",
    ];

    // Create vertical lines
    const lines: { x: number; speed: number; height: number; frequency: number }[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        speed: 0.2 + Math.random() * 0.8,
        height: 50 + Math.random() * 200,
        frequency: 0.001 + Math.random() * 0.01
      });
    }

    // Create code particles
    const particles: { x: number; y: number; speed: number; text: string; alpha: number; size: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        alpha: 0.1 + Math.random() * 0.2,
        size: 10 + Math.random() * 6
      });
    }

    let animationFrameId: number;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw vertical lines
      lines.forEach(line => {
        line.x += line.speed;
        if (line.x > canvas.width) {
          line.x = 0;
        }
        
        const y = Math.sin(Date.now() * line.frequency) * 50;
        
        ctx.beginPath();
        ctx.moveTo(line.x, y);
        ctx.lineTo(line.x, y + line.height);
        ctx.strokeStyle = `rgba(138, 43, 226, ${0.05 + Math.random() * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw code text
      particles.forEach(particle => {
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = -30;
          particle.x = Math.random() * canvas.width;
          particle.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
        
        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = `rgba(0, 255, 170, ${particle.alpha})`;
        ctx.fillText(particle.text, particle.x, particle.y);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
    />
  );
};

export default CodeBackground;
