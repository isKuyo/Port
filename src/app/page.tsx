"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── helpers ─── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── data ─── */
const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Python", "Playwright", "Puppeteer", "Tailwind CSS",
  "Lua / Luau", "Bash", "PostgreSQL", "Vercel",
];

const SERVICES = [
  {
    title: "Desenvolvimento Web",
    desc: "Sites, landing pages e web apps completos. Do design ao deploy, com a stack certa para o projeto.",
  },
  {
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos com Playwright e Python. Se acontece num browser, dá pra automatizar.",
  },
  {
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, scripts em Lua/Bash, integrações de API. Ferramentas sob medida para um problema real.",
  },
];

/* ─── icon components ─── */
function IconGitHub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="10" x2="10" y2="2" />
      <polyline points="4,2 10,2 10,8" />
    </svg>
  );
}

/* ══════════════════════════════
   PAGE
══════════════════════════════ */
export default function Home() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText("contato@rwque.lol"); }
    catch { window.location.href = "mailto:contato@rwque.lol"; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // inline link style helper
  const link = {
    color: "var(--text-3)",
    borderBottom: "1px solid var(--border)",
    paddingBottom: 1,
    transition: "color 0.15s, border-color 0.15s",
  } as React.CSSProperties;

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "72px 32px 120px",
      }}
    >

      {/* ─── HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ marginBottom: 56 }}
      >
        <h1 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>rwque</h1>
        <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.65 }}>
          Desenvolvedor web e automações.{" "}
          <span style={{ color: "var(--text-4)" }}>Baseado no Brasil.</span>
        </p>

        {/* Nav links */}
        <div style={{ marginTop: 20, display: "flex", gap: 20, alignItems: "center" }}>
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Skills", href: "#skills" },
            { label: "Serviços", href: "#servicos" },
            { label: "Contato", href: "#contato" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 13.5, color: "var(--text-3)", transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-3)")}
            >
              {label}
            </a>
          ))}

          <div style={{ marginLeft: "auto", display: "flex", gap: 14, color: "var(--text-4)" }}>
            <a
              href="https://github.com/isKuyo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-4)")}
            >
              <IconGitHub />
            </a>
            <a
              href="mailto:contato@rwque.lol"
              aria-label="Email"
              style={{ transition: "color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-4)")}
            >
              <IconMail />
            </a>
          </div>
        </div>
      </motion.header>

      {/* ─── SOBRE ─── */}
      <section id="sobre" style={{ scrollMarginTop: 40, marginBottom: 64 }}>
        <Reveal>
          <p style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 14 }}>
            Oi — construo sites e automações que funcionam. Trabalho com React, Next.js e Node.js
            pra criar interfaces limpas e produtos sólidos.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 14 }}>
            Também faço automações com{" "}
            <a href="#skills" style={link}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >Playwright e Python</a>
            {" "}— scraping, bots, fluxos. Além de scripts em Lua, Bash e Node.
          </p>
          <p style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.8 }}>
            Orçamento por escopo, resposta em menos de 24h.{" "}
            <a href="#contato" style={link}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >Disponível agora.</a>
          </p>
        </Reveal>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" style={{ scrollMarginTop: 40, marginBottom: 64 }}>
        <Reveal>
          <h2 style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-4)", marginBottom: 20 }}>
            Stack
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025, duration: 0.3 }}
                style={{
                  fontSize: 13,
                  color: "var(--text-3)",
                  padding: "4px 12px",
                  border: "1px solid var(--border)",
                  borderRadius: 99,
                  background: "var(--bg)",
                  fontFamily: "var(--font-mono)",
                  transition: "border-color 0.15s, color 0.15s",
                  cursor: "default",
                }}
                whileHover={{ color: "var(--text)", borderColor: "#d1d5db" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── SERVIÇOS ─── */}
      <section id="servicos" style={{ scrollMarginTop: 40, marginBottom: 64 }}>
        <Reveal>
          <h2 style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-4)", marginBottom: 20 }}>
            Serviços
          </h2>
        </Reveal>
        <div
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ backgroundColor: "var(--hover-bg)" }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: "22px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text)" }}>{svc.title}</h3>
                    <span style={{ color: "var(--text-4)", flexShrink: 0 }}><IconArrow /></span>
                  </div>
                  <p style={{ fontSize: 13.5, color: "var(--text-3)", lineHeight: 1.7 }}>{svc.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CONTATO ─── */}
      <section id="contato" style={{ scrollMarginTop: 40, marginBottom: 80 }}>
        <Reveal>
          <h2 style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-4)", marginBottom: 20 }}>
            Contato
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p style={{ fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 28 }}>
            Tem um projeto ou ideia? Manda uma mensagem. Respondo em menos de 24h.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Email row */}
            <a
              href="mailto:contato@rwque.lol"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text-2)",
                fontSize: 14,
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
                (e.currentTarget as HTMLElement).style.background = "var(--hover-bg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "var(--text-4)" }}><IconMail /></span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13.5 }}>contato@rwque.lol</span>
              </div>
              <span style={{ color: "var(--text-4)" }}><IconArrow /></span>
            </a>

            {/* Copy button */}
            <motion.button
              onClick={copy}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "12px 16px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 13,
                color: copied ? "var(--text)" : "var(--text-4)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                background: copied ? "var(--hover-bg)" : "transparent",
                transition: "color 0.15s, background 0.15s",
                textTransform: "uppercase" as const,
              }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Copiado
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

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
        <p style={{ fontSize: 12.5, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>
          © 2026 rwque · contato@rwque.lol
        </p>
      </footer>
    </div>
  );
}
