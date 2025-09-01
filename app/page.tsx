'use client';
import { useEffect, useRef, useState } from 'react';

/* ---- Minimal purple Sun/Moon icons (no external deps) ---- */
function SunIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-3.5a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V12.5a1 1 0 0 1 1-1Zm-12 0a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V12.5a1 1 0 0 1 1-1ZM5.76 6.82a1 1 0 0 1 1.41 0l1 1a1 1 0 1 1-1.41 1.41l-1-1a1 1 0 0 1 0-1.41Zm10.07 10.07a1 1 0 0 1 1.41 0l1 1a1 1 0 1 1-1.41 1.41l-1-1a1 1 0 0 1 0-1.41ZM4.5 12.5a1 1 0 0 1 1-1H7a1 1 0 1 1 0 2H5.5a1 1 0 0 1-1-1Zm10.07-4.27a1 1 0 0 1 0-1.41l1-1a1 1 0 1 1 1.41 1.41l-1 1a1 1 0 0 1-1.41 0Zm-8.66 8.66a1 1 0 0 1 0-1.41l1-1a1 1 0 0 1 1.41 1.41l-1 1a1 1 0 0 1-1.41 0Zm6.09 1.59a1 1 0 0 1 1-1H13a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

function MoonIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21 12.75A9.25 9.25 0 0 1 9.02 21a.75.75 0 0 1-.53-1.3 7.75 7.75 0 0 0 9.8-9.8.75.75 0 0 1 1.3-.53c.89.95 1.41 2.22 1.41 3.88Z" />
    </svg>
  );
}

/* ---- Theme toggler (class-based dark mode + persistence) ---- */
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const initialized = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

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

/* ---- Scroll reveal (subtle) ---- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
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
  const { theme, setTheme } = useTheme();

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
    // Original solid bg; soft purple glow only in dark mode
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900 dark:bg-[#0b0b0f] dark:text-violet-100">
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_0%,rgba(168,85,247,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(500px_260px_at_100%_20%,rgba(139,92,246,0.12),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Theme toggle (minimal, purple, icons) */}
        <div className="mb-6 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-purple-700 shadow-sm transition hover:bg-purple-50 hover:shadow md:px-3.5 md:py-2 dark:border-neutral-800 dark:bg-black/40 dark:text-violet-200 dark:hover:bg-black/60"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-4 w-4 text-purple-500" />
            ) : (
              <MoonIcon className="h-4 w-4 text-purple-500" />
            )}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Typing headline */}
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Intro */}
        <header className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">My Portfolio</h2>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-violet-200/80">
            I’m Nikki Rana, born and raised in Cambridge, now studying Systems Design
            Engineering at the University of Waterloo. I focus on human factors—the
            intersection of product, design, and how people actually experience tech.
            I like the tiny details that make things easier and the bigger picture of
            how design shapes lives.
          </p>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-violet-200/80">
            Outside of school I’ve organized coding competitions, mentored across
            programs, joined panels, and when I’m not doing something vaguely
            productive, I’m probably annoying my older siblings or cooking.
          </p>
        </header>

        {/* Projects */}
        <section className="mt-6">
          <h3 className="mb-4 text-lg font-medium">Projects</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 80}>
                <article className="group rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-black/20 dark:hover:shadow-purple-500/10">
                  <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex h-48 items-center justify-center text-sm text-neutral-400">
                      (Project image here)
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold tracking-tight">{p.title}</h4>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    {p.subtitle && <span>{p.subtitle}</span>}
                    {p.links && p.links.length > 0 && (
                      <>
                        <span aria-hidden="true">•</span>
                        <nav className="flex flex-wrap gap-2">
                          {p.links.map((l) => (
                            <a
                              key={l.href + l.label}
                              href={l.href}
                              className="underline decoration-purple-400 underline-offset-2 hover:text-purple-600 dark:decoration-violet-500/50 dark:hover:text-violet-100 dark:hover:decoration-violet-300"
                            >
                              {l.label}
                            </a>
                          ))}
                        </nav>
                      </>
                    )}
                  </div>

                  {p.caption && (
                    <p className="mt-3 text-sm leading-relaxed">{p.caption}</p>
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
