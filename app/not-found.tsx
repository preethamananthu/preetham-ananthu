import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-bone)] flex flex-col items-center justify-center p-4 selection:bg-[var(--color-acid)] selection:text-[var(--color-carbon)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1\'/%3E%3C/svg%3E")' }} />
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <span className="font-mono text-[var(--color-acid)] tracking-widest text-sm mb-8 block uppercase">[ ERROR // 404 ]</span>
        <h1 className="font-cabinet text-8xl md:text-[15rem] leading-none uppercase tracking-tighter mb-8 text-[var(--color-graphite)]" style={{ WebkitTextStroke: '1px var(--color-silver)' }}>
          VOID
        </h1>
        <p className="font-geist text-xl md:text-2xl text-[var(--color-silver)] max-w-lg mb-12">
          The coordinates you entered lead to a dead zone. This sector does not exist.
        </p>
        
        <Link href="/" className="group relative flex items-center justify-center border border-[var(--color-silver)] px-8 py-4 text-sm font-mono tracking-widest text-[var(--color-bone)] hover:border-[var(--color-acid)] hover:text-[var(--color-acid)] transition-colors bg-[var(--color-carbon)]">
          <span className="flex items-center gap-4">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            RETURN TO BASE
          </span>
        </Link>
      </div>
    </div>
  );
}
