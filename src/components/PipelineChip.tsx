import { pipelineStages } from "../lib/data";
import { cn } from "../lib/cn";

export default function PipelineChip({ stage }: { stage: string }) {
  const activeIndex = pipelineStages.indexOf(stage as (typeof pipelineStages)[number]);

  return (
    <div className="flex items-center gap-1 font-mono text-[10px] tracking-[0.15em]">
      {pipelineStages.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 transition-colors",
              i <= activeIndex
                ? "text-signal-teal"
                : "text-ink-faint"
            )}
          >
            {s}
          </span>
          {i < pipelineStages.length - 1 && (
            <span
              className={cn(
                "h-px w-3",
                i < activeIndex ? "bg-signal-teal/60" : "bg-obsidian-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
