"use client";
import { motion } from "framer-motion";
import Link from "next/link";


export default function GameCard({
href,
title,
subtitle,
emoji,
}: {
href: string;
title: string;
subtitle: string;
emoji: string;
}) {
return (
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
className="relative overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-white/10 shadow-xl"
>
<Link href={href} className="block p-6 md:p-8">
<div className="flex items-center gap-4">
<div className="text-5xl md:text-6xl">{emoji}</div>
<div>
<h3 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h3>
<p className="text-slate-300/90 text-sm md:text-base">{subtitle}</p>
</div>
</div>
</Link>
<div className="pointer-events-none absolute inset-px rounded-2xl ring-1 ring-white/10" />
<div className="pointer-events-none absolute -inset-40 translate-x-10 translate-y-10 rotate-12 bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/10 to-sky-500/10 blur-2xl" />
</motion.div>
);
}