import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600; // Edge cache for 1 hour

async function getProject(slug: string) {
  return await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  if (!project) return { title: 'Not Found' };
  
  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      images: project.coverImage ? [urlFor(project.coverImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-bone)] selection:bg-[var(--color-acid)] selection:text-[var(--color-carbon)] p-4 md:p-12">
      <nav className="mb-24 reveal">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[var(--color-silver)] hover:text-[var(--color-acid)] transition-colors uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Base
        </Link>
      </nav>

      <header className="mb-24 border-b border-[var(--color-silver)]/30 pb-12 reveal">
        <span className="font-mono text-[var(--color-acid)] tracking-widest text-sm mb-4 block uppercase">Project // {project.title}</span>
        <h1 className="font-cabinet text-6xl md:text-[10rem] uppercase leading-none tracking-tighter break-words">
          {project.title}
        </h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-12 reveal">
        <div className="md:col-span-4 font-mono text-[var(--color-silver)] text-sm flex flex-col gap-8">
          <div>
            <h3 className="text-[var(--color-bone)] mb-2">CLIENT</h3>
            <p>{project.client || "TBD"}</p>
          </div>
          <div>
            <h3 className="text-[var(--color-bone)] mb-2">ROLE</h3>
            <p>{project.role || "TBD"}</p>
          </div>
          {project.liveUrl && (
            <div>
              <h3 className="text-[var(--color-bone)] mb-2">LIVE</h3>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--color-acid)] hover:underline break-all">
                View Site ↗
              </a>
            </div>
          )}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-8 border-t border-[var(--color-silver)]/30 pt-8">
              {project.metrics.map((m: any, i: number) => (
                <div key={i} className="mb-4">
                  <h3 className="text-[var(--color-bone)] mb-1 uppercase tracking-widest text-xs">{m.label}</h3>
                  <p className="text-[var(--color-acid)] text-2xl font-cabinet">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-8">
          {project.coverImage ? (
             <div className="aspect-video w-full bg-[var(--color-graphite)] border border-[var(--color-silver)]/30 mb-12 relative overflow-hidden">
               <Image 
                 src={urlFor(project.coverImage).url()} 
                 alt={project.title} 
                 fill 
                 className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
               />
             </div>
          ) : (
            <div className="aspect-video w-full bg-[var(--color-graphite)] border border-[var(--color-silver)]/30 mb-12 flex items-center justify-center">
              <span className="font-mono text-[var(--color-silver)]">[ MEDIA PLACEHOLDER ]</span>
            </div>
          )}
          
          <article className="prose prose-invert max-w-none font-geist text-lg text-[var(--color-silver)] leading-relaxed flex flex-col gap-12">
            <p className="font-cabinet text-3xl md:text-5xl text-[var(--color-bone)] leading-tight">
              {project.overview || "Overview pending..."}
            </p>
            
            {project.challenge && (
              <div>
                <h4 className="font-mono text-[var(--color-acid)] mb-4 text-sm tracking-widest uppercase">// THE CHALLENGE</h4>
                <p>{project.challenge}</p>
              </div>
            )}
            
            {project.solution && (
              <div>
                <h4 className="font-mono text-[var(--color-acid)] mb-4 text-sm tracking-widest uppercase">// THE SOLUTION</h4>
                <p>{project.solution}</p>
              </div>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
