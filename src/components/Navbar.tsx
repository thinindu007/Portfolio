import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 z-50 flex w-full justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/20" : "border border-transparent"
          }`}
        >
          <a
            href="#top"
            className="font-mono text-xs tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
          >
            T.AKURANTHILAKE
          </a>
          
          <ul className="hidden gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="hidden md:block">
            <a
              href="#contact"
              className="rounded-full border border-obsidian-border px-4 py-1.5 text-xs font-medium text-ink transition-colors hover:border-signal-indigo hover:text-signal-indigo"
            >
              Let's talk
            </a>
          </div>

          <button
            className="md:hidden text-ink-muted hover:text-ink"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#08080a]/95 px-6 backdrop-blur-md"
          >
            <button
              className="absolute right-6 top-8 text-ink-muted hover:text-ink"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>
            <ul className="flex flex-col items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-3xl text-ink transition-colors hover:text-signal-indigo"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 inline-block rounded-full border border-signal-indigo px-8 py-3 text-sm font-medium text-signal-indigo transition-colors hover:bg-signal-indigo hover:text-obsidian"
                >
                  Let's talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
