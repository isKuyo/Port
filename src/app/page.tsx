"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    title: "Desenvolvimento Web",
    desc: "Sites, landing pages e web apps completos. Do design ao deploy — com Next.js, React e TypeScript.",
  },
  {
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos com Playwright e Python. Se acontece num browser, dá pra automatizar.",
  },
  {
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, scripts em Lua e Bash, integrações de API — ferramentas sob medida para qualquer problema.",
  },
];

const STACK = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Playwright", "Puppeteer", "Lua", "Bash", "Tailwind CSS", "PostgreSQL", "Vercel"];

const S = {
  wrap: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "0 28px",
  } as React.CSSProperties,
  divider: {
    width: "100%",
    height: 1,
    background: "var(--border)",
  } as React.CSSProperties,
};

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText("contato@rwque.lol"); }
    catch { window.location.href = "mailto:contato@rwque.lol"; return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      {/* ── TOP NAV ────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            ...S.wrap,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 52,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text)" }}>
            rwque
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href="https://github.com/isKuyo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: 8,
                border: "1px solid var(--border)",
                color: "var(--text-3)",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text)"; el.style.borderColor = "rgba(25,24,24,0.25)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-3)"; el.style.borderColor = "var(--border)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="mailto:contato@rwque.lol"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: 8,
                border: "1px solid var(--border)",
                color: "var(--text-3)",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text)"; el.style.borderColor = "rgba(25,24,24,0.25)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-3)"; el.style.borderColor = "var(--border)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────── */}
      <section style={{ ...S.wrap, paddingTop: 80, paddingBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 7vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Olá, sou rwque —<br />
            <span style={{ color: "var(--text-3)" }}>desenvolvo para a web.</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 460 }}>
            Faço sites e automações que funcionam. React, Next.js, Python.{" "}
            Baseado no Brasil, disponível para qualquer lugar.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="#contato"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "9px 20px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Falar comigo
            </a>
            <a
              href="#servicos"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "9px 20px",
                background: "transparent",
                color: "var(--text-2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(25,24,24,0.3)"; el.style.color = "var(--text)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-2)"; }}
            >
              Ver serviços
            </a>
          </div>
        </motion.div>
      </section>

      <div style={S.divider} />

      {/* ── SOBRE ────────────────────────── */}
      <section id="sobre" style={{ ...S.wrap, paddingTop: 64, paddingBottom: 64, scrollMarginTop: 52 }}>
        <Reveal>
          <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 24 }}>
            Sobre
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8 }}>
              Trabalho com desenvolvimento web e automações há 3 anos. Construo desde landing pages simples até
              sistemas completos com APIs e dashboards.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8 }}>
              Também sou especialista em automações de browser — scraping, bots e fluxos automáticos com Playwright
              e Python. Além disso, escrevo scripts em Lua/Roblox, Bash e Node.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8 }}>
              Sem contrato de mensalidade. Orçamento por escopo, entrega real.
            </p>
          </div>
        </Reveal>

        {/* Stack pills */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {STACK.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
                style={{
                  fontSize: 12.5,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-3)",
                  padding: "4px 11px",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  background: "var(--bg2)",
                  cursor: "default",
                  transition: "color 0.15s",
                }}
                whileHover={{ color: "var(--text)" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={S.divider} />

      {/* ── SERVIÇOS ────────────────────────── */}
      <section id="servicos" style={{ ...S.wrap, paddingTop: 64, paddingBottom: 64, scrollMarginTop: 52 }}>
        <Reveal>
          <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 32 }}>
            Serviços
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.08}>
              <div
                style={{
                  paddingTop: i === 0 ? 0 : 28,
                  paddingBottom: 28,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--text)",
                  marginBottom: 10,
                }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-3)", lineHeight: 1.75 }}>{svc.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* ── CONTATO ────────────────────────── */}
      <section id="contato" style={{ ...S.wrap, paddingTop: 64, paddingBottom: 96, scrollMarginTop: 52 }}>
        <Reveal>
          <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 24 }}>
            Contato
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Tem um projeto?<br />Fala comigo.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-3)", lineHeight: 1.75, marginBottom: 36 }}>
            Respondo em menos de 24h. Sem burocracia, sem custo pra conversar.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
            {/* Email button */}
            <a
              href="mailto:contato@rwque.lol"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <span>contato@rwque.lol</span>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="10" x2="10" y2="2" /><polyline points="4,2 10,2 10,8" />
              </svg>
            </a>

            {/* Copy button */}
            <motion.button
              onClick={copy}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "13px 18px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: copied ? "var(--text)" : "var(--text-3)",
                background: copied ? "var(--bg2)" : "transparent",
                transition: "color 0.15s, background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "rgba(25,24,24,0.25)"; }}
              onMouseLeave={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

      {/* ── FOOTER ────────────────────────── */}
      <div style={S.divider} />
      <footer style={{ ...S.wrap, paddingTop: 20, paddingBottom: 32 }}>
        <p style={{ fontSize: 12.5, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
          © 2026 rwque
        </p>
      </footer>
    </>
  );
}
