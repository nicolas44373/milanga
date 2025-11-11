export type Prize = { label: string; color: string; weight?: number };


// Puedes editar colores/labels libremente (sin DB)
export const ROULETTE_PRIZES: Prize[] = [
{ label: "Premio $500", color: "#FF6B6B" },
{ label: "Sigue jugando", color: "#F7B267" },
{ label: "Premio $1000", color: "#4D96FF" },
{ label: "2x Spin", color: "#6BCB77" },
{ label: "Nada", color: "#FFD93D" },
{ label: "Premio $200", color: "#845EC2" },
{ label: "Premio $2000", color: "#00C9A7" },
{ label: "Pierde turno", color: "#C34A36" },
];