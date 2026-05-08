import type { ReactNode } from "react";

/**
 * Subtle accent highlight for key terms in body copy.
 * Used to draw the eye to important nouns (CRM, Financeiro, Atendimento, etc.)
 * without being shouty.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="text-foreground font-semibold relative">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[2px] bg-accent/50 rounded-full"
      />
    </span>
  );
}
