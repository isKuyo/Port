"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────────────
   FadeUp
────────────────────────────── */
function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────
   TypeWriter
────────────────────────────── */
function TypeWriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && shown.length < word.length) {
      t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 75);
    } else if (!del && shown.length === word.length) {
      t = setTimeout(() => setDel(true), 1900);
    } else if (del && shown.length > 0) {
      t = setTimeout(() => setShown(shown.slice(0, -1)), 42);
    } else {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [shown, del, idx, words]);

  return (
    <span>
      <span className="text-accent-gradient">{shown}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "var(--accent)" }}
      >|</motion.span>
    </span>
  );
}

/* ──────────────────────────────
   TerminalCard
────────────────────────────── */
function TerminalCard() {
  const lines: { text: string; delay: number; type: string }[] = [
    { text: "whoami",                     delay: 0.3,  type: "cmd" },
    { text: "rwque",                      delay: 0.65, type: "out" },
    { text: "cat stack.txt",              delay: 1.05, type: "cmd" },
    { text: "React · Next.js · Node.js",  delay: 1.4,  type: "out" },
    { text: "Playwright · Python · Lua",  delay: 1.5,  type: "out" },
    { text: "echo $STATUS",              delay: 1.95, type: "cmd" },
    { text: "disponível ✓",              delay: 2.3,  type: "ok"  },
  ];

  return (
    <div className="terminal-card">
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 14px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f56","#ffbd2e","#27c93f"].map((c) => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-faint)", marginLeft: 6, letterSpacing: "0.04em" }}>
          rwque ~ bash
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.95 }}>
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: line.delay, duration: 0.05 }}>
            {line.type === "cmd" && (
              <div>
                <span style={{ color: "var(--accent)" }}>$ </span>
                <span style={{ color: "var(--text)" }}>{line.text}</span>
              </div>
            )}
            {line.type === "out" && (
              <div style={{ paddingLeft: 16, color: "var(--text-muted)" }}>{line.text}</div>
            )}
            {line.type === "ok" && (
              <div style={{ paddingLeft: 16, color: "#4ade80" }}>{line.text}</div>
            )}
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          style={{ display: "flex", alignItems: "center", marginTop: 2 }}
        >
          <span style={{ color: "var(--accent)" }}>$ </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse", delay: 2.6 }}
            style={{
              display: "inline-block", width: 7, height: 14,
              background: "var(--accent)", marginLeft: 2,
              borderRadius: 1, verticalAlign: "middle",
            }}
          />
        </motion.div>
      </div>

      {/* Status bar */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "8px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>
          pts/0 · Brazil · GMT-3
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4ade80", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: "#4ade80",
            display: "inline-block", animation: "pulse-ring 2.4s ease-in-out infinite",
          }} />
          online
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────
   ScrollBtn
────────────────────────────── */
function ScrollBtn({ target, accent, children }: { target: string; accent?: boolean; children: React.ReactNode }) {
  const go = () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <motion.button
      onClick={go}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      style={{
        padding: "11px 28px",
        background: accent ? "var(--accent)" : "transparent",
        color: accent ? "#0a0a0a" : "var(--text)",
        border: accent ? "none" : "1px solid var(--border-strong)",
        borderRadius: 8,
        fontSize: 13.5,
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: "-0.01em",
      }}
    >{children}</motion.button>
  );
}

/* ──────────────────────────────
   EmailCard
────────────────────────────── */
function EmailCard() {
  const [copied, setCopied] = useState(false);
  const EMAIL = "contato@rwque.lol";
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { window.location.href = `mailto:${EMAIL}`; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 14, overflow: "hidden" }}>
      <a
        href={`mailto:${EMAIL}`}
        style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 22px", textDecoration: "none", borderBottom: "1px solid var(--border)", transition: "background 0.2s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: "rgba(var(--accent-rgb), 0.08)",
          border: "1px solid rgba(var(--accent-rgb), 0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-muted)", letterSpacing: "0.12em", marginBottom: 4 }}>E-MAIL</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>{EMAIL}</div>
        </div>
      </a>
      <button
        onClick={copy}
        style={{
          width: "100%", padding: "15px 22px", background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          color: copied ? "var(--accent)" : "var(--text-muted)",
          fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
          transition: "color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              COPIADO!
            </motion.span>
          ) : (
            <motion.span key="cp" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              COPIAR E-MAIL
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ──────────────────────────────
   Data
────────────────────────────── */
const SKILLS = [
  { label: "React",      icon: "⚛️", color: "#61dafb" },
  { label: "Next.js",    icon: "▲",  color: "#e0e0e0" },
  { label: "TypeScript", icon: "TS", color: "#3178c6" },
  { label: "Node.js",    icon: "⬡",  color: "#68a063" },
  { label: "Python",     icon: "🐍", color: "#ffd43b" },
  { label: "Playwright", icon: "🎭", color: "#e2564b" },
  { label: "Tailwind",   icon: "💨", color: "#38bdf8" },
  { label: "Puppeteer",  icon: "🤖", color: "#a8b9ff" },
  { label: "Lua / Luau", icon: "🌙", color: "#cbff00" },
  { label: "Bash",       icon: "$",  color: "#89e051" },
  { label: "PostgreSQL", icon: "🐘", color: "#4fa3db" },
  { label: "Vercel",     icon: "▲",  color: "#f0f0f0" },
];

const SERVICES = [
  {
    n: "01",
    title: "Desenvolvimento Web",
    desc: "Sites e web apps do zero — landing pages de alta conversão, dashboards e portais completos com integrações.",
    tags: ["Next.js", "React", "TypeScript", "APIs"],
    bar: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
  },
  {
    n: "02",
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos. Se é repetitivo e acontece num browser, tem como automatizar.",
    tags: ["Playwright", "Puppeteer", "Python", "Scraping"],
    bar: "linear-gradient(90deg, #cbff00 0%, #4ade80 100%)",
  },
  {
    n: "03",
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, automações com Lua, integrações de API — qualquer ferramenta que resolva um problema real.",
    tags: ["Lua", "Bash", "Discord.js", "Node.js"],
    bar: "linear-gradient(90deg, #fb923c 0%, #f43f5e 100%)",
  },
];

/* ──────────────────────────────
   PAGE
────────────────────────────── */
export default function Home() {
  return (
    <div>

      {/* ═══════ HERO ═══════ */}
      <section
        id="home"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft glows */}
        <div aria-hidden style={{
          position: "absolute", top: "-5%", right: "10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(203,255,0,0.045) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "-5%", left: "0%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.03) 0%, transparent 70%)",
          filter: "blur(70px)", pointerEvents: "none",
        }} />

        <div className="hero-grid">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease }}
              style={{ marginBottom: 28 }}
            >
              <span className="section-label">disponível para projetos · 2026</span>
            </motion.div>

            <div style={{ overflow: "hidden", marginBottom: 8 }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.05 }}
                className="hero-name"
              >
                RWQUE
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hero-sub"
            >
              <TypeWriter words={["Web Developer.", "Automation Specialist.", "Script Writer.", "Problem Solver."]} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease }}
              className="hero-desc"
            >
              Faço sites, automações e ferramentas que{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>realmente funcionam</strong>.
              {" "}Baseado no Brasil, disponível pra qualquer lugar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.78, ease }}
              style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 36 }}
            >
              <ScrollBtn target="servicos" accent>Ver Serviços</ScrollBtn>
              <ScrollBtn target="contato">Falar comigo</ScrollBtn>
            </motion.div>
          </div>

          {/* Right column: terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.3 }}
          >
            <TerminalCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ═══════ SOBRE ═══════ */}
      <section id="sobre" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="sobre-grid">
            <div>
              <FadeUp>
                <span className="section-label" style={{ marginBottom: 20, display: "inline-flex" }}>01 / Sobre</span>
                <h2 className="section-h2" style={{ marginTop: 16 }}>
                  Código limpo,{" "}
                  <span className="text-accent-gradient">entrega real.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.07}>
                <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14, fontSize: "clamp(13.5px, 1.4vw, 15.5px)", color: "var(--text-muted)", lineHeight: 1.82 }}>
                  <p>Oi — sou <strong style={{ color: "var(--text)", fontWeight: 600 }}>Rwque</strong>. Desenvolvo para a web há mais de 3 anos: sites, automações, bots. Cada projeto começa do zero com a stack certa.</p>
                  <p>Não trabalho com template. Não entrego rascunho. O que eu faço, funciona.</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.13}>
                <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    ["Clareza antes de complexidade", "Código simples bate código inteligente."],
                    ["Entrega que funciona", "Funcional primeiro, refinado depois."],
                    ["Sem enrolação", "Prazo, escopo e preço — direto ao ponto."],
                  ].map(([t, d], i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.45 }}
                      style={{
                        padding: "13px 18px",
                        borderLeft: "2px solid var(--accent)",
                        background: "var(--surface)",
                        borderRadius: "0 9px 9px 0",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{t}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{d}</div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Profile card */}
            <FadeUp delay={0.15}>
              <div className="sobre-card">
                <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(203,255,0,0.18), rgba(203,255,0,0.05))",
                    border: "1px solid rgba(203,255,0,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 800, color: "var(--accent)",
                  }}>R</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>rwque</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Web Dev · Automation</div>
                  </div>
                </div>
                {[
                  ["Localização", "Brasil 🇧🇷"],
                  ["Experiência", "3+ anos"],
                  ["Foco", "Web + Automação"],
                  ["Idiomas", "PT (nativo) · EN"],
                  ["Horário", "GMT-3"],
                  ["Projetos", "20+"],
                ].map(([l, v], i, a) => (
                  <div key={l} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 22px",
                    borderBottom: i < a.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{l}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text)" }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: "12px 22px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-ring 2.2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 12, color: "#4ade80", fontFamily: "var(--font-mono)" }}>Disponível para projetos</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner">
          <FadeUp>
            <span className="section-label" style={{ marginBottom: 20, display: "inline-flex" }}>02 / Skills</span>
            <h2 className="section-h2" style={{ marginTop: 16, marginBottom: 8 }}>Stack principal.</h2>
            <p style={{ fontSize: 14.5, color: "var(--text-muted)", marginBottom: 44 }}>
              Ferramentas com as quais trabalho todo dia.
            </p>
          </FadeUp>

          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035, duration: 0.4, ease }}
                whileHover={{ y: -3, borderColor: s.color + "44" }}
                style={{
                  padding: "10px 14px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 9,
                  display: "flex", alignItems: "center", gap: 9,
                  cursor: "default",
                  transition: "border-color 0.2s",
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{s.icon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", fontWeight: 500 }}>{s.label}</span>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}`, marginLeft: "auto", flexShrink: 0 }} />
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div style={{
              marginTop: 28, padding: "13px 18px",
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 15 }}>⚡</span>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Usa algo diferente?{" "}
                <a href="mailto:contato@rwque.lol" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Fala comigo</a>
                {" "}— me adapto.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ SERVIÇOS ═══════ */}
      <section id="servicos" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner">
          <FadeUp>
            <span className="section-label" style={{ marginBottom: 20, display: "inline-flex" }}>03 / Serviços</span>
            <h2 className="section-h2" style={{ marginTop: 16, marginBottom: 8 }}>O que posso fazer.</h2>
            <p style={{ fontSize: 14.5, color: "var(--text-muted)", maxWidth: 420, marginBottom: 48 }}>
              Orçamento por escopo, sem mensalidade. Me conta o projeto.
            </p>
          </FadeUp>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.n} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Gradient top bar */}
                  <div style={{ height: 2, background: svc.bar }} />

                  <div style={{ padding: "26px 26px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.12em" }}>{svc.n}</span>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: 19,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "var(--text)",
                      lineHeight: 1.2,
                    }}>{svc.title}</h3>
                    <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.75, flex: 1 }}>{svc.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                      {svc.tags.map((t) => (
                        <span key={t} style={{
                          fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)",
                          padding: "3px 9px", background: "var(--surface-2)",
                          border: "1px solid var(--border)", borderRadius: 4,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTATO ═══════ */}
      <section id="contato" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner" style={{ paddingBottom: 120 }}>
          <FadeUp>
            <span className="section-label" style={{ marginBottom: 20, display: "inline-flex" }}>04 / Contato</span>
          </FadeUp>

          <div className="contato-grid">
            <FadeUp delay={0.05}>
              <h2 className="contato-h2">
                Vamos{" "}
                <span className="text-accent-gradient">conversar?</span>
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.78, maxWidth: 380, marginTop: 20 }}>
                Tem um projeto ou uma ideia? Manda um e-mail. Respondo em menos de 24h — sem burocracia.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 18 }}>
                {[["⚡", "Resposta em 24h"], ["🎯", "Orçamento grátis"], ["🇧🇷", "PT + EN"]].map(([icon, label]) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-muted)" }}>
                    <span>{icon}</span>{label}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <EmailCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "18px 36px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.04em" }}>© 2026 rwque</span>
          <a
            href="mailto:contato@rwque.lol"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
          >contato@rwque.lol</a>
        </div>
      </footer>
    </div>
  );
}
