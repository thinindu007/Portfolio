import { motion } from "framer-motion";
import { profile } from "../lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-signal-indigo">
            01 / ABOUT
          </span>
          <span className="h-px flex-1 bg-obsidian-border" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-2xl font-normal leading-snug text-ink md:text-4xl"
        >
          I build across React, React Native, and Node/Express — shipping
          mobile apps and the APIs behind them, with the release pipeline treated
          as seriously as the code itself.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {profile.philosophy.map((p, i) => (
            <motion.div
              key={p.title}
              variants={item}
              className="group relative rounded-2xl border border-obsidian-border p-6 transition-colors hover:border-signal-indigo/40"
            >
              <span className="font-mono text-xs text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {p.body}
              </p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[inset_0_0_60px_rgba(110,123,255,0.08)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
