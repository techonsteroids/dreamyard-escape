import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

const baseBtn =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 [transition-timing-function:var(--ease-cinematic)] disabled:opacity-50";

export const btn = {
  solid: cn(baseBtn, "bg-primary text-primary-foreground hover:bg-terracotta"),
  accent: cn(baseBtn, "bg-terracotta text-primary-foreground hover:bg-primary"),
  outline: cn(
    baseBtn,
    "border border-border bg-transparent text-foreground hover:border-terracotta hover:text-terracotta",
  ),
  ghostLight: cn(
    baseBtn,
    "border border-ivory/40 bg-ivory/5 text-ivory backdrop-blur-md hover:bg-ivory hover:text-ink",
  ),
};

export function Arrow({ dir = "right" }: { dir?: "right" | "down" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-500 [transition-timing-function:var(--ease-cinematic)]",
        dir === "right" ? "group-hover:translate-x-1.5" : "group-hover:translate-y-1",
      )}
    >
      {dir === "right" ? "→" : "↓"}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <h2 id={id} className="display-lg text-balance">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
