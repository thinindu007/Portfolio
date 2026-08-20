import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experience, education } from "../lib/data";
import PipelineChip from "./PipelineChip";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const height = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const scaleY = useTransform(height, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="relative px-6 py-16 md:py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-signal-indigo">
            04 / TIMELINE
          </span>
          <span className="h-px flex-1 bg-obsidian-border" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl font-display text-3xl text-ink md:text-4xl"
        >
          From first internship to production release
        </motion.h2>

        <div ref={ref} className="relative pl-10">
          <div className="absolute left-[7px] top-1 h-full w-px bg-obsidian-border" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[7px] top-1 h-full w-px bg-gradient-to-b from-signal-indigo to-signal-teal"
          />

          <div className="flex flex-col gap-16">
            {experience.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-signal-indigo bg-obsidian" />
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-ink-faint">
                    {role.period}
                  </span>
                  <PipelineChip stage={role.stage} />
                </div>
                <h3 className="font-display text-xl text-ink">{role.role}</h3>
                <p className="mt-1 text-sm text-signal-indigo">
                  {role.company}
                  {"link" in role && role.link ? (
                    <span className="text-ink-faint"> · {role.link}</span>
                  ) : null}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid gap-6 border-t border-obsidian-border pt-14 pl-10 md:pl-0 md:grid-cols-2"
        >
          {education.map((e) => (
            <div key={e.id}>
              <span className="font-mono text-xs text-ink-faint">
                {e.period}
              </span>
              <h4 className="mt-2 font-display text-lg text-ink">
                {e.institution}
              </h4>
              <p className="mt-1 text-sm text-ink-muted">{e.program}</p>
              <p className="mt-1 text-sm text-ink-faint">{e.note}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
