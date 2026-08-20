import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { references, socials } from "../lib/data";

function FloatingField({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const Field = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <Field
        id={id}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full resize-none border-b border-obsidian-border bg-transparent py-3 text-ink outline-none transition-colors focus:border-signal-indigo"
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: floated ? -22 : 0,
          scale: floated ? 0.82 : 1,
          color: floated ? "#6E7BFF" : "#8B8C93",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 top-3 origin-left font-mono text-sm tracking-wide"
      >
        {label}
      </motion.label>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-signal-indigo">
            05 / CONTACT
          </span>
          <span className="h-px flex-1 bg-obsidian-border" />
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="max-w-md font-display text-3xl leading-tight text-ink md:text-4xl"
            >
              Have a role, a project, or an idea worth building?
            </motion.h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              I'm currently finishing my final year at University of
              Westminster while working full-time — always open to a
              conversation about mobile engineering, deployment tooling, or
              full-stack roles.
            </p>

            <div className="mt-10 flex gap-4">
              <MagneticButton
                as="a"
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="glass h-12 w-12 rounded-full text-ink transition-colors hover:text-signal-indigo"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass h-12 w-12 rounded-full text-ink transition-colors hover:text-signal-indigo"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={socials.email}
                className="glass h-12 w-12 rounded-full text-ink transition-colors hover:text-signal-indigo"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </MagneticButton>
            </div>

            <div className="mt-16">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">
                References
              </span>
              <div className="mt-4 flex flex-col gap-4">
                {references.map((r) => (
                  <div key={r.name} className="flex items-baseline gap-3">
                    <span className="text-sm text-ink">{r.name}</span>
                    <span className="h-px flex-1 border-t border-dashed border-obsidian-border" />
                    <span className="text-right text-xs text-ink-muted">
                      {r.title}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-ink-faint">
                  Full contact details available on request.
                </p>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
            className="glass flex flex-col gap-8 rounded-2xl p-8"
          >
            <FloatingField id="name" label="Your name" />
            <FloatingField id="email" label="Email address" type="email" />
            <FloatingField id="message" label="What are you building?" textarea />
            <MagneticButton
              type="submit"
              className="group mt-2 w-fit rounded-full bg-signal-indigo px-6 py-3 text-sm font-medium text-obsidian shadow-glow"
            >
              <span className="flex items-center gap-2">
                Send message
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </MagneticButton>
          </motion.form>
        </div>

        <div className="mt-28 flex flex-col items-center justify-between gap-4 border-t border-obsidian-border pt-8 font-mono text-xs text-ink-faint md:flex-row">
          <span>© {new Date().getFullYear()} Thinindu Akuranthilake</span>
          <span>Built with React · Tailwind · Framer Motion</span>
        </div>
      </div>
    </section>
  );
}
