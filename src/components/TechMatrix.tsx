import { motion } from "framer-motion";
import { skills } from "../lib/data";

export default function TechMatrix() {
  const categories = Object.entries(skills);

  return (
    <section id="stack" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-signal-indigo">
            02 / STACK
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
          The technical matrix
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map(([category, items], colIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: colIdx * 0.08 }}
              className="rounded-2xl border border-obsidian-border p-6"
            >
              <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 20px rgba(110,123,255,0.35)",
                    }}
                    className="cursor-default rounded-full border border-obsidian-border bg-obsidian-surface px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-signal-indigo hover:text-signal-indigo"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
