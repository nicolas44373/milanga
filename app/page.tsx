'use client';

import { useState } from "react";
import Image from "next/image";

interface GameCardProps {
  href: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  borderColor: string;
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const GameCard = ({ href, title, subtitle, emoji, gradient, borderColor }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 shadow-2xl"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-95 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Glow border */}
      <div className={`absolute inset-0 rounded-2xl border-4 ${borderColor} shadow-[0_0_40px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
           style={{
             background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
             backgroundSize: '200% 200%',
             animation: isHovered ? 'shimmer 2s infinite' : 'none'
           }} />
      
      {/* Content */}
      <div className="relative p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
        {/* Top section with emoji */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-8xl md:text-9xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
            {emoji}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
            <Sparkles className="w-10 h-10 text-yellow-300" />
          </div>
        </div>
        
        {/* Text content */}
        <div>
          <h3 className="text-4xl md:text-5xl font-black text-yellow-100 mb-3 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {title}
          </h3>
          <p className="text-yellow-50/90 text-lg md:text-xl font-bold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>
        </div>
        
        {/* Play button indicator */}
        <div className="mt-6 flex items-center gap-3 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-300">
          <span className="text-base font-black uppercase tracking-widest drop-shadow-lg">Jugar Ahora</span>
          <div className="transform transition-transform duration-300 group-hover:translate-x-2">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `float ${2.5 + (i * 0.3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}
    </a>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900 relative overflow-hidden">
      {/* Patron decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #FFD700 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Efectos de luz */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        
        {/* Header con logo */}
        <header className="mb-12 md:mb-16 text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-[0_0_40px_rgba(255,215,0,0.4)]">
                <Image
                  src="/icono.jpg"
                  alt="El Club de la Milanga"
                  width={256}
                  height={256}
                  className="rounded-3xl border-4 border-yellow-600/50 shadow-2xl"
                  priority
                />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-yellow-600/30 rounded-3xl blur-2xl animate-pulse" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,215,0,0.5)]">
            EL CLUB DE LA MILANGA
          </h1>
          
          {/* Subtitle */}
          <div className="relative inline-block mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl text-yellow-200 font-black uppercase tracking-wide drop-shadow-lg">
              🎰 Menú de Juegos • Ganá Premios 🎰
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-yellow-300">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-600/20 border-2 border-yellow-500/40 backdrop-blur-sm">
              <span className="text-2xl">🎲</span>
              <span className="font-black text-base">2 Juegos Disponibles</span>
            </div>
            <div className="hidden sm:block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600/20 border-2 border-orange-500/40 backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span className="font-black text-base">100% Milanesas</span>
            </div>
          </div>
        </header>

        {/* Game Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          <GameCard
            href="/ruleta"
            title="RULETA"
            subtitle="Girá la ruleta y ganá descuentos increíbles en milanesas"
            emoji="🎡"
            gradient="bg-gradient-to-br from-yellow-700 via-yellow-800 to-amber-900"
            borderColor="border-yellow-500"
          />
          <GameCard
            href="/dado"
            title="DADO 3D"
            subtitle="Tirá el dado del sanguchón y completá tu milanesa perfecta"
            emoji="🎲"
            gradient="bg-gradient-to-br from-orange-700 via-orange-800 to-red-900"
            borderColor="border-orange-500"
          />
        </section>
        
        {/* Footer */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            {/* Main message */}
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm border-2 border-yellow-500/50 shadow-2xl">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-100 font-black text-lg md:text-xl uppercase tracking-wider">
                ¡Jugá y Ganá Premios!
              </span>
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            
            {/* Tagline */}
            <p className="text-yellow-500/70 font-bold text-sm md:text-base tracking-wide">
              ★ MILANESAS TUCUMANAS AUTÉNTICAS ★
            </p>
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