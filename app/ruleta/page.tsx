"use client";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

const PRIZES = [
  { label: "20% DESC\nMILA COMÚN", color: "#8B0000", emoji: "🍗", textColor: "#FFD700" },
  { label: "15% DESC\nMILA ESPECIAL", color: "#1C1C1C", emoji: "⭐", textColor: "#FFD700" },
  { label: "SEGUÍ\nPARTICIPANDO", color: "#2F4F2F", emoji: "🎯", textColor: "#FFD700" },
  { label: "10% DESC\nBANDEJA PAPAS", color: "#8B4513", emoji: "🍟", textColor: "#FFD700" },
  { label: "CASI...\nINTENTÁ DE NUEVO", color: "#1C1C1C", emoji: "😅", textColor: "#FFFFFF" },
  { label: "15% DESC\nMILA ESPECIAL", color: "#8B0000", emoji: "🎁", textColor: "#FFD700" },
  { label: "CUPÓN $1500\n¡GRAN PREMIO!", color: "#DAA520", emoji: "🏆", textColor: "#000000" },
  { label: "PERDÉ TURNO\nSEGUÍ JUGANDO", color: "#2F4F2F", emoji: "❌", textColor: "#FFFFFF" },
];

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function RoulettePage() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [lastWin, setLastWin] = useState<string | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const wheelRef = useRef<HTMLDivElement | null>(null);

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
    
    // Número de vueltas completas para el efecto visual
    const spins = 10 + Math.floor(Math.random() * 3);
    
    // Calcular cuántos grados necesitamos rotar para que el premio idx quede arriba
    // Los segmentos están numerados 0-7 y cada uno ocupa 45 grados (360/8)
    // El segmento 0 empieza en 0° y su centro está en 22.5°
    // El puntero está en la parte superior (apuntando hacia abajo en 270° del círculo, o -90°)
    
    // Queremos que el centro del segmento idx esté en la posición 270° (arriba)
    const segmentCenter = idx * segmentAngle + (segmentAngle / 2);
    
    // Necesitamos rotar la ruleta para alinear este segmento con 270°
    // 270° es donde está el puntero en términos del círculo
    const targetAngle = 270 - segmentCenter;
    
    // Añadir las vueltas completas
    const totalRotation = targetAngle + (spins * 360);
    
    setAngle(totalRotation);

    setTimeout(() => {
      const prize = PRIZES[idx];
      setLastWin(prize.label);
      setSpinning(false);
      
      if (prize.label.includes("$1500")) {
        confetti({
          particleCount: 200,
          spread: 180,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
          scalar: 1.3
        });
      } else if (prize.label.includes("20%")) {
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#8B0000']
        });
      } else if (prize.label.includes("15%")) {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 }
        });
      }
    }, 4500);
  }

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
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Botón volver */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-4 left-4 z-50 group"
      >
        <div className="absolute inset-0 bg-yellow-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 border-2 border-yellow-400 shadow-xl transition-all duration-300 group-hover:scale-105">
          <HomeIcon className="w-5 h-5 text-yellow-950" />
          <span className="text-yellow-950 font-black text-sm">MENÚ</span>
        </div>
      </button>

      <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-opacity duration-700 opacity-100">
        
        {/* Header */}
        <div className="text-center mb-8 z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl md:text-5xl animate-bounce">🍗</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              RULETA DE LA MILANGA
            </h1>
            <span className="text-4xl md:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍗</span>
          </div>
          
          <p className="text-sm md:text-lg lg:text-xl text-yellow-200 font-bold uppercase tracking-wider">
            🎰 Casino Tucumano • Ganá Premios Increíbles 🎰
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className="px-4 py-2 rounded-full bg-yellow-600/30 border-2 border-yellow-500/50 backdrop-blur-sm">
              <span className="font-black text-yellow-100 text-sm">⚡ {spinCount} Giros</span>
            </div>
            {lastWin && (
              <div className="px-4 py-2 rounded-full bg-green-600/30 border-2 border-green-500/50 backdrop-blur-sm animate-pulse">
                <span className="font-black text-green-100 text-sm">🏆 {lastWin.split('\n')[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Container de la ruleta y controles */}
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-center">
          
          {/* Ruleta */}
          <div className="flex justify-center items-center relative">
            
            {/* Glow exterior */}
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl" />
            
            {/* Puntero superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 md:-translate-y-8 z-30">
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl md:text-3xl animate-bounce">👇</div>
                <div className="w-0 h-0 border-l-[14px] md:border-l-[16px] border-r-[14px] md:border-r-[16px] border-b-[32px] md:border-b-[36px] border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.9)]">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] md:border-l-[12px] border-r-[10px] md:border-r-[12px] border-b-[24px] md:border-b-[28px] border-l-transparent border-r-transparent border-b-white" />
                </div>
              </div>
            </div>

            {/* Marco decorativo */}
            <div className="absolute inset-0 rounded-full border-4 md:border-8 border-yellow-600/40 shadow-[0_0_80px_rgba(255,215,0,0.3)]" />

            {/* Disco */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px]">
              <div
                ref={wheelRef}
                style={{
                  backgroundImage: gradient,
                  transform: `rotate(${angle}deg)`,
                  transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                }}
                className="w-full h-full rounded-full shadow-[0_0_0_12px_#8B4513,0_0_0_16px_#DAA520,0_0_80px_rgba(255,215,0,0.5)] relative overflow-hidden"
              >
                {/* Segmentos con premios */}
                {PRIZES.map((prize, i) => {
                  const rotation = i * segmentAngle;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-left"
                      style={{
                        transform: `rotate(${rotation + segmentAngle / 2}deg)`,
                        width: '50%',
                      }}
                    >
                      <div className="absolute left-[30%] -translate-y-1/2 flex flex-col items-center justify-center gap-0.5 md:gap-1">
                        <div className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                          {prize.emoji}
                        </div>
                        <div 
                          className="text-[10px] sm:text-[11px] md:text-[13px] font-black text-center leading-[1.1] max-w-[70px] sm:max-w-[85px] md:max-w-[95px] whitespace-pre-line px-0.5"
                          style={{
                            color: prize.textColor,
                            textShadow: prize.textColor === '#000000' 
                              ? '0 0 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.5)'
                              : '0 3px 8px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8), 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                            WebkitTextStroke: prize.textColor === '#FFD700' ? '0.8px rgba(0,0,0,0.7)' : 'none'
                          }}
                        >
                          {prize.label}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Líneas divisorias */}
                {PRIZES.map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute top-0 left-1/2 w-[2px] h-full origin-bottom bg-gradient-to-b from-yellow-600/80 to-transparent -translate-x-1/2"
                    style={{ transform: `rotate(${i * segmentAngle}deg)` }}
                  />
                ))}

                {/* Círculos decorativos */}
                <div className="absolute inset-12 sm:inset-14 md:inset-16 rounded-full border-2 md:border-4 border-yellow-500/30" />
                <div className="absolute inset-20 sm:inset-22 md:inset-24 rounded-full border md:border-2 border-yellow-600/20" />

                {/* Centro */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 shadow-[0_0_30px_rgba(255,215,0,0.6),inset_0_4px_15px_rgba(0,0,0,0.4)] flex items-center justify-center border-4 border-yellow-400">
                  <div className="text-2xl md:text-3xl">🍗</div>
                </div>
              </div>
            </div>

            {/* Indicador girando */}
            {spinning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                <div className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-black/90 border-2 md:border-4 border-yellow-500 shadow-[0_0_50px_rgba(255,215,0,0.8)]">
                  <span className="text-xl md:text-3xl font-black text-yellow-300 animate-pulse tracking-widest">
                    ¡GIRANDO!
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Panel de control */}
          <div className="space-y-5 w-full max-w-md mx-auto">
            
            {/* Botón girar */}
            <button
              onClick={spin}
              disabled={spinning}
              className="relative w-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 disabled:from-gray-600 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xl md:text-2xl text-yellow-950 shadow-2xl transition-all duration-300 group-hover:scale-105 active:scale-95 border-4 border-yellow-700 flex items-center justify-center gap-2 md:gap-3">
                {spinning ? (
                  <>
                    <div className="animate-spin h-7 w-7 md:h-8 md:w-8 border-4 border-yellow-950 border-t-transparent rounded-full" />
                    <span>GIRANDO...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl md:text-3xl">🎰</span>
                    <span>GIRAR RULETA</span>
                    <span className="text-2xl md:text-3xl">🎰</span>
                  </>
                )}
              </div>
            </button>

            {/* Resultado */}
            <div className="bg-gradient-to-br from-amber-950/80 via-yellow-950/80 to-amber-950/80 backdrop-blur-xl rounded-xl md:rounded-2xl border-4 border-yellow-600/50 shadow-2xl p-5 md:p-6 min-h-[180px] md:min-h-[200px] flex items-center justify-center">
              {lastWin ? (
                <div className="text-center space-y-3 md:space-y-4 w-full">
                  <div className="flex items-center justify-center gap-2 text-yellow-300 text-xs md:text-sm font-black uppercase tracking-widest">
                    <span>⭐</span>
                    <span>PREMIO GANADO</span>
                    <span>⭐</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 rounded-lg md:rounded-xl p-4 md:p-5 border-2 border-yellow-500/40">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] whitespace-pre-line leading-tight">
                      {lastWin}
                    </p>
                  </div>
                  
                  <p className="text-xs md:text-sm text-yellow-200/80 font-bold">
                    🎉 ¡Felicitaciones! Guardá tu premio 🎉
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2 md:space-y-3">
                  <p className="text-2xl md:text-3xl font-bold text-yellow-300">
                    🎰 ¡Probá tu suerte! 🎰
                  </p>
                  <p className="text-base md:text-lg text-yellow-100/70">
                    Presioná el botón para comenzar
                  </p>
                </div>
              )}
            </div>

            {/* Info adicional */}
            <div className="text-center text-xs md:text-sm text-yellow-500/70 font-semibold">
              ★ MILANESAS TUCUMANAS AUTÉNTICAS ★
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}