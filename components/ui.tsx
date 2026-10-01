import type { ReactNode } from "react";
import { logoGas, logoRec, logoViewBox } from "@/lib/logo";

/* The Gasrec wordmark, traced from the live logo. "gas" and "rec" are separate paths so they can take the two-tone
   colours seen on the vehicles and signage (CSS: --logo-gas, --logo-rec), or both follow currentColor. */
export function Logo({ className = "" }: { className?: string }) {
  return <svg className={`logo ${className}`} viewBox={logoViewBox} role="img" aria-label="Gasrec">
    <path className="logo-gas" d={logoGas} />
    <path className="logo-rec" d={logoRec} />
  </svg>;
}

export const Chevron = () => <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>;
export const ArrowUpRight = () => <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>;
export const ArrowRight = () => <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
export const Play = () => <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>;

/* airfieldlacaminera.com's ".button.button--icon": a solid block with an uppercase micro label and a square arrow
   cell divided by a hairline. On hover the fill changes and the arrow nudges, both on their hover curve. */
export function Btn({ href, children, tone = "light", icon = "chevron", className = "", onClick }: {
  href?: string; children: ReactNode; tone?: "light" | "dark" | "green" | "blue" | "navy" | "ghost"; icon?: "chevron" | "out" | "play"; className?: string; onClick?: () => void;
}) {
  const inner = <>
    <span className="btn-label">{children}</span>
    <span className="btn-icon">{icon === "out" ? <ArrowUpRight /> : icon === "play" ? <Play /> : <Chevron />}</span>
  </>;
  const cls = `btn btn--${tone} ${className}`;
  if (href) return <a className={cls} href={href}>{inner}</a>;
  return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`} data-reveal="label">{children}</p>;
}

/* Responsive photo from public/media: NAME.jpg is 2000px, NAME-s.jpg 900px (scripts/media.sh). */
export function Photo({ src, alt, sizes = "100vw", className = "", eager = false }: { src: string; alt: string; sizes?: string; className?: string; eager?: boolean }) {
  return <img className={className} src={`${src}.jpg`} srcSet={`${src}-s.jpg 900w, ${src}.jpg 2000w`} sizes={sizes} alt={alt}
    loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
