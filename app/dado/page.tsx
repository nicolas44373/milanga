"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { 
  Sandwich as FriesIcon, 
  Target, 
  Beef, 
  Gift,
  Percent,
} from "lucide-react";

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" />
  </svg>
);

const Sandwich = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11h18M3 15h18M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function DicePage() {
  const router = useRouter();
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [rotationX, setRotationX] = useState(-30);
  const [rotationY, setRotationY] = useState(45);

  const getFinalRotation = (face: number): { x: number; y: number } => {
    switch (face) {
      case 1: return { x: 0, y: 0 };
      case 2: return { x: 0, y: 180 };
      case 3: return { x: 0, y: -90 };
      case 4: return { x: 0, y: 90 };
      case 5: return { x: -90, y: 0 };
      case 6: return { x: 90, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const getResultMessage = (face: number) => {
    const messages = [
      "AGREGADO DE PAPAS",
      "SEGUÍ PARTICIPANDO",
      "10% DESC BAND PAPAS",
      "5% DESC MILA 35CM", 
      "SEGUÍ PARTICIPANDO",
      "2 AGG PAPAS GRATIS"
    ];
    return messages[face - 1];
  };

  const getPrizeIcon = (face: number) => {
    const icons = [
      { Icon: FriesIcon, color: "text-yellow-400" },        // 1: Agregado de papas
      { Icon: Target, color: "text-blue-400" },             // 2: Seguí participando
      { Icon: Percent, color: "text-green-400" },           // 3: 10% desc papas
      { Icon: Beef, color: "text-orange-400" },             // 4: 5% desc mila
      { Icon: Target, color: "text-blue-400" },             // 5: Seguí participando
      { Icon: Gift, color: "text-pink-400" }                // 6: 2 agg papas gratis
    ];
    return icons[face - 1];
  };

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    setRollCount(prev => prev + 1);

    const face = 1 + Math.floor(Math.random() * 6);
    const spins = 5;
    const finalRot = getFinalRotation(face);

    setRotationX(finalRot.x + 360 * spins);
    setRotationY(finalRot.y + 360 * spins);

    setTimeout(() => {
      setResult(face);
      setRolling(false);

      if (face === 6) {
        confetti({
          particleCount: 200,
          spread: 180,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#dc2626", "#16a34a"],
          scalar: 1.3
        });
      } else if (face >= 4) {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#fbbf24"]
        });
      } else if (face >= 1) {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 relative overflow-hidden">
      {/* Patron decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #f59e0b 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-5xl md:text-6xl animate-pulse">🍗</div>
        <div className="absolute top-20 right-20 text-5xl md:text-6xl animate-pulse" style={{ animationDelay: '0.5s' }}>🍟</div>
        <div className="absolute bottom-20 left-20 text-5xl md:text-6xl animate-pulse" style={{ animationDelay: '1s' }}>🍅</div>
        <div className="absolute bottom-10 right-10 text-5xl md:text-6xl animate-pulse" style={{ animationDelay: '1.5s' }}>🥬</div>
      </div>

      {/* Botón volver */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-4 left-4 z-50 group"
      >
        <div className="absolute inset-0 bg-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 border-2 border-orange-400 shadow-xl transition-all duration-300 group-hover:scale-105">
          <HomeIcon className="w-5 h-5 text-white" />
          <span className="text-white font-black text-sm">MENÚ</span>
        </div>
      </button>

      <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 z-10">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="text-4xl md:text-5xl animate-bounce">🥪</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
              DADO DEL SANGUCHÓN
            </h1>
            <span className="text-4xl md:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🥪</span>
          </div>

          <p className="text-base md:text-xl lg:text-2xl text-orange-200 font-bold uppercase tracking-wide mb-4 md:mb-6">
            🎲 Tirá el dado por tu milanesa perfecta 🎲
          </p>

          {/* Stats */}
          {(rollCount > 0 || result) && (
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {rollCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/30 border-2 border-orange-500/50 backdrop-blur-sm">
                  <Sandwich className="w-4 h-4 text-orange-200" />
                  <span className="font-black text-orange-100 text-sm">⚡ {rollCount} Tiradas</span>
                </div>
              )}
              {result && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/30 border-2 border-green-500/50 backdrop-blur-sm animate-pulse">
                  <Sparkles className="w-4 h-4 text-green-300" />
                  <span className="font-black text-green-100 text-sm">🏆 Último: {result}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Container dado y controles */}
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-center">
          
          {/* Dado 3D */}
          <div className="flex justify-center items-center relative min-h-[300px] md:min-h-[400px]">
            <div className="relative" style={{ perspective: "1200px" }}>
              
              {/* Glow */}
              <div className="absolute inset-0 bg-orange-500/30 rounded-3xl blur-3xl scale-110" />
              
              {/* Dado */}
              <div
                className="relative transition-transform duration-[2000ms] ease-out"
                style={{
                  width: "200px",
                  height: "200px",
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
                }}
              >
                {/* Cara 1 - Pan superior */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 rounded-2xl flex items-center justify-center border-4 border-amber-600 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-amber-900 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)]">1</div>
                </div>

                {/* Cara 2 - Lechuga */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl flex items-center justify-center border-4 border-green-700 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "rotateY(180deg) translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-green-900 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)]">2</div>
                </div>

                {/* Cara 3 - Tomate */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-2xl flex items-center justify-center border-4 border-red-700 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "rotateY(90deg) translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-red-900 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)]">3</div>
                </div>

                {/* Cara 4 - Queso */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center border-4 border-yellow-600 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "rotateY(-90deg) translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-yellow-900 drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)]">4</div>
                </div>

                {/* Cara 5 - Milanesa */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 rounded-2xl flex items-center justify-center border-4 border-amber-900 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "rotateX(90deg) translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-amber-100 drop-shadow-[0_8px_12px_rgba(0,0,0,0.9)]">5</div>
                </div>

                {/* Cara 6 - Pan inferior */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-2xl flex items-center justify-center border-4 border-amber-800 shadow-[0_10px_50px_rgba(0,0,0,0.5)]" 
                  style={{ transform: "rotateX(-90deg) translateZ(100px)" }}
                >
                  <div className="text-9xl font-black text-amber-100 drop-shadow-[0_8px_12px_rgba(0,0,0,0.9)]">6</div>
                </div>
              </div>

              {/* Indicador rodando */}
              {rolling && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 top-[220px]">
                  <div className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-black/90 border-2 md:border-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.8)]">
                    <span className="text-lg md:text-2xl font-black text-orange-300 animate-pulse tracking-wider">
                      ¡RODANDO!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel de control */}
          <div className="space-y-5 w-full max-w-md mx-auto">
            
            {/* Botón tirar */}
            <button
              onClick={roll}
              disabled={rolling}
              className="relative w-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:via-amber-500 hover:to-orange-500 disabled:from-gray-600 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-2xl text-white shadow-2xl transition-all duration-300 group-hover:scale-105 active:scale-95 border-4 border-orange-700 flex items-center justify-center gap-2 md:gap-3">
                {rolling ? (
                  <>
                    <div className="animate-spin h-6 w-6 md:h-7 md:w-7 border-4 border-white border-t-transparent rounded-full" />
                    <span>PREPARANDO...</span>
                  </>
                ) : (
                  <>
                    <Sandwich className="w-6 h-6" />
                    <span>TIRAR EL DADO</span>
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </div>
            </button>

            {/* Resultado */}
            <div className="bg-gradient-to-br from-orange-950/80 via-amber-950/80 to-orange-950/80 backdrop-blur-xl rounded-xl md:rounded-2xl border-4 border-orange-600/50 shadow-2xl p-5 md:p-6 min-h-[180px] md:min-h-[220px] flex items-center justify-center">
              {result ? (
                <div className="text-center space-y-3 w-full">
                  <p className="text-xs md:text-sm text-orange-300 font-black uppercase tracking-widest">
                    {result === 6 ? "🎉 ¡GRAN PREMIO! 🎉" : result >= 4 ? "✨ ¡Buen premio! ✨" : "🥪 Premio 🥪"}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    {/* Icono del premio */}
                    <div className={`${getPrizeIcon(result).color} drop-shadow-2xl`}>
                      {(() => {
                        const { Icon } = getPrizeIcon(result);
                        return <Icon className="w-16 h-16 md:w-20 md:h-20" strokeWidth={2} />;
                      })()}
                    </div>
                    
                    <div className="text-center">
                      <span className="block text-6xl md:text-8xl font-black bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                        {result}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-lg p-3 md:p-4 border-2 border-orange-500/40 mt-3">
                    <span className="block text-base md:text-xl font-black text-orange-200">
                      {getResultMessage(result)}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-orange-200/80 font-bold mt-2">
                    🎉 ¡Guardá tu premio!
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-orange-300">
                    🎲 ¡Tirá el dado! 🎲
                  </p>
                  <p className="text-sm md:text-base text-orange-100/70">
                    Presioná el botón para jugar
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center text-xs md:text-sm text-orange-500/70 font-semibold">
              ★ MILANESAS TUCUMANAS AUTÉNTICAS ★
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}