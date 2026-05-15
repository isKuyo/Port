"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ─── animation helpers ─── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── data ─── */
const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    color: "#60a5fa",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    color: "#a78bfa",
    skills: ["Node.js", "Python", "REST APIs", "Vercel"],
  },
  {
    label: "Automações",
    color: "#cbff00",
    skills: ["Playwright", "Puppeteer", "Web Scraping", "Bots & Scripts"],
  },
  {
    label: "Scripts",
    color: "#fb923c",
    skills: ["Lua / Luau", "C++", "C#", "Bash"],
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Desenvolvimento Web",
    description: "Sites e web apps feitos do zero — desde landing pages de alta conversão até dashboards completos com integrações.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Automações de Sites",
    description: "Scrapers, bots e fluxos automatizados. Se é repetitivo e acontece num navegador, dá pra automatizar.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scripts & Ferramentas",
    description: "Bots, CLIs e scripts customizados que resolvem problemas específicos do seu fluxo de trabalho.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 8l2 2-2 2M11 12h4" />
      </svg>
    ),
  },
];

/* ─── page ─── */
export default function Home() {
  return (
    <div>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
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
        {/* Noise texture overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
            opacity: 0.022,
            pointerEvents: "none",
          }}
        />
        {/* Big blurred glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%", left: "55%",
            width: 480, height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(203,255,0,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              style={{ marginBottom: 28 }}
            >
              <span className="section-label">Portfolio · 2026</span>
            </motion.div>

            {/* Big name */}
            <div style={{ overflow: "hidden", marginBottom: 4 }}>
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.08 }}
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(76px, 13vw, 160px)",
                  fontWeight: 800,
                  lineHeight: 0.88,
                  letterSpacing: "-0.045em",
                  color: "var(--text)",
                }}
              >
                RWQUE
              </motion.h1>
            </div>

            {/* Subtitle row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, marginTop: 20, flexWrap: "wrap" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "-0.02em",
                }}
              >
                Web Developer
              </span>
              <span
                style={{
                  width: 28, height: 1,
                  background: "rgba(var(--accent-rgb), 0.5)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "-0.02em",
                }}
              >
                Automation Specialist
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease }}
              style={{
                fontSize: "clamp(14px, 1.7vw, 17px)",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 44,
              }}
            >
              Faço sites, automações e ferramentas que{" "}
              <em style={{ color: "var(--text)", fontStyle: "normal", fontWeight: 600 }}>
                realmente funcionam
              </em>
              . Baseado no Brasil, disponível para projetos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <ScrollButton target="servicos" variant="accent">Ver Serviços</ScrollButton>
              <ScrollButton target="contato" variant="outline">Contato</ScrollButton>
            </motion.div>
          </div>

          {/* Right: code block card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease }}
            className="hero-card"
          >
            <CodeCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-faint)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════
          SOBRE
      ══════════════════════════════ */}
      <section id="sobre" style={{ borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "100px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <FadeUp>
              <div className="section-label" style={{ marginBottom: 20 }}>01 / Sobre</div>
              <h2
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(30px, 4.5vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.07,
                  color: "var(--text)",
                  marginBottom: 28,
                }}
              >
                Código limpo,{" "}
                <span className="text-accent-gradient">entrega real.</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "clamp(14px, 1.5vw, 16px)", color: "var(--text-muted)", lineHeight: 1.8 }}>
                <p>
                  Oi — sou <strong style={{ color: "var(--text)", fontWeight: 600 }}>Rwque</strong>, desenvolvedor web com mais de 3 anos de experiência. O que me motiva é simples: fazer coisas que funcionam de verdade e que as pessoas realmente usam.
                </p>
                <p>
                  Hoje atuo com{" "}
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>desenvolvimento full-stack</span> e{" "}
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>automações web</span> — desde scraping e bots até sistemas completos. Gosto de projetos com propósito.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Clareza antes de complexidade", d: "Código simples que qualquer um entende." },
                  { t: "Entrega que funciona", d: "Funcional primeiro, perfeito depois." },
                  { t: "Comunicação direta", d: "Sem enrolação — preço, prazo, escopo." },
                ].map(({ t, d }) => (
                  <div
                    key={t}
                    style={{
                      padding: "14px 18px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--accent)",
                      borderRadius: "0 10px 10px 0",
                    }}
                  >
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{d}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Quick facts */}
          <FadeUp delay={0.15}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
                position: "sticky",
                top: "calc(var(--nav-height) + 24px)",
              }}
            >
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--font-syne)", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>
                  Rwque
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Web Developer · Automation Specialist</div>
              </div>
              {[
                ["Localização", "Brasil 🇧🇷"],
                ["Foco", "Web + Automação"],
                ["Experiência", "3+ anos"],
                ["Disponível", "✓ Sim"],
                ["Idiomas", "PT (nativo) · EN"],
                ["Horário", "GMT-3"],
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
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
                <StatusDot />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════
          SKILLS
      ══════════════════════════════ */}
      <section id="skills" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 20 }}>02 / Skills</div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              O que eu uso.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 60 }}>Ferramentas e tecnologias por categoria.</p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {SKILL_CATEGORIES.map((cat, i) => (
              <FadeUp key={cat.label} delay={i * 0.07}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "24px 24px",
                    height: "100%",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${cat.color}35`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <span
                      style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: cat.color,
                        boxShadow: `0 0 10px ${cat.color}88`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: "var(--text)",
                          padding: "5px 12px",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border-strong)",
                          borderRadius: 6,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div
              style={{
                marginTop: 28,
                padding: "16px 22px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>⚡</span>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Usa algo fora dessa lista?{" "}
                <a href="mailto:contato@rwque.lol" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                  Fala comigo
                </a>{" "}
                — me adapto rápido.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════
          SERVIÇOS
      ══════════════════════════════ */}
      <section id="servicos" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 20 }}>03 / Serviços</div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              O que posso fazer.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 440, marginBottom: 60 }}>
              Cada projeto é tratado individualmente. Orçamento por escopo — me conta a ideia.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.number} delay={i * 0.1}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "32px 30px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    transition: "border-color 0.25s ease, transform 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(var(--accent-rgb), 0.28)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 48, height: 48,
                        borderRadius: 12,
                        background: "rgba(var(--accent-rgb), 0.08)",
                        border: "1px solid rgba(var(--accent-rgb), 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                      }}
                    >
                      {svc.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--text-faint)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {svc.number}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "var(--text)",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>
                    {svc.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CONTATO
      ══════════════════════════════ */}
      <section id="contato" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 32px 120px" }}>
          <FadeUp>
            <div className="section-label" style={{ marginBottom: 20 }}>04 / Contato</div>
          </FadeUp>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <FadeUp delay={0.05}>
              <h2
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(32px, 5vw, 60px)",
                  fontWeight: 800,
                  letterSpacing: "-0.045em",
                  lineHeight: 1.0,
                  color: "var(--text)",
                  marginBottom: 20,
                }}
              >
                Vamos{" "}
                <span className="text-accent-gradient">conversar?</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 400 }}>
                Se você tem um projeto, uma ideia, ou só quer tirar uma dúvida — manda um e-mail. Respondo em menos de 24h.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 20 }}>
                {[
                  { icon: "⚡", label: "Resposta rápida" },
                  { icon: "🎯", label: "Orçamento grátis" },
                  { icon: "🇧🇷", label: "PT + EN" },
                ].map(({ icon, label }) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-muted)" }}>
                    <span>{icon}</span>
                    {label}
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

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 32px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-faint)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 rwque
          </span>
          <a
            href="mailto:contato@rwque.lol"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-faint)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
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

/* ─── small sub-components ─── */

function ScrollButton({
  target,
  variant,
  children,
}: {
  target: string;
  variant: "accent" | "outline";
  children: React.ReactNode;
}) {
  const scrollTo = () => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (variant === "accent") {
    return (
      <button
        onClick={scrollTo}
        style={{
          padding: "13px 30px",
          background: "var(--accent)",
          color: "#080808",
          borderRadius: 9,
          fontSize: 14,
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          letterSpacing: "-0.01em",
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = "0.86"; el.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={scrollTo}
      style={{
        padding: "13px 30px",
        background: "transparent",
        color: "var(--text)",
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 600,
        border: "1px solid var(--border-strong)",
        cursor: "pointer",
        letterSpacing: "-0.01em",
        transition: "border-color 0.2s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(var(--accent-rgb), 0.4)"; el.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-strong)"; el.style.transform = "translateY(0)"; }}
    >
      {children}
    </button>
  );
}

function StatusDot() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.4)",
          animation: "pulse-ring 2.2s ease-in-out infinite",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12.5, color: "#4ade80", fontFamily: "var(--font-mono)" }}>
        Disponível para projetos
      </span>
    </div>
  );
}

function CodeCard() {
  return (
    <div
      style={{
        width: 300,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", marginLeft: 4 }}>
          rwque.ts
        </span>
      </div>
      {/* Code */}
      <div style={{ padding: "18px 20px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 2 }}>
        <span style={{ color: "#737373" }}>{"// about me"}</span>
        <br />
        <span style={{ color: "#c792ea" }}>const </span>
        <span style={{ color: "var(--text)" }}>dev </span>
        <span style={{ color: "#89ddff" }}>= </span>
        <span style={{ color: "#c792ea" }}>{"{"}</span>
        <br />
        <span style={{ paddingLeft: 18, color: "#82aaff" }}>stack</span>
        <span style={{ color: "var(--text-muted)" }}>: </span>
        <span style={{ color: "var(--accent)" }}>"React / Next.js"</span>
        <span style={{ color: "var(--text-muted)" }}>,</span>
        <br />
        <span style={{ paddingLeft: 18, color: "#82aaff" }}>foco</span>
        <span style={{ color: "var(--text-muted)" }}>: </span>
        <span style={{ color: "var(--accent)" }}>"Web & Automação"</span>
        <span style={{ color: "var(--text-muted)" }}>,</span>
        <br />
        <span style={{ paddingLeft: 18, color: "#82aaff" }}>local</span>
        <span style={{ color: "var(--text-muted)" }}>: </span>
        <span style={{ color: "var(--accent)" }}>"Brasil 🇧🇷"</span>
        <span style={{ color: "var(--text-muted)" }}>,</span>
        <br />
        <span style={{ paddingLeft: 18, color: "#82aaff" }}>status</span>
        <span style={{ color: "var(--text-muted)" }}>: </span>
        <span style={{ color: "#4ade80" }}>"disponível"</span>
        <span style={{ color: "var(--text-muted)" }}>,</span>
        <br />
        <span style={{ color: "#c792ea" }}>{"}"}</span>
        <span style={{ color: "var(--text-muted)" }}>;</span>
      </div>
      {/* Stats row */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {[
          { v: "3+", l: "anos" },
          { v: "BR", l: "GMT-3" },
        ].map(({ v, l }, i) => (
          <div
            key={l}
            style={{
              padding: "14px 18px",
              borderRight: i === 0 ? "1px solid var(--border)" : "none",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-syne)", fontSize: 22, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>
              {v}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", marginTop: 4, letterSpacing: "0.06em" }}>
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <a
        href={`mailto:${EMAIL}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "24px 24px",
          textDecoration: "none",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div
          style={{
            width: 44, height: 44,
            borderRadius: 11,
            background: "rgba(var(--accent-rgb), 0.1)",
            border: "1px solid rgba(var(--accent-rgb), 0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>E-MAIL</div>
          <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
            {EMAIL}
          </div>
        </div>
      </a>

      <button
        onClick={copy}
        style={{
          width: "100%",
          padding: "16px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: copied ? "var(--accent)" : "var(--text-muted)",
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.06em",
          transition: "color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        {copied ? "COPIADO!" : "COPIAR E-MAIL"}
      </button>
    </div>
  );
}
