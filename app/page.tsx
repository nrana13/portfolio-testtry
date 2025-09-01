'use client';
import { useEffect, useRef, useState } from 'react';

type Project = {
  title: string;
  subtitle?: string;
  caption?: string;
  links?: Array<{ label: string; href: string }>;
};

const projects: Project[] = [
  {
    title: 'CTPC Coding Tournament',
    subtitle: 'National student-run event · Ops, sponsorships, product',
    caption:
      'Scaled a cross-campus tournament; built ops workflows, sponsorship pipeline, and event tooling.',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Photos', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    title: 'Human Factors Mini Lab',
    subtitle: 'Usability studies · Task analysis · UI prototyping',
    caption:
      'Rapid studies on reach, visual angle, and interface flows; turned findings into design requirements.',
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Figma', href: '#' },
    ],
  },
  {
    title: 'Vim Essay',
    subtitle: 'Writing · Developer tooling',
    caption:
      'A defense of Vim’s longevity: efficiency, customizability, and a thriving community.',
    links: [
      { label: 'Read Post', href: '#' },
      { label: 'MDX Source', href: '#' },
    ],
  },
  {
    title: 'Portfolio Site',
    subtitle: 'Next.js · MDX · Tailwind',
    caption:
      'Personal site with MDX blog, lilac/black theme, and a simple project grid.',
    links: [
      { label: 'Live', href: '#' },
      { label: 'Repo', href: '#' },
    ],
  },
];

/** Subtle reveal on scroll */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setShown(true), obs.disconnect())),
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transform-gpu transition-all duration-500 ease-out will-change-[opacity,transform]',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export default function Page() {
  // Typewriter headline
  const [displayText, setDisplayText] = useState('');
  const message = "Hey, I'm Nikki Rana, what's up?";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayText(message.slice(0, i + 1));
      i++;
      if (i === message.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0b0f] text-violet-100">
      {/* FULL-SCREEN glow (fixed so it spans entire viewport, not just the content width) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Top-left haze */}
        <div className="absolute -left-40 -top-40 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16)_0%,transparent_70%)] blur-3xl" />
        {/* Right-side haze */}
        <div className="absolute -right-32 top-10 h-[55vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,transparent_70%)] blur-3xl" />
        {/* Bottom-center soft glow */}
        <div className="absolute bottom-[-20vh] left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.10)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Typing headline */}
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Intro */}
        <header className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">My Portfolio</h2>
          <p className="mt-3 max-w-2xl text-violet-200/80">
            I’m Nikki Rana, born and raised in Cambridge, now studying Systems
            Design Engineering at the University of Waterloo. I focus on human
            factors—the intersection of product, design, and how people actually
            experience tech. I like the tiny details that make things easier and
            the bigger picture of how design shapes lives.
          </p>
          <p className="mt-3 max-w-2xl text-violet-200/80">
            Outside of school I’ve organized coding competitions, mentored across
            programs, joined panels, and when I’m not doing something vaguely
            productive, I’m probably annoying my older siblings or cooking.
          </p>
        </header>

        {/* Projects */}
        <section className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-violet-200">Projects</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 80}>
                <article className="group rounded-2xl border border-neutral-800/60 bg-black/20 p-5 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                  {/* Image placeholder (swap for <Image> later) */}
                  <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900">
                    <div className="flex h-48 items-center justify-center text-sm text-neutral-400">
                      (Project image here)
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold tracking-tight text-violet-200">
                    {p.title}
                  </h4>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-violet-300/90">
                    {p.subtitle && <span className="text-violet-300/80">{p.subtitle}</span>}
                    {p.links && p.links.length > 0 && (
                      <>
                        <span aria-hidden="true" className="text-violet-400/40">•</span>
                        <nav aria-label={`${p.title} links`} className="flex flex-wrap gap-2">
                          {p.links.map((l) => (
                            <a
                              key={l.href + l.label}
                              href={l.href}
                              className="underline decoration-violet-500/50 underline-offset-2 hover:text-violet-100 hover:decoration-violet-300"
                            >
                              {l.label}
                            </a>
                          ))}
                        </nav>
                      </>
                    )}
                  </div>

                  {p.caption && (
                    <p className="mt-3 text-sm leading-relaxed text-violet-100/80">
                      {p.caption}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
