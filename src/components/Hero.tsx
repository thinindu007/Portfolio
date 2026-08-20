import { motion } from "framer-motion";
import { ArrowDownRight, CircleDot } from "lucide-react";
import MagneticButton from "./MagneticButton";
import PipelineChip from "./PipelineChip";
import { profile } from "../lib/data";

const headline = "Building software that ships,";
const headline2 = "not just software that runs.";

function RevealWord({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}&nbsp;
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-28 md:px-12"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:items-center">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-signal-teal">
              <CircleDot className="h-3 w-3 animate-pulse" strokeWidth={2.5} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
            <span className="glass rounded-full px-3 py-1.5">
              <PipelineChip stage="PROD" />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10, color: "#6e7bff" }}
            animate={{
              opacity: 1,
              y: 0,
              color: ["#6e7bff", "#b9bdf7", "#38bdf8", "#6e7bff"]
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.25 },
              y: { duration: 0.6, delay: 0.25 },
              color: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-4 font-display text-2xl font-medium md:text-3xl"
          >
            {profile.name}
          </motion.h2>

          <h1 className="max-w-5xl font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-[9vw] md:text-[5vw] lg:text-[4.5vw]">
            <RevealWord delay={0.3}>{headline}</RevealWord>
            <br />
            <span className="text-gradient">
              <RevealWord delay={0.45}>{headline2}</RevealWord>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              as="a"
              href="#work"
              className="group rounded-full bg-signal-indigo px-7 py-3.5 text-sm font-medium text-obsidian shadow-glow transition-shadow hover:shadow-glowSm"
            >
              <span className="flex items-center gap-2">
                View the work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </span>
            </MagneticButton>
            <a
              href="#timeline"
              className="font-mono text-xs tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
            >
              3 years / 3 roles / 4 environments →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xs md:w-1/2 md:max-w-sm lg:max-w-md xl:max-w-lg md:-translate-x-24 lg:-translate-x-40 xl:-translate-x-48"
        >
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 rounded-full bg-signal-indigo/20 blur-3xl"></div>
            <img
              src="/assets/portfoliobackground.jpeg"
              alt="Profile Avatar"
              className="relative h-full w-full rounded-full object-cover shadow-2xl border border-obsidian-border"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 left-6 hidden font-mono text-[11px] text-ink-faint md:block md:left-12"
      >
        {profile.location} · GMT+5:30
      </motion.div>
    </section>
  );
}
