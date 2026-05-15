"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── constants ─── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeOut = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

/* ─── FadeUp ─── */
function FadeUp({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── TypeWriter ─── */
function TypeWriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words]);

  return (
    <span>
      <span className="text-accent-gradient">{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "var(--accent)", fontWeight: 300 }}
      >
        |
      </motion.span>
    </span>
  );
}

/* ─── Terminal Card ─── */
function TerminalCard() {
  const lines = [
    { prefix: "$ ", text: "whoami", delay: 0.2, type: "cmd" },
    { prefix: "", text: "rwque", delay: 0.55, type: "out" },
    { prefix: "$ ", text: "cat skills.txt", delay: 0.9, type: "cmd" },
    { prefix: "", text: "React · Next.js · Node.js", delay: 1.25, type: "out" },
    { prefix: "", text: "Playwright · Python · Lua", delay: 1.35, type: "out" },
    { prefix: "$ ", text: "echo $STATUS", delay: 1.75, type: "cmd" },
    { prefix: "", text: "disponível ✓", delay: 2.1, type: "green" },
    { prefix: "$ ", text: "_", delay: 2.5, type: "cursor" },
  ];

  return (
    <div className="terminal-card">
      {/* Bar */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.05em" }}>
          rwque — bash
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.9 }}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.delay, duration: 0.01 }}
            style={{ display: "flex", gap: 2 }}
          >
            {line.type === "cmd" && (
              <>
                <span style={{ color: "var(--accent)", userSelect: "none" }}>{line.prefix}</span>
                <span style={{ color: "var(--text)" }}>{line.text}</span>
              </>
            )}
            {line.type === "out" && (
              <span style={{ color: "var(--text-muted)", paddingLeft: 14 }}>{line.text}</span>
            )}
            {line.type === "green" && (
              <span style={{ color: "#4ade80", paddingLeft: 14 }}>{line.text}</span>
            )}
            {line.type === "cursor" && (
              <motion.span
                style={{ color: "var(--accent)" }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", delay: 2.5 }}
              >
                {line.prefix}
                <span style={{ display: "inline-block", width: 8, height: 15, background: "var(--accent)", verticalAlign: "middle", marginLeft: 1, borderRadius: 1 }} />
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer strip */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "11px 22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>
          pts/1 · Brazil · GMT-3
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "#4ade80",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
            display: "inline-block",
            animation: "pulse-ring 2.2s ease-in-out infinite",
          }} />
          online
        </span>
      </div>
    </div>
  );
}

/* ─── Skill Badge ─── */
function SkillBadge({ label, color, icon }: { label: string; color: string; icon: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -3 : 0, borderColor: hovered ? color + "55" : "rgba(255,255,255,0.07)" }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "10px 16px",
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        gap: 9,
        cursor: "default",
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text)", fontWeight: 500 }}>
        {label}
      </span>
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block", marginLeft: "auto", boxShadow: `0 0 8px ${color}` }}
      />
    </motion.div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({
  number,
  title,
  description,
  items,
  gradient,
}: {
  number: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.45)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.25 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "default",
      }}
    >
      {/* Top gradient band */}
      <div style={{ height: 3, background: gradient }} />

      <div style={{ padding: "30px 30px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.12em" }}>
            {number}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
          >
            SAIBA MAIS →
          </motion.div>
        </div>

        <h3 style={{
          fontFamily: "var(--font-syne)",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: "var(--text)",
          lineHeight: 1.15,
        }}>
          {title}
        </h3>

        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, flex: 1 }}>
          {description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          {items.map((item) => (
            <span
              key={item}
              style={{
                fontSize: 11.5,
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                padding: "4px 10px",
                background: "var(--surface-2)",
                borderRadius: 5,
                border: "1px solid var(--border)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Scroll CTA Button ─── */
function ScrollButton({
  target,
  variant,
  children,
}: {
  target: string;
  variant: "accent" | "outline";
  children: React.ReactNode;
}) {
  const scrollTo = () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <motion.button
      onClick={scrollTo}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      style={{
        padding: "13px 32px",
        background: variant === "accent" ? "var(--accent)" : "transparent",
        color: variant === "accent" ? "#080808" : "var(--text)",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        border: variant === "outline" ? "1px solid var(--border-strong)" : "none",
        cursor: "pointer",
        letterSpacing: "-0.015em",
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── EmailCard ─── */
function EmailCard() {
  const [copied, setCopied] = useState(false);
  const EMAIL = "contato@rwque.lol";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-strong)",
      borderRadius: 18,
      overflow: "hidden",
    }}>
      <a
        href={`mailto:${EMAIL}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "26px 26px",
          textDecoration: "none",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div style={{
          width: 48, height: 48,
          borderRadius: 12,
          background: "rgba(var(--accent-rgb), 0.1)",
          border: "1px solid rgba(var(--accent-rgb), 0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>E-MAIL</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
            {EMAIL}
          </div>
        </div>
      </a>

      <button
        onClick={copy}
        style={{
          width: "100%",
          padding: "18px 26px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          color: copied ? "var(--accent)" : "var(--text-muted)",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
          transition: "color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              COPIADO!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              COPIAR E-MAIL
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ─── data ─── */
const SKILLS = [
  { label: "React", icon: "⚛️", color: "#61dafb" },
  { label: "Next.js", icon: "▲", color: "#ffffff" },
  { label: "TypeScript", icon: "TS", color: "#3178c6" },
  { label: "Node.js", icon: "⬡", color: "#68a063" },
  { label: "Python", icon: "🐍", color: "#ffd43b" },
  { label: "Playwright", icon: "🎭", color: "#e2564b" },
  { label: "Tailwind", icon: "💨", color: "#38bdf8" },
  { label: "Puppeteer", icon: "🤖", color: "#a8b9ff" },
  { label: "Lua / Luau", icon: "🌙", color: "#cbff00" },
  { label: "Bash", icon: "$_", color: "#89e051" },
  { label: "PostgreSQL", icon: "🐘", color: "#336791" },
  { label: "Vercel", icon: "▲", color: "#f0f0f0" },
];

const SERVICES = [
  {
    number: "01",
    title: "Desenvolvimento Web",
    description: "Sites e web apps do zero — landing pages de alta conversão, dashboards, portais e sistemas completos com integrações. Entregue rápido.",
    items: ["Next.js", "React", "TypeScript", "Vercel", "APIs"],
    gradient: "linear-gradient(90deg, #60a5fa, #a78bfa)",
  },
  {
    number: "02",
    title: "Automações de Sites",
    description: "Scrapers, bots e fluxos automatizados. Se acontece num navegador e é repetitivo, existe jeito de automatizar. Playwright, Puppeteer, Python.",
    items: ["Playwright", "Puppeteer", "Python", "Scraping"],
    gradient: "linear-gradient(90deg, #cbff00, #4ade80)",
  },
  {
    number: "03",
    title: "Scripts & Ferramentas",
    description: "CLIs, bots de Discord, automações com Lua/Luau, integrações de API e qualquer ferramenta que resolva um problema específico do seu workflow.",
    items: ["Lua", "Bash", "Node.js", "Discord.js", "CLI"],
    gradient: "linear-gradient(90deg, #fb923c, #f43f5e)",
  },
];

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div>

      {/* ═══════════════════════
          HERO
      ═══════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glows */}
        <div aria-hidden style={{
          position: "absolute", top: "-10%", right: "5%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(203,255,0,0.055) 0%, transparent 65%)",
          filter: "blur(50px)", pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "0%", left: "-5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 65%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* Text content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-inner">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ marginBottom: 36 }}
          >
            <span className="section-label">disponível para projetos · 2026</span>
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: 24 }}>
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="hero-h1"
            >
              RWQUE
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="hero-sub"
          >
            <TypeWriter words={["Web Developer.", "Automation Specialist.", "Script Writer.", "Problem Solver."]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease }}
            className="hero-desc"
          >
            Faço sites, automações e ferramentas que{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>realmente funcionam</strong>.
            {" "}Baseado no Brasil — disponível pra qualquer lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}
          >
            <ScrollButton target="servicos" variant="accent">Ver Serviços</ScrollButton>
            <ScrollButton target="contato" variant="outline">Entrar em contato</ScrollButton>
          </motion.div>
        </motion.div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.35 }}
          className="hero-terminal"
        >
          <TerminalCard />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════
          SOBRE
      ═══════════════════════ */}
      <section id="sobre" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-container">
          <div className="sobre-grid">
            {/* Left */}
            <div>
              <FadeUp>
                <div className="section-label" style={{ marginBottom: 22 }}>01 / Sobre</div>
                <h2 className="section-heading">
                  Código limpo,{" "}
                  <span className="text-accent-gradient">entrega real.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.08}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "clamp(14px, 1.5vw, 16px)", color: "var(--text-muted)", lineHeight: 1.82, marginTop: 24 }}>
                  <p>
                    Oi — sou <strong style={{ color: "var(--text)", fontWeight: 600 }}>Rwque</strong>. Desenvolvo para a web há mais de 3 anos: sites, automações, bots e o que for necessário pra resolver um problema de verdade.
                  </p>
                  <p>
                    Não trabalho com template. Cada projeto começa do zero com a stack certa — e termina funcionando.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["Clareza antes de complexidade", "Código simples bate código inteligente."],
                    ["Entrega que funciona", "Funcional primeiro, refinado depois."],
                    ["Sem enrolação", "Prazo, escopo e preço — direto ao ponto."],
                  ].map(([title, desc], i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
                      style={{
                        padding: "15px 20px",
                        borderLeft: "2px solid var(--accent)",
                        background: "var(--surface)",
                        borderRadius: "0 10px 10px 0",
                      }}
                    >
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{desc}</div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: stats card */}
            <FadeUp delay={0.18}>
              <div className="sobre-card">
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "linear-gradient(135deg, rgba(203,255,0,0.15), rgba(203,255,0,0.05))",
                    border: "1px solid rgba(203,255,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-syne)", fontSize: 16, fontWeight: 800, color: "var(--accent)",
                  }}>
                    R
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>rwque</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Web Developer · Automation</div>
                  </div>
                </div>

                {[
                  ["Localização", "Brasil 🇧🇷"],
                  ["Experiência", "3+ anos"],
                  ["Foco", "Web + Automação"],
                  ["Idiomas", "PT (nativo) · EN"],
                  ["Horário", "GMT-3"],
                  ["Projetos", "20+"],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 24px",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>{value}</span>
                  </div>
                ))}

                <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#4ade80",
                    display: "inline-block", animation: "pulse-ring 2.2s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: 12.5, color: "#4ade80", fontFamily: "var(--font-mono)" }}>
                    Disponível para projetos
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════
          SKILLS
      ═══════════════════════ */}
      <section id="skills" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-container">
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 22 }}>02 / Skills</div>
            <h2 className="section-heading" style={{ marginBottom: 6 }}>O que eu uso.</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 52 }}>
              Stack principal — ferramentas com as quais trabalho dia a dia.
            </p>
          </FadeUp>

          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.45, ease }}
              >
                <SkillBadge {...skill} />
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div style={{
              marginTop: 32, padding: "15px 22px",
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 16 }}>⚡</span>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Usa algo fora dessa lista?{" "}
                <a href="mailto:contato@rwque.lol" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                  Fala comigo
                </a>{" "}
                — me adapto.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════
          SERVIÇOS
      ═══════════════════════ */}
      <section id="servicos" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-container">
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 22 }}>03 / Serviços</div>
            <h2 className="section-heading" style={{ marginBottom: 8 }}>O que posso fazer.</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 460, marginBottom: 56 }}>
              Orçamento por escopo. Sem mensalidade, sem enrolação — me conta o projeto.
            </p>
          </FadeUp>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.number} delay={i * 0.1}>
                <ServiceCard {...svc} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════
          CONTATO
      ═══════════════════════ */}
      <section id="contato" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-container" style={{ paddingBottom: 120 }}>
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 22 }}>04 / Contato</div>
          </FadeUp>

          <div className="contato-grid">
            <FadeUp delay={0.05}>
              <h2 className="contato-heading">
                Vamos{" "}
                <span className="text-accent-gradient">conversar?</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 400, marginTop: 20 }}>
                Tem um projeto, uma ideia ou só uma dúvida? Manda um e-mail.
                Respondo em menos de 24h — sem burocracia.
              </p>
              <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 20 }}>
                {[
                  { icon: "⚡", label: "Resposta em 24h" },
                  { icon: "🎯", label: "Orçamento grátis" },
                  { icon: "🇧🇷", label: "PT + EN" },
                ].map(({ icon, label }) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-muted)" }}>
                    <span>{icon}</span> {label}
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

      {/* ═══════════════════════
          FOOTER
      ═══════════════════════ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 32px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.05em" }}>
            © 2026 rwque
          </span>
          <a
            href="mailto:contato@rwque.lol"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
          >
            contato@rwque.lol
          </a>
        </div>
      </footer>
    </div>
  );
}
