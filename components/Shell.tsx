"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Btn, Logo, Photo, reducedMotion } from "@/components/ui";
import { announcement, contact, contactLink, footer, nav } from "@/lib/content";
import { EASE_MOVE, EASE_OUT } from "@/lib/ease";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("move", EASE_MOVE);
  CustomEase.create("out", EASE_OUT);
}

/* Private demo rule: nothing on the page may leave it. Links keep their live gasrec.co.uk hrefs (so hover shows the
   real destination) but any click or middle-click on a non-anchor link is cancelled in the capture phase. */
function useLinkGuard() {
  useEffect(() => {
    const guard = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (link && !link.getAttribute("href")!.startsWith("#")) event.preventDefault();
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    return () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };
  }, []);
}

/* Lenis smooth scroll on the GSAP ticker, in-page anchors through Lenis, and the reveal set:
   label: 14px rise and fade   heading: 32px rise and fade   text: words slide up out of a mask
   card: batched rise and fade   image: clip opens from the bottom (La Caminera's .6s move curve, stretched)
   [data-parallax]: the image inside drifts about 8% against the scroll. */
function usePageMotion() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: .1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();
    const start = () => lenis.start();
    document.addEventListener("intro:done", start);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#top" ? null : document.querySelector<HTMLElement>(hash);
      if (hash !== "#top" && !target) return;
      event.preventDefault();
      lenis.scrollTo(target ?? 0, { offset: -72, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      target?.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("intro:done", start);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy(); setLenis(null);
    };
  }, []);

  useEffect(() => {
    const splits: { revert: () => void }[] = [];
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      const all = (kind: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${kind}"]:not(.hero [data-reveal])`);
      all("label").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 14 });
        ScrollTrigger.create({ trigger: el, start: "top 94%", once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: .6, ease: "out", clearProps: "transform" }) });
      });
      all("heading").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 32 });
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "out", clearProps: "transform" }) });
      });
      all("text").forEach((el) => {
        const split = splitWords(el); splits.push(split);
        gsap.set(split.inner, { yPercent: 105 });
        ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => gsap.to(split.inner, { yPercent: 0, duration: .75, ease: "out", stagger: Math.min(.012, .5 / split.inner.length) }) });
      });
      const cards = all("card");
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.batch(cards, { start: "top 94%", once: true, onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: .7, ease: "out", stagger: .08, clearProps: "transform" }) });
      all("image").forEach((el) => {
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "move", clearProps: "clipPath" }) });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const media = el.querySelector("img"); if (!media) return;
        gsap.fromTo(media, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "bottom top" } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    void document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); splits.forEach((s) => s.revert()); };
  }, []);
}

/* Preloader: the navy ground shows the wordmark filling in, "gas" in blue-white then "rec" in green, then the
   ground lifts away on La Caminera's move curve and the hero plays its own entrance. */
function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    const done = () => { html.classList.remove("is-loading"); document.dispatchEvent(new Event("intro:done")); };
    if (!el || !html.classList.contains("is-loading")) { done(); return; }
    const gas = el.querySelector(".logo-gas"), rec = el.querySelector(".logo-rec");
    const tl = gsap.timeline({ delay: .15 });
    tl.fromTo([gas, rec], { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8, ease: "move", stagger: .28 })
      .fromTo(el.querySelector(".preloader-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: "move" }, 0)
      .to(el.querySelector(".preloader-inner"), { yPercent: -60, opacity: 0, duration: .6, ease: "move" }, "+=.25")
      .add(done, "-=.3")
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: .9, ease: "move" }, "<-.1")
      .set(el, { display: "none" });
    return () => { tl.kill(); };
  }, []);
  return <div className="preloader" ref={root} aria-hidden="true">
    <div className="preloader-inner"><Logo /><span className="preloader-line" /></div>
  </div>;
}

/* Full-screen menu (La Caminera's "MENU" button opens it): the curtain drops from the top edge, then the links rise.
   Focus is trapped while it is open and returned to the trigger on close. */
function Menu({ open, close, trigger }: { open: boolean; close: () => void; trigger: HTMLElement | null }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8, ease: "move" }, 0)
      .fromTo(el.querySelectorAll("[data-menu-in]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .6, ease: "out", stagger: .045 }, .35)
      .fromTo(el.querySelector(".menu-photo img"), { scale: 1.15 }, { scale: 1, duration: 1.2, ease: "move" }, .1);
    tl.current = t;
    return () => { t.kill(); };
  }, []);
  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 50 : 1).play();
      const previous = trigger;
      getLenis()?.stop();
      document.documentElement.classList.add("menu-open");
      const focusable = () => Array.from(el.querySelectorAll<HTMLElement>("a[href], button")).filter((n) => n.offsetParent !== null);
      focusable()[0]?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { e.preventDefault(); close(); }
        if (e.key === "Tab") {
          const items = focusable(), first = items[0], last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.documentElement.classList.remove("menu-open");
        getLenis()?.start();
        previous?.focus({ preventScroll: true });
      };
    }
    if (t.progress() > 0) t.timeScale(reducedMotion() ? 50 : 1.5).reverse();
  }, [open, close, trigger]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-grid">
      <nav className="menu-nav" aria-label="Main">
        <ul>
          {nav.map((link, i) => <li key={link.href} data-menu-in><a href={link.href}><span className="menu-num">0{i + 1}</span><span>{link.label}</span></a></li>)}
          <li data-menu-in><a href={contactLink.href}><span className="menu-num">0{nav.length + 1}</span><span>{contactLink.label}</span></a></li>
        </ul>
      </nav>
      <div className="menu-side">
        <div className="menu-photo" data-menu-in><Photo src="/media/hero-tanker" alt="" sizes="40vw" /></div>
        <div className="menu-contact" data-menu-in>
          <p>{contact.ops.label}: <a href={contact.ops.tel}>{contact.ops.phone}</a></p>
          <p>{contact.office.label}: <a href={contact.office.tel}>{contact.office.phone}</a></p>
          <p><a href={contact.mailto}>{contact.email}</a></p>
        </div>
      </div>
    </div>
  </div>;
}

/* La Caminera's header: outlined MENU block on the left, the logo centred, a solid enquiry button on the right.
   Over the hero it is transparent; once the page moves it takes the navy ground and hides on the way down. */
function Header() {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const bar = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      el.classList.toggle("is-solid", y > 60);
      if (y < 200) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      el.classList.toggle("is-hidden", delta > 0 && !document.documentElement.classList.contains("menu-open"));
      last = y;
    };
    const reveal = () => el.classList.remove("is-hidden");
    el.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); };
  }, []);

  return <>
    <a className="announce" href={announcement.href}>{announcement.label}</a>
    <header className={`site-header${open ? " is-open" : ""}`} ref={bar}>
      <div className="header-left">
        <button className="menu-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu"
          onClick={(e) => { if (open) { close(); return; } setTrigger(e.currentTarget); setOpen(true); }}>
          <span className="menu-lines" aria-hidden="true"><i /><i /></span>
          <span className="menu-word">{open ? "Close" : "Menu"}</span>
        </button>
        <nav className="header-quick" aria-label="Quick links">
          {nav.slice(0, 3).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
      </div>
      <a href="#top" className="brand" aria-label="Gasrec, back to the top"><Logo /></a>
      <div className="header-right">
        <Btn href={contactLink.href} tone="green" icon="out" className="header-cta">{contactLink.label}</Btn>
      </div>
    </header>
    <Menu open={open} close={close} trigger={trigger} />
  </>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div className="footer-brand">
        <a href="#top" aria-label="Back to the top"><Logo /></a>
        <p className="footer-small">{footer.copyright}</p>
      </div>
      <div className="footer-col">
        <p className="eyebrow">Contact</p>
        <address>
          <p>{contact.company} {contact.address.join(" ")}</p>
          <p>{contact.ops.label}: <a href={contact.ops.tel}>{contact.ops.phone}</a></p>
          <p>{contact.office.label}: <a href={contact.office.tel}>{contact.office.phone}</a></p>
          <p><a href={contact.mailto}>{contact.email}</a></p>
        </address>
      </div>
      <div className="footer-col">
        <p className="eyebrow">Info</p>
        <ul>{footer.info.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
      </div>
      <div className="footer-col">
        <p className="eyebrow">Follow</p>
        <ul><li><a href={contact.linkedin}>LinkedIn</a></li></ul>
      </div>
    </div>
    <div className="wrap footer-bar">
      <p>View our GDPR policy <a href={footer.legal[0].href}>here</a>.</p>
      <p>View our Modern Slavery Statement <a href={footer.legal[1].href}>here</a></p>
    </div>
  </footer>;
}

export function Shell({ children }: { children: ReactNode }) {
  useLinkGuard();
  usePageMotion();
  return <>
    <Preloader />
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" tabIndex={-1} />
    <Header />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer />
  </>;
}
