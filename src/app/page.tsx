"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

/* ── ease ── */
const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── fade-in on scroll ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: E, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── language icons (inline SVG) ── */
const LANG_ICONS: Record<string, React.ReactNode> = {
  JavaScript: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <rect width="32" height="32" rx="4" fill="#f0db4f"/>
      <path d="M6 6h20v20H6z" fill="#f0db4f"/>
      <path d="M19.5 21.5c.4.7 1 1.2 2 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.5l.6.2c2 .9 3.1 1.7 3.1 3.6 0 2-1.6 3.2-3.7 3.2-2.1 0-3.4-1-4.1-2.3l1.9-1.1zm-9.2.2c.3.5.6.9 1.3.9.6 0 1-.2 1-1.2v-6.9h2.2v7c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.9-1.8l1.3-.9z" fill="#333"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <rect width="32" height="32" rx="4" fill="#3178c6"/>
      <path d="M18.1 22.8v2.3c.4.2.9.4 1.4.5.6.1 1.2.2 1.8.2.6 0 1.2-.1 1.8-.2.6-.2 1-.4 1.4-.8.4-.3.7-.8.9-1.3.2-.5.3-1.1.3-1.8 0-.5-.1-1-.2-1.4-.1-.4-.4-.8-.6-1.1-.3-.3-.6-.6-1-.9-.4-.2-.9-.5-1.4-.7-.4-.2-.7-.3-1-.5-.3-.1-.5-.3-.7-.4-.2-.1-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.5.1-.2.2-.3.4-.4.2-.1.3-.2.5-.2.2-.1.4-.1.6-.1.2 0 .4 0 .6.1.2.1.4.1.7.2.2.1.4.2.6.4.2.1.4.3.5.5l1.6-1.7c-.3-.4-.6-.7-1-.9-.4-.2-.7-.4-1.1-.5-.4-.1-.8-.2-1.2-.2-.4 0-.8 0-1.2.1-.6.1-1.2.3-1.6.6-.5.3-.9.7-1.2 1.2-.3.5-.4 1.1-.4 1.7 0 .9.2 1.6.7 2.2.5.6 1.2 1.1 2.1 1.5.4.2.8.3 1.1.5.3.1.6.3.8.4.2.2.4.3.5.5.1.2.2.4.2.7 0 .2 0 .5-.1.6-.1.2-.2.3-.4.4-.2.1-.4.2-.6.2-.2 0-.5.1-.7.1-.5 0-1-.1-1.5-.3-.4-.3-.8-.6-1.2-1zM12 16.2H9v-2.2h8.4v2.2h-3v8.7H12v-8.7z" fill="white"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <rect width="32" height="32" rx="4" fill="#1e3a5f"/>
      <path d="M16 5c-2.3 0-4 .4-5 1.2C10 7 9.5 8 9.5 9.3v1.7h6.5v.5H7.8C6.8 11.5 6 12.4 6 14c0 1.9.9 3.1 2.6 3.5.3.1.7.1 1.1.1H11v-2c0-1.2.5-2.1 1.5-2.7C13.5 12.3 14.7 12 16 12c1.4 0 2.5.3 3.3.9.8.6 1.2 1.4 1.2 2.4v4.5c0 .9-.4 1.7-1.1 2.2-.8.5-1.9.8-3.4.8-1.5 0-2.7-.3-3.5-.9-.8-.6-1.2-1.5-1.2-2.6V18h-2v1.3c0 1.3.5 2.3 1.5 3.1 1 .7 2.6 1.1 4.7 1.1 2 0 3.6-.4 4.7-1.1 1.1-.8 1.6-1.8 1.6-3V16c0-1.2-.5-2.2-1.4-2.9C19.1 12.4 17.7 12 16 12v-.5H23.5c.5-.5.5-1 .5-1.5V9.3C24 7 22.2 5 16 5zm0 2.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm0 12.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#4b9cd3"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <rect width="32" height="32" rx="4" fill="#1a2332"/>
      <ellipse cx="16" cy="16" rx="2.5" ry="2.5" fill="#61dafb"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  ),
  Lua: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
      <rect width="32" height="32" rx="4" fill="#1a1a2e"/>
      <circle cx="16" cy="16" r="7" fill="#00007c"/>
      <circle cx="16" cy="16" r="5" fill="#fff"/>
      <circle cx="21" cy="11" r="3" fill="#fff"/>
    </svg>
  ),
};

/* ── floating card data ── */
const CARDS = [
  {
    w: 110, h: 110,
    top: "10%", left: "5%",
    rotate: -8,
    bg: "linear-gradient(145deg, #2a2010, #4a3c1a)",
    factorX: -0.028, factorY: -0.018,
    scrollFactor: -120,
    lang: "JavaScript",
  },
  {
    w: 110, h: 110,
    top: "6%", right: "7%",
    rotate: 7,
    bg: "linear-gradient(145deg, #0d2244, #1a3a6e)",
    factorX: 0.022, factorY: -0.025,
    scrollFactor: -80,
    lang: "TypeScript",
  },
  {
    w: 100, h: 100,
    top: "52%", left: "3%",
    rotate: -5,
    bg: "linear-gradient(145deg, #0f2035, #1a3555)",
    factorX: -0.018, factorY: 0.022,
    scrollFactor: 60,
    lang: "Python",
  },
  {
    w: 110, h: 110,
    top: "44%", right: "4%",
    rotate: 5,
    bg: "linear-gradient(145deg, #0d1a24, #102030)",
    factorX: 0.032, factorY: 0.015,
    scrollFactor: 100,
    lang: "React",
  },
  {
    w: 100, h: 100,
    bottom: "10%", left: "9%",
    rotate: 11,
    bg: "linear-gradient(145deg, #100c22, #1e1540)",
    factorX: -0.015, factorY: 0.03,
    scrollFactor: 140,
    lang: "Lua",
  },
];

/* ── one floating card ── */
function FloatingCard({
  card,
  mx,
  my,
  scrollY,
}: {
  card: typeof CARDS[0];
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const springX = useSpring(
    useTransform(mx, (v) => v * card.factorX * 600),
    { stiffness: 60, damping: 18 }
  );
  const mouseY = useSpring(
    useTransform(my, (v) => v * card.factorY * 600),
    { stiffness: 60, damping: 18 }
  );
  const scrollParallax = useTransform(scrollY, [0, 800], [0, card.scrollFactor]);
  const combinedY = useTransform([mouseY, scrollParallax] as MotionValue<number>[], ([m, s]) => (m as number) + (s as number));

  const pos: React.CSSProperties = {
    position: "absolute",
    width: card.w,
    height: card.h,
    ...(card.top !== undefined ? { top: card.top } : {}),
    ...(card.bottom !== undefined ? { bottom: card.bottom } : {}),
    ...(card.left !== undefined ? { left: card.left } : {}),
    ...(card.right !== undefined ? { right: card.right } : {}),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: E, delay: 0.1 + CARDS.indexOf(card) * 0.07 }}
      style={{
        ...pos,
        x: springX,
        y: combinedY,
        rotate: card.rotate,
        background: card.bg,
        borderRadius: 16,
        boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
        overflow: "hidden",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {LANG_ICONS[card.lang]}
    </motion.div>
  );
}

/* ── services data ── */
const SERVICES = [
  {
    n: "01",
    title: "Desenvolvimento Web",
    desc: "Sites, landing pages e apps completos — Next.js, React, TypeScript, do design ao deploy.",
  },
  {
    n: "02",
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos. Playwright e Python. Se acontece num browser, dá pra automatizar.",
  },
  {
    n: "03",
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, scripts Lua/Bash, integrações de API — ferramentas sob medida.",
  },
];

/* ══════════════════════════════
   PAGE
══════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const curX = useMotionValue(0);
  const curY = useMotionValue(0);
  const [copied, setCopied] = useState(false);
  const { scrollY } = useScroll();

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    curX.set((e.clientX - r.left) / r.width * 2 - 1);
    curY.set((e.clientY - r.top) / r.height * 2 - 1);
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText("contato@rwque.lol"); }
    catch { window.location.href = "mailto:contato@rwque.lol"; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      {/* ── NAV ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 52,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          rwque
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Serviços", href: "#servicos" },
            { label: "Contato", href: "#contato" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 13, color: "var(--text-3)", transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/isKuyo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--text-3)", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
          >
            GitHub ↗
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        style={{
          position: "relative",
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: 52,
        }}
      >
        {/* floating cards */}
        {CARDS.map((card) => (
          <FloatingCard key={card.lang} card={card} mx={curX} my={curY} scrollY={scrollY} />
        ))}

        {/* hero title — centered, on top */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(72px, 12vw, 152px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "var(--text)",
            }}
          >
            Web.
            <br />
            <span style={{ color: "var(--text-3)" }}>Código.</span>
            <br />
            Resultado.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              marginTop: 28,
              fontSize: "clamp(13px, 1.5vw, 16px)",
              color: "var(--text-3)",
              letterSpacing: "0.02em",
            }}
          >
            Transformando ideias em código.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: E }}
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              pointerEvents: "auto",
            }}
          >
            <a
              href="#contato"
              style={{
                padding: "10px 26px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Falar comigo
            </a>
            <a
              href="#servicos"
              style={{
                padding: "10px 26px",
                border: "1px solid rgba(25,24,24,0.18)",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--text-2)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(25,24,24,0.4)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(25,24,24,0.18)")}
            >
              Ver serviços
            </a>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--text-3), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── SOBRE ── */}
      <section
        id="sobre"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "80px 32px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
        }}
      >
        <Reveal>
          <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 120px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)" }}>
                Sobre
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: 17, fontWeight: 500, color: "var(--text)", lineHeight: 1.7, marginBottom: 16, letterSpacing: "-0.01em" }}>
                Desenvolvo sites e automações há 3 anos. Trabalho com React, Next.js e Node.js — e também faço scraping e automações de browser com Playwright e Python.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.8 }}>
                Baseado no Brasil. Atendo em PT e EN. Sem mensalidade — orçamento por escopo, entrega real.
              </p>

              {/* stats */}
              <div style={{ marginTop: 36, display: "flex", gap: 32 }}>
                {[["3+", "anos"], ["20+", "projetos"], ["PT/EN", "idiomas"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>{n}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SERVIÇOS ── */}
      <section
        id="servicos"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "80px 32px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
        }}
      >
        <Reveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginBottom: 40 }}>
            Serviços
          </span>
        </Reveal>

        {SERVICES.map((svc, i) => (
          <Reveal key={svc.n} delay={i * 0.08}>
            <div
              style={{
                display: "flex",
                gap: 24,
                padding: "32px 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", flexShrink: 0, paddingTop: 4 }}>
                {svc.n}
              </span>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text)",
                  marginBottom: 10,
                }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-3)", lineHeight: 1.75 }}>{svc.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── CONTATO ── */}
      <section
        id="contato"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "80px 32px 120px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
        }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 6vw, 68px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              color: "var(--text)",
              marginBottom: 24,
            }}
          >
            Tem um projeto?
            <br />
            <span style={{ color: "var(--text-3)" }}>Fala comigo.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 40 }}>
            Respondo em menos de 24h. Sem burocracia, sem custo pra conversar.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 380 }}>
            <a
              href="mailto:contato@rwque.lol"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 20px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13.5 }}>contato@rwque.lol</span>
              <span>↗</span>
            </a>

            <motion.button
              onClick={copy}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "14px 20px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 12.5,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: copied ? "var(--text)" : "var(--text-3)",
                background: copied ? "rgba(25,24,24,0.05)" : "transparent",
                transition: "color 0.15s, background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "rgba(25,24,24,0.3)"; }}
              onMouseLeave={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copiado!
                  </motion.span>
                ) : (
                  <motion.span key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Copiar e-mail
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)" }}>© 2026 rwque</span>
        <a
          href="https://github.com/isKuyo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)", transition: "color 0.15s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
        >
          github.com/isKuyo ↗
        </a>
      </footer>
    </>
  );
}
