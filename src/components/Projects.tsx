import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "../lib/data";
import PipelineChip from "./PipelineChip";

function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative mt-4 overflow-hidden border-t border-obsidian-border py-3">
      <motion.div
        className="flex gap-6 whitespace-nowrap font-mono text-[11px] tracking-[0.1em] text-ink-faint"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((tech, i) => (
          <span key={`${tech}-${i}`} className="flex items-center gap-6">
            {tech}
            <span className="text-signal-indigo/50">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-signal-indigo">
            03 / WORK
          </span>
          <span className="h-px flex-1 bg-obsidian-border" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl font-display text-3xl text-ink md:text-4xl"
        >
          Featured projects
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              layoutId={`card-${p.id}`}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-obsidian-border bg-obsidian-surface/40 p-6 text-left transition-colors hover:border-signal-indigo/50"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-ink-faint">
                  {p.year}
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-indigo" />
              </div>
              <motion.h3
                layoutId={`title-${p.id}`}
                className="mt-4 font-display text-xl text-ink"
              >
                {p.title}
              </motion.h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                {p.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-xs text-signal-teal">
                  {p.metric}
                </span>
                <PipelineChip stage={p.stage} />
              </div>
              <Marquee items={p.stack} />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-lg rounded-2xl p-8"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 rounded-full p-1.5 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs text-ink-faint">
                {active.year}
              </span>
              <motion.h3
                layoutId={`title-${active.id}`}
                className="mt-3 font-display text-2xl text-ink"
              >
                {active.title}
              </motion.h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {active.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-obsidian-border px-3 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-obsidian-border pt-5">
                <span className="font-mono text-xs text-signal-teal">
                  {active.metric}
                </span>
                <PipelineChip stage={active.stage} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
