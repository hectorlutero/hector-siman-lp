"use client";

import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon | null;
  children: ReactNode;
  className?: string;
}

interface AnchorButtonProps extends CommonProps {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

interface ActionButtonProps extends CommonProps {
  onClick: () => void;
  type?: "button" | "submit";
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaLabel?: string;
}

type Props = AnchorButtonProps | ActionButtonProps;

const baseClass =
  "group inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all";

const sizeClass: Record<ButtonSize, string> = {
  md: "px-6 md:px-7 py-2 md:py-2.5 text-sm md:text-base rounded-full",
  lg: "px-8 md:px-10 py-2.5 md:py-3 text-base md:text-lg rounded-full",
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] hover:shadow-[0_0_32px_rgba(37,99,235,0.65),0_0_64px_rgba(124,58,237,0.2)] hover:-translate-y-0.5",
  secondary:
    "bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] hover:shadow-[0_0_32px_rgba(37,99,235,0.65),0_0_64px_rgba(124,58,237,0.2)] hover:-translate-y-0.5",
  tertiary:
    "text-accent hover:text-accent-light !px-0 !py-1 !rounded-none !shadow-none bg-transparent border-0 text-sm md:text-base",
};

function isAnchor(props: Props): props is AnchorButtonProps {
  return typeof (props as AnchorButtonProps).href === "string";
}

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    children,
    className = "",
  } = props;

  const TrailingIcon = trailingIcon === null ? null : trailingIcon ?? ArrowRight;
  const LeadingIcon = leadingIcon;

  const finalClass = `${baseClass} ${variant === "tertiary" ? "" : sizeClass[size]} ${variantClass[variant]} ${className}`.trim();

  const content = (
    <>
      {LeadingIcon ? <LeadingIcon size={16} strokeWidth={2.2} /> : null}
      <span>{children}</span>
      {TrailingIcon ? (
        <TrailingIcon
          size={16}
          strokeWidth={2.2}
          className={variant === "tertiary" ? "transition-transform group-hover:translate-x-1" : ""}
        />
      ) : null}
    </>
  );

  if (isAnchor(props)) {
    const { href, external, ariaLabel } = props;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={finalClass}
      >
        {content}
      </a>
    );
  }

  const { onClick, type = "button", ariaExpanded, ariaControls, ariaLabel } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      className={finalClass}
    >
      {content}
    </button>
  );
}
