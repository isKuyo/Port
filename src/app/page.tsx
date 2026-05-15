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
    factorX: -0.028, factorY: -0.018,
    scrollX: 55, scrollY: 35,
    lang: "JavaScript",
  },
  {
    // top-right → converge: move left + down
    w: 110, h: 110,
    top: "6%", right: "7%",
    rotate: 7,
    factorX: 0.022, factorY: -0.025,
    scrollX: -55, scrollY: 35,
    lang: "TypeScript",
  },
  {
    // mid-left → converge: move right
    w: 100, h: 100,
    top: "52%", left: "3%",
    rotate: -5,
    factorX: -0.018, factorY: 0.022,
    scrollX: 45, scrollY: 0,
    lang: "Python",
  },
  {
    // mid-right → converge: move left
    w: 110, h: 110,
    top: "44%", right: "4%",
    rotate: 5,
    factorX: 0.032, factorY: 0.015,
    scrollX: -45, scrollY: 0,
    lang: "React",
  },
  {
    // bottom-left → converge: move right + up
    w: 100, h: 100,
    bottom: "10%", left: "9%",
    rotate: 11,
    factorX: -0.015, factorY: 0.03,
    scrollX: 40, scrollY: -30,
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

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
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
            Entrego rápido, sem enrolação, orçamento por escopo, sem mensalidade.
          </p>
        </Reveal>

        {/* stats row */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", borderTop: "1px solid var(--border)", width: "100%", alignItems: "stretch" }}>
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
        style={{
          borderTop: "1px solid var(--border)",
          padding: "96px 32px",
          maxWidth: 760,
          margin: "0 auto",
          scrollMarginTop: 52,
        }}
      >
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 56 }}>
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)" }}>
              {SERVICES.length} serviços
            </span>
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
              href="mailto:contato@rwque.com"
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
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13.5 }}>contato@rwque.com</span>
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
