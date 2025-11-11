'use client';

import React, { useState, useEffect } from 'react';

interface GameCardProps {
  href: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  delay: number;
}

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" />
  </svg>
);

const Gamepad2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="11" x2="10" y2="11" />
    <line x1="8" y1="9" x2="8" y2="13" />
    <line x1="15" y1="12" x2="15.01" y2="12" />
    <line x1="18" y1="10" x2="18.01" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
  </svg>
);

const Dices = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M16 8h.01M8 8h.01M8 16h.01M16 16h.01M12 12h.01" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// Valores pre-generados para las partículas (evita Math.random en render)
const PARTICLE_POSITIONS: Particle[] = [
  { left: 15, top: 25, duration: 3.2, delay: 0.5 },
  { left: 75, top: 15, duration: 2.8, delay: 1.2 },
  { left: 45, top: 65, duration: 3.5, delay: 0.8 },
  { left: 85, top: 45, duration: 2.5, delay: 1.5 },
  { left: 25, top: 80, duration: 3.8, delay: 0.3 },
  { left: 60, top: 35, duration: 2.9, delay: 1.0 },
  { left: 10, top: 55, duration: 3.3, delay: 0.7 },
  { left: 90, top: 75, duration: 2.6, delay: 1.8 }
];

const GameCard = ({ href, title, subtitle, emoji, gradient, delay }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{
             background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
             backgroundSize: '200% 200%',
             animation: isHovered ? 'shimmer 2s infinite' : 'none'
           }} />
      
      {/* Content */}
      <div className="relative p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
        {/* Top section with emoji */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-7xl md:text-8xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            {emoji}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Text content */}
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {/* Play button indicator */}
        <div className="mt-6 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors duration-300">
          <span className="text-sm font-bold uppercase tracking-wider">Jugar ahora</span>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      {/* Particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLE_POSITIONS.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      )}
    </a>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <main className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        <header className={`mb-12 md:mb-20 text-center transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Gamepad2 className="w-16 h-16 md:w-20 md:h-20 text-white animate-bounce" />
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            🎯 Menú de Juegos
          </h1>
          
          {/* Subtitle with animated underline */}
          <div className="relative inline-block">
            <p className="text-xl md:text-2xl text-purple-200 font-semibold">
              Elegí un juego para empezar la aventura
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
          </div>
          
          {/* Stats or decorative elements */}
          <div className="flex items-center justify-center gap-8 mt-8 text-purple-300">
            <div className="flex items-center gap-2">
              <Dices className="w-5 h-5" />
              <span className="font-bold">2 Juegos</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-purple-400" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">Diversión Infinita</span>
            </div>
          </div>
        </header>

        <section className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <GameCard
            href="/ruleta"
            title="Ruleta"
            subtitle="Girá con animación realista y descubrí tu premio"
            emoji="🎡"
            gradient="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600"
            delay={0}
          />
          <GameCard
            href="/dado"
            title="Dado 3D"
            subtitle="Cubo 3D con tirada animada y suave"
            emoji="🎲"
            gradient="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600"
            delay={200}
          />
        </section>
        
        {/* Footer decoration */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-purple-200 font-semibold">¡Que comience la diversión!</span>
            <Sparkles className="w-4 h-4 text-purple-300" />
          </div>
        </div>
      </main>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-100px) translateX(50px);
            opacity: 1;
          }
          90% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}