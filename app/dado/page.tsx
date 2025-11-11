"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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

export default function DicePage() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [rotationX, setRotationX] = useState(-30);
  const [rotationY, setRotationY] = useState(45);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

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
      "agregado de papas",
      "segui participando",
      "10% desc band de papas",
      "5% desc mila comun 35cm", 
      "segui participando",
      "🥩 ¡2 AGG PAPAS GRATIS!"
    ];
    return messages[face - 1];
  };

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    setRollCount(prev => prev + 1);

    const face = 1 + Math.floor(Math.random() * 6);
    const spins = 5;
    const finalRot = getFinalRotation(face);

    // Calcula la rotación total de manera que siempre dure 2 segundos
    setRotationX(finalRot.x + 360 * spins);
    setRotationY(finalRot.y + 360 * spins);

    // Siempre 2 segundos exactos
    setTimeout(() => {
      setResult(face);
      setRolling(false);

      // 🎉 Confetti temático de sandwich
      if (face === 6) {
        confetti({
          particleCount: 150,
          spread: 140,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#dc2626", "#16a34a"],
          ticks: 100,
          shapes: ["circle", "square"]
        });
      } else if (face >= 4) {
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#fbbf24", "#dc2626"]
        });
      } else {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 }
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🥖</div>
        <div className="absolute top-20 right-20 text-6xl">🥩</div>
        <div className="absolute bottom-20 left-20 text-6xl">🍅</div>
        <div className="absolute bottom-10 right-10 text-6xl">🧀</div>
      </div>

      <main
        className={`relative min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
            🥪 Dado del Sanguchón 🥪
          </h1>

          <p className="text-xl md:text-2xl text-amber-100 font-semibold mb-8">
            ¡Tirá el dado por tu milanesa perfecta!
          </p>

          {(rollCount > 0 || result) && (
            <div className="flex items-center justify-center gap-4 text-amber-200">
              {rollCount > 0 && (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Sandwich className="w-5 h-5" />
                  <span className="font-bold text-base">{rollCount} Tiradas</span>
                </div>
              )}
              {result && (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span className="font-bold text-amber-200 text-base">Último: {result}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🎲 Dado con temática de sandwich */}
        <div className="relative" style={{ perspective: "1200px" }}>
          <div
            className="relative transition-transform duration-[2000ms] ease-out"
            style={{
              width: "200px",
              height: "200px",
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
            }}
          >
            {/* Cara 1 - Pan */}
            <div className="absolute w-full h-full bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl flex items-center justify-center border-4 border-amber-200/50 shadow-2xl" style={{ transform: "translateZ(100px)" }}>
              <div className="text-6xl">🥖</div>
            </div>

            {/* Cara 2 - Manteca */}
            <div className="absolute w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-2xl flex items-center justify-center border-4 border-yellow-100/50 shadow-2xl" style={{ transform: "rotateY(180deg) translateZ(100px)" }}>
              <div className="text-6xl">🧈</div>
            </div>

            {/* Cara 3 - Lechuga */}
            <div className="absolute w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center border-4 border-green-300/50 shadow-2xl" style={{ transform: "rotateY(90deg) translateZ(100px)" }}>
              <div className="text-6xl">🥬</div>
            </div>

            {/* Cara 4 - Tomate */}
            <div className="absolute w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center border-4 border-red-300/50 shadow-2xl" style={{ transform: "rotateY(-90deg) translateZ(100px)" }}>
              <div className="text-6xl">🍅</div>
            </div>

            {/* Cara 5 - Queso */}
            <div className="absolute w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl flex items-center justify-center border-4 border-yellow-200/50 shadow-2xl" style={{ transform: "rotateX(90deg) translateZ(100px)" }}>
              <div className="text-6xl">🧀</div>
            </div>

            {/* Cara 6 - Milanesa */}
            <div className="absolute w-full h-full bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center border-4 border-amber-400/50 shadow-2xl" style={{ transform: "rotateX(-90deg) translateZ(100px)" }}>
              <div className="text-6xl">🥩</div>
            </div>
          </div>
        </div>

        {/* Botón */}
        <div className="w-full max-w-lg space-y-6 px-4 mt-8">
          <button onClick={roll} disabled={rolling} className="relative w-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 disabled:cursor-not-allowed px-8 py-5 font-black text-xl shadow-xl transition-all duration-300 group-hover:scale-105 text-white">
              {rolling ? (
                <>
                  <div className="animate-spin mr-3 h-6 w-6 border-3 border-white border-t-transparent rounded-full" />
                  Preparando el sánguche...
                </>
              ) : (
                <>
                  <Sandwich className="w-6 h-6 mr-3" />
                  TIRAR EL DADO
                  <Sparkles className="w-6 h-6 ml-3" />
                </>
              )}
            </div>
          </button>

          {result && (
            <div className="text-center min-h-[120px] flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-900/80 to-orange-900/80 ring-1 ring-amber-400/30 p-8 backdrop-blur-xl shadow-2xl">
              <div className="space-y-3">
                <p className="text-sm text-amber-200 font-semibold uppercase tracking-wider">
                  {result === 6 ? "🎉 ¡MILANESA COMPLETA! 🎉" : result >= 4 ? "✨ ¡Buen ingrediente! ✨" : "🥪 Ingrediente 🥪"}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-7xl">{["🥖", "🧈", "🥬", "🍅", "🧀", "🥩"][result - 1]}</span>
                  <div className="text-center">
                    <span className="block text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                      {result}
                    </span>
                    <span className="block text-lg text-amber-300 font-bold mt-2">
                      {getResultMessage(result)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}