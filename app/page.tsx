'use client';
import { useEffect, useState } from 'react';

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

export default function Page() {
  const [displayText, setDisplayText] = useState('');
  const message = "Hey, I'm Nikki, what's up?";

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
    <main className="min-h-screen bg-[#0b0b0f] text-violet-100">
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Typing headline */}
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-violet-100">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Intro */}
        <header className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">My Portfolio</h2>
          <p className="mt-3 max-w-2xl text-violet-200/80">
            I’m Nikki Rana, born and raised in Cambridge, now studying Systems Design
            Engineering at the University of Waterloo. I focus on human factors—the
            intersection of product, design, and how people actually experience tech.
            I like the tiny details that make things easier and the bigger picture of
            how design shapes lives. Outside of school I’ve organized coding
            competitions, mentored across programs, joined panels, and when I’m not
            doing something vaguely productive, I’m probably annoying my older
            siblings or cooking.
          </p>
        </header>

        {/* Projects */}
        <section className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-violet-200">Projects</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl border border-neutral-800/60 bg-black/20 p-5 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* Image placeholder (replace with <Image> later if you have files) */}
                <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900">
                  <div className="flex h-48 items-center justify-center text-sm text-neutral-400">
                    (Project image here)
                  </div>
                </div>

                <h4 className="text-xl font-semibold tracking-tight text-violet-200">
                  {p.title}
                </h4>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-violet-300/90">
                  {p.subtitle && (
                    <span className="text-violet-300/80">{p.subtitle}</span>
                  )}
                  {p.links && p.links.length > 0 && (
                    <>
                      <span aria-hidden="true" className="text-violet-400/40">
                        •
                      </span>
                      <nav
                        aria-label={`${p.title} links`}
                        className="flex flex-wrap gap-2"
                      >
                        {p.links.map((l) => (
                          <a
                            key={l.href + l.label}
                            href={l.href}
                            className="underline decoration-violet-500/50 underline-offset-2 hover:text-violet-100 hover:decoration-violet-300"
                            target={l.href.startsWith('/') ? '_self' : '_blank'}
                            rel={
                              l.href.startsWith('/') ? undefined : 'noopener noreferrer'
                            }
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
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
