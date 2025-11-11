"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const PRIZES = [
  { label: "20% desc Mila Común", color: "#FF6B6B", emoji: "🍗" },
  { label: "15% desc Mila Especial", color: "#F7B267", emoji: "⭐" },
  { label: "Seguí participando", color: "#4D96FF", emoji: "🎯" },
  { label: "10% desc Bandeja papas", color: "#6BCB77", emoji: "🍟" },
  { label: "Casi...", color: "#FFD93D", emoji: "😅" },
  { label: "15% desc Mila Especial", color: "#845EC2", emoji: "🎁" },
  { label: "Cupón desc $1500", color: "#00C9A7", emoji: "🏆" },
  { label: "Perdé turno", color: "#C34A36", emoji: "❌" },
];

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" />
  </svg>
);

const Trophy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default function RoulettePage() {
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [lastWin, setLastWin] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const segmentAngle = 360 / PRIZES.length;

  const gradient = useMemo(() => {
    const stops = PRIZES.map((p, i) => {
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      return `${p.color} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${stops.join(",")})`;
  }, [segmentAngle]);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setSpinCount(prev => prev + 1);

    const idx = Math.floor(Math.random() * PRIZES.length);
    const center = idx * segmentAngle + segmentAngle / 2;
    const pointerDeg = -90;
    const jitter = (Math.random() - 0.5) * (segmentAngle * 0.6);
    const turns = 8 + Math.floor(Math.random() * 4);
    const target = pointerDeg - (center + jitter) + 360 * turns;
    const nextAngle = angle + target;

    setAngle(nextAngle);

    const onEnd = () => {
      wheelRef.current?.removeEventListener("transitionend", onEnd);
      
      // Pequeño delay para asegurar que la animación terminó
      setTimeout(() => {
        const prize = PRIZES[idx];
        setLastWin(prize.label);
        setSpinning(false);
        
        // Confetti épico basado en el premio
        if (prize.label.includes("$1500")) {
          confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.4 },
            colors: ['#FFD700', '#FFA500', '#FF6B6B']
          });
        } else if (prize.label.includes("20%")) {
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.4 }
          });
        } else if (prize.label.includes("15%")) {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.4 }
          });
        } else if (!prize.label.includes("Casi") && !prize.label.includes("turno")) {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.4 }
          });
        }
      }, 100);
    };

    wheelRef.current?.addEventListener("transitionend", onEnd, { once: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className={`relative min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="text-6xl animate-bounce">🎡</div>
              <div className="absolute -inset-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-fuchsia-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            Ruleta de la Milanga
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 font-semibold">
            Girá la ruleta y probemos suerte
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6 text-purple-300">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">{spinCount} Giros</span>
            </div>
            {lastWin && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/20 backdrop-blur-sm border border-fuchsia-400/30">
                <Trophy className="w-4 h-4 text-fuchsia-300" />
                <span className="font-bold text-fuchsia-200">Último: {lastWin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto">
          {/* RUEDA */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            
            {/* Puntero mejorado */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[32px] border-l-transparent border-r-transparent border-b-fuchsia-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] animate-pulse" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[24px] border-l-transparent border-r-transparent border-b-white" />
              </div>
            </div>

            {/* Disco con efectos */}
            <div className="relative">
              <div
                ref={wheelRef}
                style={{
                  backgroundImage: gradient,
                  transform: `rotate(${angle}deg)`,
                  transition: spinning
                    ? "transform 4.5s cubic-bezier(.17,.67,.17,1)"
                    : undefined,
                }}
                className="relative size-[480px] md:size-[580px] rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.1),0_0_60px_rgba(236,72,153,0.3),0_40px_100px_-20px_rgba(0,0,0,0.8)] ring-2 ring-white/20 overflow-hidden"
              >
                {/* Segmentos con texto */}
                {PRIZES.map((prize, i) => {
                  const segAngle = 360 / PRIZES.length;
                  const rotation = i * segAngle;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-left"
                      style={{
                        transform: `rotate(${rotation + segAngle / 2}deg)`,
                        width: '50%',
                      }}
                    >
                      <div className="absolute left-[30%] -translate-y-1/2 flex flex-col items-center gap-0.5">
                        <span className="text-2xl md:text-3xl drop-shadow-[0_3px_8px_rgba(0,0,0,1)]">
                          {prize.emoji}
                        </span>
                        <span className="text-[9px] md:text-[11px] font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)] text-center leading-tight max-w-[80px] md:max-w-[100px]">
                          {prize.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Círculos decorativos */}
                <div className="absolute inset-20 rounded-full border-2 border-white/20 shadow-inner" />
                <div className="absolute inset-28 rounded-full border border-white/10" />
                
                {/* Centro brillante */}
                <div className="absolute inset-[44%] rounded-full bg-gradient-to-br from-slate-800 to-slate-900 ring-4 ring-white/20 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20" />
                </div>
              </div>
            </div>

            {/* Spin indicator */}
            {spinning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  <span className="text-2xl font-bold text-white animate-pulse">GIRANDO...</span>
                </div>
              </div>
            )}
          </div>

          {/* BOTÓN Y RESULTADO */}
          <div className="w-full max-w-md space-y-6">
            <button
              onClick={spin}
              disabled={spinning}
              className="relative w-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed px-8 py-5 font-black text-xl shadow-xl transition-all duration-300 group-hover:scale-105">
                {spinning ? (
                  <>
                    <div className="animate-spin mr-3 h-6 w-6 border-3 border-white border-t-transparent rounded-full" />
                    Girando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-3" />
                    GIRAR RULETA
                    <Sparkles className="w-6 h-6 ml-3" />
                  </>
                )}
              </div>
            </button>

            {/* Result display */}
            <div className="text-center min-h-[100px] flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 ring-1 ring-white/20 p-6 backdrop-blur-xl shadow-2xl">
              {lastWin ? (
                <div className="space-y-3">
                  <p className="text-sm text-purple-300 font-semibold uppercase tracking-wider">
                    🎉 Resultado 🎉
                  </p>
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-fuchsia-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                    {lastWin}
                  </p>
                </div>
              ) : (
                <p className="text-purple-300/60 text-lg">
                  Presioná el botón para empezar...
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236,72,153,0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236,72,153,0.7);
        }
      `}</style>
    </div>
  );
}