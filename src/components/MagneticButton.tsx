import { useRef, useState, type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  strength?: number;
  [key: string]: unknown;
};

export default function MagneticButton({
  children,
  className,
  as = "button",
  strength = 0.35,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const Component = motion(as as "button");

  const handleMove = (e: React.MouseEvent) => {
    // Disable magnetic effect on touch devices to prevent double-tap issues
    if (window.matchMedia("(hover: none)").matches) return;
    
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const handleLeave = () => {
    if (window.matchMedia("(hover: none)").matches) return;
    setPos({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
