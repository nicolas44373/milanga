import "./globals.css";

export const metadata = {
  title: "Juegos Next — Ruleta & Dado",
  description: "Menú de juegos con animaciones Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen text-slate-100">
        {children}
      </body>
    </html>
  );
}