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
import Image from "next/image";
import jsIcon from "@/assets/images/JavaScript.png";
import tsIcon from "@/assets/images/TypeScript.png";
import pyIcon from "@/assets/images/Python.png";
import reactIcon from "@/assets/images/React.png";
import luaIcon from "@/assets/images/Lua.png";

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

const LANG_ICONS: Record<string, ReturnType<typeof Image>> = {
  JavaScript: <Image src={jsIcon} alt="JavaScript" width={70} height={70} draggable={false} style={{ objectFit: "contain", borderRadius: 14, pointerEvents: "none" }} />,
  TypeScript: <Image src={tsIcon} alt="TypeScript" width={70} height={70} draggable={false} style={{ objectFit: "contain", pointerEvents: "none" }} />,
  Python:     <Image src={pyIcon} alt="Python"     width={70} height={70} draggable={false} style={{ objectFit: "contain", pointerEvents: "none" }} />,
  React:      <Image src={reactIcon} alt="React"   width={70} height={70} draggable={false} style={{ objectFit: "contain", borderRadius: 14, pointerEvents: "none" }} />,
  Lua:        <Image src={luaIcon} alt="Lua"        width={70} height={70} draggable={false} style={{ objectFit: "contain", pointerEvents: "none" }} />,
} as unknown as Record<string, React.ReactNode>;

/* ── floating card data ── */
const CARDS = [
  {
    // top-left → converge: move right + down
    w: 110, h: 110,
    top: "10%", left: "5%",
    rotate: -8,
    factorX: -0.056, factorY: -0.036,
    scrollX: 55, scrollY: 35,
    lang: "JavaScript",
  },
  {
    // top-right → converge: move left + down
    w: 110, h: 110,
    top: "6%", right: "7%",
    rotate: 7,
    factorX: 0.044, factorY: -0.05,
    scrollX: -55, scrollY: 35,
    lang: "TypeScript",
  },
  {
    // mid-left → converge: move right
    w: 100, h: 100,
    top: "52%", left: "3%",
    rotate: -5,
    factorX: -0.036, factorY: 0.044,
    scrollX: 45, scrollY: 0,
    lang: "Python",
    mid: true,
  },
  {
    // mid-right → converge: move left
    w: 110, h: 110,
    top: "44%", right: "4%",
    rotate: 5,
    factorX: 0.064, factorY: 0.03,
    scrollX: -45, scrollY: 0,
    lang: "React",
    mid: true,
  },
  {
    // bottom-left → converge: move right + up
    w: 100, h: 100,
    bottom: "10%", left: "9%",
    rotate: 11,
    factorX: -0.03, factorY: 0.06,
    scrollX: 40, scrollY: -30,
    lang: "Lua",
    mid: false,
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
  const mouseXRaw = useTransform(mx, (v) => v * card.factorX * 600);
  const mouseYRaw = useTransform(my, (v) => v * card.factorY * 600);
  const scrollXRaw = useTransform(scrollY, [0, 600], [0, card.scrollX]);
  const scrollYRaw = useTransform(scrollY, [0, 600], [0, card.scrollY]);

  const combinedX = useTransform(
    [mouseXRaw, scrollXRaw] as MotionValue<number>[],
    ([m, s]) => (m as number) + (s as number)
  );
  const combinedY = useTransform(
    [mouseYRaw, scrollYRaw] as MotionValue<number>[],
    ([m, s]) => (m as number) + (s as number)
  );

  const springX = useSpring(combinedX, { stiffness: 55, damping: 20 });
  const springY = useSpring(combinedY, { stiffness: 55, damping: 20 });

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
        y: springY,
        rotate: card.rotate,
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={card.mid ? "floating-card-mid" : undefined}
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
    desc: "Sites, landing pages e apps completos, Next.js, React, TypeScript, do design ao deploy.",
  },
  {
    n: "02",
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos. Playwright e Python. Se acontece num browser, dá pra automatizar.",
  },
  {
    n: "03",
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, scripts Lua/Bash, integrações de API, ferramentas sob medida.",
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
    try { await navigator.clipboard.writeText("contato@rwque.com"); }
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
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
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

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Sobre", id: "sobre" },
            { label: "Serviços", id: "servicos" },
            { label: "Contato", id: "contato" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontSize: 13, color: "var(--text-3)", transition: "color 0.15s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
            >
              {label}
            </button>
          ))}
          <a
            href="/termos"
            style={{ fontSize: 13, color: "var(--text-3)", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
          >
            Termos
          </a>
        </div>
        <div />
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
        <div className="floating-cards" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {CARDS.map((card) => (
            <FloatingCard key={card.lang} card={card} mx={curX} my={curY} scrollY={scrollY} />
          ))}
        </div>

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
            className="hero-cta"
          >
            <button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "10px 26px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Falar comigo
            </button>
            <button
              onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
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
            </button>
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
        className="section-inner"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "96px 32px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Reveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", display: "block", marginBottom: 40 }}>
            Sobre
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: 32,
          }}>
            Código limpo,<br />
            <span style={{ color: "var(--text-3)" }}>resultado real.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.85, maxWidth: 560, marginBottom: 48 }}>
            Sou dev há 3 anos, comecei em jogos (Lua, C++, C#) e hoje foco em
            sites e lojas pra clientes reais. Trabalho com React, Next.js e Node.js no front e back,
            e Python quando preciso automatizar algo.
            Entrego rápido, sem enrolação, orçamento por escopo ou mensalidade.
          </p>
        </Reveal>

        {/* stats row */}
        <Reveal delay={0.15}>
          <div className="stats-row" style={{ display: "flex", borderTop: "1px solid var(--border)", width: "100%", alignItems: "stretch" }}>
            {[
              { n: "3",   l: "Anos de experiência", node: null },
              { n: "20+", l: "Projetos entregues", node: null },
              { n: "",    l: "PT e EN", node: "flags" },
            ].map(({ n, l, node }, i) => (
              <div
                key={l}
                style={{
                  flex: 1,
                  padding: "32px 24px",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {node === "flags" ? (
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/BrazilFlag.svg" alt="Brasil" width={52} height={38} draggable={false} style={{ objectFit: "cover", borderRadius: 5, pointerEvents: "none" }} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/UnitedStatesFlag.png" alt="EUA" width={52} height={38} draggable={false} style={{ objectFit: "cover", borderRadius: 5, pointerEvents: "none" }} />
                    </div>
                  ) : (
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(30px, 4.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--text)", lineHeight: 1 }}>
                      {n}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--text-3)", letterSpacing: "0.02em" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── SERVIÇOS ── */}
      <section
        id="servicos"
        className="section-inner"
        style={{
          borderTop: "1px solid var(--border)",
          padding: "96px 32px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
          textAlign: "center",
        }}
      >
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: 56 }}>
            <h2 style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--text)",
            }}>
              O que eu faço
            </h2>
          </div>
        </Reveal>

        {SERVICES.map((svc, i) => (
          <Reveal key={svc.n} delay={i * 0.1}>
            <div
              style={{
                borderTop: i === 0 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
                padding: "36px 0",
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                gap: "0 28px",
                alignItems: "start",
              }}
            >
              {/* number */}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--text-3)",
                letterSpacing: "0.08em",
                paddingTop: 6,
              }}>
                {svc.n}
              </span>

              {/* content */}
              <div>
                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(20px, 2.8vw, 28px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text)",
                  marginBottom: 12,
                  lineHeight: 1.1,
                }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-3)", lineHeight: 1.8, maxWidth: 480 }}>{svc.desc}</p>
              </div>

              {/* arrow */}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: "var(--text-3)",
                paddingTop: 4,
                opacity: 0.4,
              }}>
                ↗
              </span>
            </div>
          </Reveal>
        ))}      
      </section>

      {/* ── CONTATO ── */}
      <section
        id="contato"
        className="section-inner"
        style={{
          padding: "80px 32px 120px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <div className="contato-btns" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Email + copy grouped */}
            <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", background: "var(--text)" }}>
              <a
                href="mailto:contato@rwque.com"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 20px",
                  color: "var(--bg)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                contato@rwque.com
              </a>
              <motion.button
                onClick={copy}
                whileTap={{ scale: 0.95 }}
                title="Copiar e-mail"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "13px 14px",
                  borderLeft: "1px solid rgba(239,237,234,0.18)",
                  background: "transparent",
                  color: copied ? "rgba(239,237,234,0.95)" : "rgba(239,237,234,0.55)",
                  cursor: "pointer",
                  transition: "color 0.15s",
                  flexShrink: 0,
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="ok" style={{ display: "flex" }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.span>
                  ) : (
                    <motion.span key="cp" style={{ display: "flex" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* WhatsApp — mesmo estilo mas fundo escuro */}
            <a
              href="https://wa.me/5531972039690"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "13px 20px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.849L0 24l6.335-1.501A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.502-5.187-1.378l-.371-.22-3.763.891.952-3.668-.242-.38A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            padding: "20px 32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-3)" }}>© 2026 rwque</span>
        </div>
      </footer>
    </>
  );
}
