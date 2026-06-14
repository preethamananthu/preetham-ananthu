"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight, Target, Zap, Activity } from "lucide-react";
import { Scene } from "@/components/scene";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Visual Textures
const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const Crosshair = ({ className }: { className?: string }) => (
  <svg className={`w-8 h-8 text-[var(--color-silver)] ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const Starburst = ({ className }: { className?: string }) => (
  <svg className={`w-16 h-16 text-[var(--color-acid)] ${className}`} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 0L54.5 45.5L100 50L54.5 54.5L50 100L45.5 54.5L0 50L45.5 45.5L50 0Z" />
  </svg>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const problemContainerRef = useRef<HTMLDivElement>(null);
  const problemScrollRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const processContainerRef = useRef<HTMLDivElement>(null);
  const processLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text reveals
      gsap.utils.toArray<HTMLElement>("h1, h2, .text-reveal").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            },
          }
        );
      });

      // 2. Horizontal Scroll for Scene 02 (The Problem) - FIXED
      if (problemContainerRef.current && problemScrollRef.current) {
        const scrollWidth = problemScrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = scrollWidth - viewportWidth;

        gsap.to(problemScrollRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: problemContainerRef.current,
            start: "top top",
            end: () => "+=" + scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // 3. Infinite Marquee for Scene 07 (Capabilities)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }

      // 4. Parallax sections
      gsap.utils.toArray<HTMLElement>(".parallax-section").forEach((section) => {
        gsap.fromTo(
          section,
          { yPercent: 0 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // 5. Process sticky pinning logic (Scene 06)
      if (processContainerRef.current && processLeftRef.current) {
        ScrollTrigger.create({
          trigger: processContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: processLeftRef.current,
          pinSpacing: false,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--color-carbon)]">
      <Scene />

      <div className="relative z-10 w-full pointer-events-auto">
        {/* [ 01 ] Scene: Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 md:px-12 text-center bg-transparent relative overflow-hidden">
          <GridPattern />
          <Crosshair className="absolute top-8 left-8" />
          <Crosshair className="absolute bottom-8 right-8" />
          
          <div className="max-w-5xl relative z-10">
            <span className="font-mono text-[var(--color-silver)] tracking-widest text-sm mb-8 block">[ 01 ] THE HOOK</span>
            <h1 className="text-5xl md:text-8xl md:text-[7rem] leading-[0.9] mb-12 relative">
              Most business websites are forgettable.<br />
              <span className="text-[var(--color-silver)]">I build websites businesses remember.</span>
              <Starburst className="absolute -top-12 -right-12 hidden md:block" />
            </h1>
            <div className="flex justify-center mt-12">
              <MagneticButton>
                <span className="flex items-center gap-2">Start a Project <ArrowUpRight className="w-5 h-5" /></span>
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* [ 02 ] Scene: The Problem */}
        <section ref={problemContainerRef} className="h-screen w-full flex items-center bg-[var(--color-graphite)] overflow-hidden relative border-y border-[var(--color-silver)]/30">
          <GridPattern />
          <div className="px-4 md:px-12 absolute top-12 left-0 z-10">
            <h2 className="font-mono text-[var(--color-silver)]">[ 02 ] THE PROBLEM</h2>
          </div>
          <div ref={problemScrollRef} className="flex gap-12 px-12 items-center h-full whitespace-nowrap pt-24 w-max">
            <div className="w-[80vw] md:w-[50vw] h-[60vh] shrink-0 border border-[var(--color-silver)] flex flex-col justify-center p-12 bg-[var(--color-carbon)] relative group overflow-hidden">
              <span className="font-mono text-[var(--color-acid)] mb-4 flex items-center gap-2"><Target className="w-5 h-5" /> SYMPTOM 01</span>
              <h3 className="font-cabinet text-5xl md:text-7xl whitespace-normal break-words">Generic Templates</h3>
              <p className="text-[var(--color-silver)] text-xl mt-4 whitespace-normal break-words max-w-md">Your site looks like your competitors. There is no brand distinction.</p>
              <Crosshair className="absolute bottom-4 right-4 opacity-50" />
            </div>
            <div className="w-[80vw] md:w-[50vw] h-[60vh] shrink-0 border border-[var(--color-silver)] flex flex-col justify-center p-12 bg-[var(--color-carbon)] relative group overflow-hidden">
              <span className="font-mono text-[var(--color-acid)] mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> SYMPTOM 02</span>
              <h3 className="font-cabinet text-5xl md:text-7xl whitespace-normal break-words">Poor Performance</h3>
              <p className="text-[var(--color-silver)] text-xl mt-4 whitespace-normal break-words max-w-md">Bloated code and heavy unoptimized assets are killing your SEO and bounce rates.</p>
              <Crosshair className="absolute bottom-4 right-4 opacity-50" />
            </div>
            <div className="w-[80vw] md:w-[50vw] h-[60vh] shrink-0 border border-[var(--color-silver)] flex flex-col justify-center p-12 bg-[var(--color-carbon)] relative group overflow-hidden">
              <span className="font-mono text-[var(--color-acid)] mb-4 flex items-center gap-2"><Zap className="w-5 h-5" /> SYMPTOM 03</span>
              <h3 className="font-cabinet text-5xl md:text-7xl whitespace-normal break-words">Zero Conversions</h3>
              <p className="text-[var(--color-silver)] text-xl mt-4 whitespace-normal break-words max-w-md">Traffic comes in, but no one takes action due to a fragmented user journey.</p>
              <Crosshair className="absolute bottom-4 right-4 opacity-50" />
            </div>
          </div>
        </section>

        {/* [ 03 ] Scene: About */}
        <section className="min-h-screen flex items-center px-4 md:px-12 bg-transparent relative">
          <div className="absolute inset-y-0 right-12 w-px bg-[var(--color-silver)]/30 hidden md:block" />
          <div className="absolute inset-y-0 right-48 w-px bg-[var(--color-silver)]/30 hidden md:block" />
          
          <div className="max-w-5xl">
            <h2 className="font-mono text-[var(--color-silver)] mb-12 flex items-center gap-4">
              [ 03 ] ABOUT <span className="h-px w-24 bg-[var(--color-silver)] inline-block" />
            </h2>
            <p className="text-reveal font-cabinet text-4xl md:text-7xl leading-[1.1]">
              Designer. Developer. Problem Solver. <br/>
              <span className="text-[var(--color-silver)]">I bridge the gap between aesthetics and performance.</span>
            </p>
          </div>
        </section>

        {/* [ 04 ] Scene: Services */}
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 bg-[var(--color-graphite)] parallax-section border-t border-[var(--color-silver)]/30 relative">
          <GridPattern />
          <h2 className="font-mono text-[var(--color-silver)] mb-12 relative z-10">[ 04 ] SERVICES</h2>
          <ul className="w-full text-5xl md:text-8xl font-cabinet flex flex-col gap-0 relative z-10">
            {["Portfolio", "Business", "UI/UX", "Brand"].map((service, idx) => (
              <li key={idx} className="group flex items-center justify-between hover:text-[var(--color-acid)] transition-colors cursor-pointer border-b border-[var(--color-silver)]/30 py-8">
                <span className="text-reveal uppercase">{service}</span>
                <ArrowRight className="w-12 h-12 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </li>
            ))}
          </ul>
        </section>

        {/* [ 05 ] Scene: Featured Case Study */}
        <section className="min-h-screen pt-32 pb-32 px-4 md:px-12 bg-transparent">
          <div className="w-full">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-mono text-[var(--color-silver)]">[ 05 ] FEATURED CASE STUDY</h2>
              <span className="font-mono text-[var(--color-acid)] border border-[var(--color-acid)] px-4 py-1 rounded-full text-sm">LIVE</span>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* Hero Image */}
              <div className="aspect-[21/9] w-full border border-[var(--color-silver)] relative overflow-hidden group cursor-pointer bg-[var(--color-graphite)]">
                <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" 
                  alt="thegreyarea.in architecture"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <h3 className="font-cabinet text-6xl md:text-9xl text-[var(--color-bone)] uppercase">thegreyarea.in</h3>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-silver)]/30 border border-[var(--color-silver)]/30">
                <div className="bg-[var(--color-carbon)] p-8 flex flex-col justify-center">
                  <span className="font-mono text-[var(--color-silver)] text-sm mb-2">PAGE SPEED</span>
                  <span className="font-cabinet text-4xl md:text-5xl text-[var(--color-acid)]">99/100</span>
                </div>
                <div className="bg-[var(--color-carbon)] p-8 flex flex-col justify-center">
                  <span className="font-mono text-[var(--color-silver)] text-sm mb-2">CONVERSION</span>
                  <span className="font-cabinet text-4xl md:text-5xl text-[var(--color-bone)]">+340%</span>
                </div>
                <div className="bg-[var(--color-carbon)] p-8 flex flex-col justify-center">
                  <span className="font-mono text-[var(--color-silver)] text-sm mb-2">BOUNCE RATE</span>
                  <span className="font-cabinet text-4xl md:text-5xl text-[var(--color-bone)]">-45%</span>
                </div>
                <div className="bg-[var(--color-carbon)] p-8 flex flex-col justify-center">
                  <span className="font-mono text-[var(--color-silver)] text-sm mb-2">AWARDS</span>
                  <span className="font-cabinet text-4xl md:text-5xl text-[var(--color-acid)]">SOTD</span>
                </div>
              </div>

              {/* Split Screen Problem/Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="border border-[var(--color-silver)]/30 p-12 bg-[var(--color-graphite)] relative overflow-hidden">
                  <GridPattern />
                  <h4 className="font-mono text-[var(--color-silver)] mb-4 relative z-10">THE PROBLEM</h4>
                  <p className="text-xl md:text-2xl font-cabinet leading-relaxed relative z-10">
                    A disjointed brand identity paired with an outdated tech stack caused severe drop-offs at critical checkout stages.
                  </p>
                </div>
                <div className="border border-[var(--color-silver)]/30 p-12 bg-[var(--color-carbon)] relative overflow-hidden">
                  <Starburst className="absolute -top-8 -right-8 opacity-20" />
                  <h4 className="font-mono text-[var(--color-acid)] mb-4 relative z-10">THE SOLUTION</h4>
                  <p className="text-xl md:text-2xl font-cabinet leading-relaxed relative z-10">
                    Rebuilt from the ground up using Next.js & Framer Motion, introducing a magnetic UX that naturally guided users to conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* [ 06 ] Scene: Process */}
        <section ref={processContainerRef} className="min-h-screen flex flex-col md:flex-row items-start px-4 md:px-12 bg-[var(--color-graphite)] border-t border-[var(--color-silver)]/30">
          <div ref={processLeftRef} className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center pt-32 md:pt-0">
            <h2 className="font-mono text-[var(--color-silver)] text-2xl md:text-4xl">[ 06 ] THE PROCESS</h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-[30vh] pt-[20vh] pb-[30vh]">
            <div className="text-reveal border-l border-[var(--color-acid)] pl-8">
              <span className="font-mono text-[var(--color-acid)]">PHASE 01</span>
              <h3 className="font-cabinet text-5xl md:text-7xl mb-4 mt-2">Discovery</h3>
              <p className="text-xl text-[var(--color-silver)]">Auditing the existing ecosystem, defining goals, and establishing the brutalist narrative.</p>
            </div>
            <div className="text-reveal border-l border-[var(--color-silver)] pl-8 hover:border-[var(--color-acid)] transition-colors duration-500">
              <span className="font-mono text-[var(--color-silver)]">PHASE 02</span>
              <h3 className="font-cabinet text-5xl md:text-7xl mb-4 mt-2">Architecture</h3>
              <p className="text-xl text-[var(--color-silver)]">Wireframing flows and establishing the Next.js component system.</p>
            </div>
            <div className="text-reveal border-l border-[var(--color-silver)] pl-8 hover:border-[var(--color-acid)] transition-colors duration-500">
              <span className="font-mono text-[var(--color-silver)]">PHASE 03</span>
              <h3 className="font-cabinet text-5xl md:text-7xl mb-4 mt-2">Creative Dev</h3>
              <p className="text-xl text-[var(--color-silver)]">Injecting WebGL, GSAP timelines, and Framer Motion micro-interactions.</p>
            </div>
            <div className="text-reveal border-l border-[var(--color-silver)] pl-8 hover:border-[var(--color-acid)] transition-colors duration-500">
              <span className="font-mono text-[var(--color-silver)]">PHASE 04</span>
              <h3 className="font-cabinet text-5xl md:text-7xl mb-4 mt-2">Launch</h3>
              <p className="text-xl text-[var(--color-silver)]">Performance optimization, SEO setup, and production deployment.</p>
            </div>
          </div>
        </section>

        {/* [ 07 ] Scene: Capabilities */}
        <section className="h-[50vh] flex items-center overflow-hidden whitespace-nowrap bg-[var(--color-acid)] text-[var(--color-carbon)] border-y-8 border-[var(--color-carbon)]">
          <div ref={marqueeRef} className="font-cabinet text-7xl md:text-[10rem] font-black tracking-tighter flex gap-8 w-max uppercase">
            <span className="shrink-0 flex items-center gap-8">
              FRONTEND ARCHITECTURE <Crosshair /> WEBGL <Crosshair /> CREATIVE DEVELOPMENT <Crosshair />
            </span>
            <span className="shrink-0 flex items-center gap-8">
              FRONTEND ARCHITECTURE <Crosshair /> WEBGL <Crosshair /> CREATIVE DEVELOPMENT <Crosshair />
            </span>
          </div>
        </section>

        {/* [ 08 ] Scene: Technology */}
        <section className="min-h-screen flex items-center px-4 md:px-12 bg-[var(--color-carbon)] relative">
          <div className="w-full">
            <h2 className="font-mono text-[var(--color-silver)] mb-12">[ 08 ] TECHNOLOGY</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-silver)]/30 border border-[var(--color-silver)]/30">
              {["Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "GSAP", "Framer Motion", "Lenis", "React Three Fiber"].map((tech, i) => (
                <div key={i} className="text-reveal bg-[var(--color-carbon)] p-8 flex items-center justify-center h-48 hover:bg-[var(--color-graphite)] transition-colors">
                  <span className="font-mono text-xl text-center flex flex-col items-center gap-4">
                    <Crosshair className="w-4 h-4 opacity-30" />
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [ 09 ] Scene: Contact */}
        <section className="min-h-screen flex flex-col justify-between px-4 md:px-12 py-12 bg-[var(--color-graphite)] parallax-section relative z-20 overflow-hidden">
          <GridPattern />
          <h2 className="font-mono text-[var(--color-silver)] relative z-10">[ 09 ] CONTACT</h2>
          <div className="mt-auto relative z-10">
            <h1 className="text-5xl md:text-[8rem] leading-none tracking-tighter mb-12 uppercase">
              Let's build something<br/>worth remembering.
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-end justify-between border-t border-[var(--color-silver)]/50 pt-8">
              <div className="font-mono text-[var(--color-silver)]">
                © {new Date().getFullYear()} Preetham <br/>
                <span className="text-[var(--color-bone)]">PREMIUM DIGITAL ARCHITECTURE</span>
              </div>
              <MagneticButton className="bg-[var(--color-acid)] text-[var(--color-carbon)]">
                <span className="flex items-center gap-2">Initiate Transmission <ArrowUpRight className="w-5 h-5" /></span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
