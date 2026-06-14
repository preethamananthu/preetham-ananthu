"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

const links = [
  { name: "HOME", target: "#home" },
  { name: "ABOUT", target: "#about" },
  { name: "WORK", target: "#work" },
  { name: "CONTACT", target: "#contact" },
];

export function Navigation() {
  const lenis = useLenis();
  const pathname = usePathname();

  const handleScroll = (target: string) => {
    lenis?.scrollTo(target, { 
      offset: 0, 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
  };

  if (pathname !== "/") return null;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-8 px-8 py-4 rounded-full bg-[var(--color-graphite)]/80 backdrop-blur-md border border-[var(--color-silver)]/30 font-mono text-sm tracking-widest text-[var(--color-silver)] shadow-2xl">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleScroll(link.target)}
            className="relative group hover:text-[var(--color-bone)] transition-colors"
          >
            {link.name}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--color-acid)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        ))}
      </div>
    </nav>
  );
}
