"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Btn, Chevron, Eyebrow, Photo, Play, reducedMotion } from "@/components/ui";
import { decarbonise, explore, hamsHall, hero, intro, netZero, news, promises, stations, team, contact } from "@/lib/content";

/* ── Hero ─────────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's hero: a full-bleed photo with the headline set low on the left, two block buttons under it and a
   strip of thumbnails on the right whose hairline fills while each slide plays. The incoming slide wipes in over the
   outgoing one on their inset curve (no cross-fade, so two photos never blend). */
const SLIDE_MS = 6000;

function Hero() {
  const [active, setActiveRaw] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [paused, setPaused] = useState(false);
  const setActive = useCallback((next: number | ((i: number) => number)) => setActiveRaw((i) => {
    const n = typeof next === "function" ? next(i) : next;
    if (n !== i) setPrev(i);
    return n;
  }), []);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || reducedMotion()) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % hero.slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, setActive]);

  // Entrance, once the preloader hands over.
  useEffect(() => {
    const el = root.current; if (!el || reducedMotion()) return;
    const parts = el.querySelectorAll("[data-hero-in]");
    gsap.set(parts, { opacity: 0, y: 40 });
    gsap.set(el.querySelector(".hero-media"), { scale: 1.12 });
    const play = () => {
      gsap.to(el.querySelector(".hero-media"), { scale: 1, duration: 2, ease: "move" });
      gsap.to(parts, { opacity: 1, y: 0, duration: 1, ease: "out", stagger: .09, delay: .15 });
    };
    if (document.documentElement.classList.contains("is-loading")) document.addEventListener("intro:done", play, { once: true });
    else play();
    return () => document.removeEventListener("intro:done", play);
  }, []);

  return <section className="hero" ref={root} aria-label="Introduction">
    <div className="hero-media">
      {hero.slides.map((s, i) => <div key={s.src} className={`hero-slide${i === active ? " is-active" : i === prev ? " is-prev" : ""}`} aria-hidden={i !== active}>
        <Photo src={s.src} alt={s.alt} eager={i === 0} />
      </div>)}
      <div className="hero-shade" />
    </div>
    <div className="hero-body">
      <h1 className="hero-title">
        <span data-hero-in>{hero.title}</span>
        <span data-hero-in className="hero-accent">{hero.accent}</span>
      </h1>
      <div className="hero-ctas" data-hero-in>
        {hero.ctas.map((c) => <Btn key={c.label} href={c.href}>{c.label}</Btn>)}
      </div>
    </div>
    <div className="hero-strip" data-hero-in>
      <div className="hero-thumbs" role="tablist" aria-label="Hero photographs">
        {hero.slides.map((s, i) => <button key={s.src} role="tab" aria-selected={i === active} aria-label={s.caption}
          className={`hero-thumb${i === active ? " is-active" : ""}`} onClick={() => { setActive(i); setPaused(true); }}>
          <img src={`${s.src}-s.jpg`} alt="" loading="eager" />
          <span className="hero-thumb-bar"><i style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }} key={`${active}-${i}`} /></span>
          <span className="hero-thumb-cap">{s.caption}</span>
        </button>)}
      </div>
      <p className="hero-note">{hero.note}</p>
    </div>
  </section>;
}

/* ── Intro ────────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's centred statement, set like wysscenter.ch's opening line: plain text with the key phrases lit up. */
function Intro() {
  return <section className="intro" id="what-we-do">
    <div className="wrap">
      <Eyebrow className="center">{intro.eyebrow}</Eyebrow>
      <p className="intro-statement" data-reveal="heading">
        {intro.parts.map((p, i) => p.hi ? <mark key={i}>{p.t}</mark> : <span key={i}>{p.t}</span>)}
      </p>
      <p className="intro-lead" data-reveal="text">{intro.lead}</p>
      <ol className="activities">
        {intro.activities.map((a) => <li key={a.title} data-reveal="card">
          <span className="activity-n">{a.n}</span>
          <h2 className="activity-title">{a.title}</h2>
          <p>{a.text}</p>
        </li>)}
      </ol>
      <div className="center-row" data-reveal="label"><Btn href={intro.cta.href} tone="navy">{intro.cta.label}</Btn></div>
    </div>
  </section>;
}

/* ── Promises ─────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's Pilots/Passengers checkerboard: photo, panel, panel, photo; the second row mirrors the first. */
function Promises() {
  const rows = [promises.slice(0, 2), promises.slice(2, 4)];
  return <section className="promises" aria-label="Why Gasrec">
    {rows.map((row, r) => <div key={r} className={`checker${r ? " checker--flip" : ""}`}>
      {row.map((p) => <div key={p.title} className="checker-pair">
        <figure className="checker-img" data-parallax><div data-reveal="image"><Photo src={p.img} alt={p.alt} sizes="(min-width: 900px) 25vw, 100vw" /></div></figure>
        <div className={`checker-panel tone-${p.tone}`}>
          <h2 className="checker-title" data-reveal="heading">{p.title}</h2>
          <p data-reveal="text">{p.text}</p>
          <div data-reveal="label"><Btn href={p.cta.href} tone="ghost">{p.cta.label}</Btn></div>
        </div>
      </div>)}
    </div>)}
  </section>;
}

/* ── Hams Hall ────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's two-column "sanctuary" intro, the live map card, and the Gasrec film: the poster is a button that
   swaps in the YouTube player in place, so nothing ever leaves the page. */
function HamsHall() {
  const [playing, setPlaying] = useState(false);
  return <section className="hams" id="hams-hall">
    <div className="wrap">
      <div className="hams-head">
        <div>
          <Eyebrow><span className="dot" /> {hamsHall.eyebrow}</Eyebrow>
          <h2 className="display" data-reveal="heading">{hamsHall.title}<br /><em>{hamsHall.subtitle}</em></h2>
        </div>
        <div className="hams-copy">
          <p data-reveal="text">{hamsHall.text}</p>
          <dl className="facts">
            {hamsHall.facts.map((f) => <div key={f.label} data-reveal="card"><dt>{f.value}</dt><dd>{f.label}</dd></div>)}
          </dl>
          <div data-reveal="label"><Btn href={hamsHall.cta.href} tone="navy">{hamsHall.cta.label}</Btn></div>
        </div>
      </div>
      <div className="hams-media">
        <figure className="hams-map" data-reveal="image"><img src={hamsHall.map.src} alt={hamsHall.map.alt} loading="lazy" /></figure>
        <div className="film" data-reveal="image" id="film">
          {playing
            ? <iframe src={`https://www.youtube-nocookie.com/embed/${hamsHall.film.id}?autoplay=1&rel=0&modestbranding=1`} title={hamsHall.film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            : <button className="film-poster" onClick={() => setPlaying(true)} aria-label={`Play film: ${hamsHall.film.title}`}>
              <img src={hamsHall.film.poster} alt="" loading="lazy" />
              <span className="film-play"><Play /></span>
              <span className="film-cap"><strong>{hamsHall.film.title}</strong><span>{hamsHall.film.by}</span></span>
            </button>}
        </div>
      </div>
    </div>
  </section>;
}

/* ── Net Zero ─────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's "exclusive rates" pair: a tall photo beside a coloured panel. The live accordion sits in the panel,
   and each open item shows its figure large. */
function NetZero() {
  const [open, setOpen] = useState(0);
  return <section className="netzero" aria-labelledby="netzero-title">
    <figure className="netzero-img" data-parallax><div data-reveal="image"><Photo src={netZero.img.src} alt={netZero.img.alt} sizes="(min-width: 900px) 50vw, 100vw" /></div></figure>
    <div className="netzero-panel">
      <Eyebrow>{netZero.eyebrow}</Eyebrow>
      <h2 className="display" id="netzero-title" data-reveal="heading">{netZero.title}</h2>
      <div className="acc">
        {netZero.items.map((item, i) => {
          const isOpen = open === i;
          return <div key={item.title} className={`acc-item${isOpen ? " is-open" : ""}`} data-reveal="card">
            <h3><button aria-expanded={isOpen} aria-controls={`acc-${i}`} id={`acc-b-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{item.title}</span><span className="acc-icon" aria-hidden="true" />
            </button></h3>
            <div className="acc-body" id={`acc-${i}`} role="region" aria-labelledby={`acc-b-${i}`}>
              <div className="acc-inner">
                <p className="acc-stat"><strong>{item.stat}</strong><span>{item.statLabel}</span></p>
                <p>{item.text}</p>
              </div>
            </div>
          </div>;
        })}
      </div>
      <div data-reveal="label"><Btn href={netZero.cta.href} tone="green">{netZero.cta.label}</Btn></div>
    </div>
  </section>;
}

/* Shared carousel state: index, wrap-around step, keyboard arrows and swipe. */
function useCarousel(count: number) {
  const [index, setIndex] = useState(0);
  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);
  const startX = useRef<number | null>(null);
  const handlers = {
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); },
    onPointerDown: (e: React.PointerEvent) => { startX.current = e.clientX; },
    onPointerUp: (e: React.PointerEvent) => {
      if (startX.current === null) return;
      const dx = e.clientX - startX.current; startX.current = null;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    },
  };
  return { index, go, handlers };
}

function Arrows({ go, index, label }: { go: (n: number) => void; index: number; label: string }) {
  return <>
    <button className="arrow arrow--prev" onClick={() => go(index - 1)} aria-label={`Previous ${label}`}><Chevron /></button>
    <button className="arrow arrow--next" onClick={() => go(index + 1)} aria-label={`Next ${label}`}><Chevron /></button>
  </>;
}

/* ── Stations ─────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's "Images from the sky" gallery: the centre slide stands taller than its neighbours, dots below.
   All seventeen live stations, each with its own photo and line from /stations. */
function Stations() {
  const { index, go, handlers } = useCarousel(stations.list.length);
  const n = stations.list.length;
  return <section className="stations" id="stations" aria-labelledby="stations-title">
    <div className="wrap section-head center">
      <Eyebrow className="center">{stations.eyebrow}</Eyebrow>
      <h2 className="display" id="stations-title" data-reveal="heading">{stations.title}</h2>
      <p className="section-lead" data-reveal="text">{stations.text}</p>
    </div>
    <div className="cover" role="region" aria-roledescription="carousel" aria-label="Gasrec stations" tabIndex={0} {...handlers}>
      <div className="cover-track">
        {stations.list.map((s, i) => {
          let offset = i - index;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const hidden = Math.abs(offset) > 2;
          return <figure key={s.name} className={`cover-slide${offset === 0 ? " is-active" : ""}`} aria-hidden={offset !== 0}
            style={{ "--o": offset, "--a": Math.abs(offset), visibility: hidden ? "hidden" : "visible" } as React.CSSProperties} onClick={() => offset !== 0 && go(i)}>
            <div className="cover-img"><img src={`/media/${s.img}-s.jpg`} alt={offset === 0 ? `${s.name} station` : ""} loading="lazy" draggable={false} /></div>
          </figure>;
        })}
      </div>
      <div className="cover-caption" aria-live="polite">
        <p className="cover-count">{String(index + 1).padStart(2, "0")} / {n}</p>
        <h3>{stations.list[index].name}</h3>
        <p>{stations.list[index].text}</p>
      </div>
      <div className="cover-controls">
        <Arrows go={go} index={index} label="station" />
        <div className="dots" role="tablist" aria-label="Choose a station">
          {stations.list.map((s, i) => <button key={s.name} role="tab" aria-selected={i === index} aria-label={s.name} className={i === index ? "is-active" : ""} onClick={() => go(i)} />)}
        </div>
      </div>
    </div>
    <div className="wrap stations-foot">
      <p className="small" data-reveal="label">{stations.note}</p>
      <div data-reveal="label"><Btn href={stations.cta.href} tone="navy">{stations.cta.label}</Btn></div>
    </div>
  </section>;
}

/* ── Team ─────────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's stacked testimonial card on the dark ground, carrying wysscenter.ch's portrait-and-quote layout:
   the card in front holds the person, the two behind it peek out as the stack. */
function Team() {
  const { index, go, handlers } = useCarousel(team.people.length);
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current; if (!el || reducedMotion()) return;
    gsap.fromTo(el.querySelectorAll(".team-anim"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6, ease: "out", stagger: .05 });
  }, [index]);
  const p = team.people[index];
  return <section className="team" id="team" aria-labelledby="team-title">
    <div className="wrap">
      <div className="section-head center">
        <Eyebrow className="center">{team.eyebrow}</Eyebrow>
        <h2 className="display" id="team-title" data-reveal="heading">{team.title}</h2>
        <p className="section-lead" data-reveal="text">{team.text}</p>
      </div>
      <div className="stack" data-reveal="card" role="region" aria-roledescription="carousel" aria-label="Our team" tabIndex={0} {...handlers}>
        <span className="stack-back stack-back--2" aria-hidden="true" />
        <span className="stack-back stack-back--1" aria-hidden="true" />
        <div className="stack-card" ref={card} aria-live="polite">
          <div className="stack-photo team-anim"><img src={`${p.img}-s.jpg`} alt={p.name} /></div>
          <div className="stack-body">
            <p className="eyebrow team-anim">{p.role}</p>
            <h3 className="team-anim">{p.name}</h3>
            {p.bio.map((b) => <p key={b} className="team-anim">{b}</p>)}
            <div className="team-anim"><Btn href={team.href} tone="green">{p.cta}</Btn></div>
          </div>
        </div>
      </div>
      <div className="stack-controls">
        <Arrows go={go} index={index} label="person" />
        <div className="dots" role="tablist" aria-label="Choose a person">
          {team.people.map((t, i) => <button key={t.name} role="tab" aria-selected={i === index} aria-label={t.name} className={i === index ? "is-active" : ""} onClick={() => go(i)} />)}
        </div>
      </div>
    </div>
  </section>;
}

/* ── Decarbonising Britain ────────────────────────────────────────────────────────────────────────────────────
   wysscenter.ch's full-bleed photo band: a line of text and an outlined button over the image. */
function Decarbonise() {
  return <section className="band" aria-label="Decarbonising transport">
    <div className="band-img" data-parallax><Photo src={decarbonise.img.src} alt={decarbonise.img.alt} /></div>
    <div className="wrap band-body">
      <p className="band-text" data-reveal="heading">{decarbonise.text}</p>
      <div data-reveal="label"><Btn href={decarbonise.cta.href}>{decarbonise.cta.label}</Btn></div>
    </div>
  </section>;
}

/* ── News ─────────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's events row (three cards, arrows and dots below) with wysscenter.ch's tag chip and corner arrow. */
function News() {
  const per = 3;
  const pages = Math.ceil(news.posts.length / per);
  const [page, setPage] = useState(0);
  const go = (n: number) => setPage(((n % pages) + pages) % pages);
  return <section className="news" id="news" aria-labelledby="news-title">
    <div className="wrap">
      <div className="news-head">
        <div>
          <Eyebrow>{news.eyebrow}</Eyebrow>
          <h2 className="display" id="news-title" data-reveal="heading">{news.title}</h2>
        </div>
        <div data-reveal="label"><Btn href={news.cta.href} tone="navy">{news.cta.label}</Btn></div>
      </div>
      <div className="news-viewport">
        <ul className="news-track" style={{ "--page": page } as React.CSSProperties}>
          {news.posts.map((post, i) => <li key={post.href} className="news-card" data-reveal="card" aria-hidden={Math.floor(i / per) !== page}>
            <a href={post.href} tabIndex={Math.floor(i / per) === page ? 0 : -1}>
              <div className="news-img"><img src={`${post.img}-s.jpg`} alt="" loading="lazy" /></div>
              <span className="chip">{i < 3 ? "News" : "Blog"}</span>
              <h3>{post.title}</h3>
              <p className="news-meta"><time>{post.date}</time><span className="news-arrow"><ArrowRight /></span></p>
            </a>
          </li>)}
        </ul>
      </div>
      <div className="news-controls">
        <Arrows go={go} index={page} label="posts" />
        <div className="dots" role="tablist" aria-label="News pages">
          {Array.from({ length: pages }, (_, i) => <button key={i} role="tab" aria-selected={i === page} aria-label={`Page ${i + 1}`} className={i === page ? "is-active" : ""} onClick={() => go(i)} />)}
        </div>
      </div>
    </div>
  </section>;
}

/* ── Explore ──────────────────────────────────────────────────────────────────────────────────────────────────
   gaslogltd.com's stacked photo bands: a centred uppercase title, the page's own line, a ringed arrow. */
function Explore() {
  return <section className="explore" aria-label="Explore Gasrec">
    {explore.map((b) => <a key={b.title} href={b.href} className="explore-band" data-reveal="card">
      <span className="explore-img"><Photo src={b.img} alt="" /></span>
      <span className="explore-body">
        <span className="explore-title">{b.title}</span>
        <span className="explore-text">{b.text}</span>
        <span className="ring"><ArrowRight /></span>
      </span>
    </a>)}
  </section>;
}

/* ── Contact ──────────────────────────────────────────────────────────────────────────────────────────────────
   La Caminera's closing block: a full-width photo with two coloured panels sitting on its lower edge. */
function Contact() {
  return <section className="contact" id="contact" aria-labelledby="contact-title">
    <div className="contact-img" data-parallax><Photo src={contact.img.src} alt={contact.img.alt} /></div>
    <div className="contact-panels">
      <div className="contact-panel tone-navy" data-reveal="card">
        <h2 id="contact-title" className="contact-title">Contact</h2>
        <p className="contact-lead">{team.text}</p>
        <div className="btn-row">
          <Btn href={team.href} tone="light">Contact us</Btn>
          <Btn href={contact.office.tel} tone="ghost" icon="out">{contact.office.label}</Btn>
        </div>
      </div>
      <div className="contact-panel tone-green" data-reveal="card">
        <dl className="contact-list">
          <div><dt>{contact.ops.label}</dt><dd><a href={contact.ops.tel}>{contact.ops.phone}</a></dd></div>
          <div><dt>{contact.office.label}</dt><dd><a href={contact.office.tel}>{contact.office.phone}</a></dd></div>
          <div><dt>Email</dt><dd><a href={contact.mailto}>{contact.email}</a></dd></div>
        </dl>
        <address className="contact-address">{contact.company}<br />{contact.address.map((l) => <span key={l}>{l}<br /></span>)}</address>
      </div>
    </div>
  </section>;
}

export function Home() {
  return <>
    <Hero />
    <Intro />
    <Promises />
    <HamsHall />
    <NetZero />
    <Stations />
    <Team />
    <Decarbonise />
    <News />
    <Explore />
    <Contact />
  </>;
}
