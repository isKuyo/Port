"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── constants ─── */
const SECTIONS = ["sobre", "skills", "servicos", "contato"] as const;

const SKILLS_ROW = [
  ["React", "Next.js", "TypeScript", "Node.js"],
  ["Python", "Playwright", "Puppeteer", "Lua / Luau"],
  ["Tailwind CSS", "PostgreSQL", "Bash", "Vercel"],
];

const SERVICES = [
  {
    title: "Desenvolvimento Web",
    desc: "Sites, landing pages de alta conversão e web apps completos — do design ao deploy, com a stack certa.",
    tags: ["Next.js", "React", "TypeScript", "APIs"],
  },
  {
    title: "Automações de Sites",
    desc: "Scrapers, bots e fluxos automáticos para tudo que acontece num browser. Playwright, Puppeteer, Python.",
    tags: ["Playwright", "Puppeteer", "Python", "Scraping"],
  },
  {
    title: "Scripts & Ferramentas",
    desc: "CLIs, bots de Discord, automações com Lua/Roblox, integrações de API — qualquer ferramenta que resolva um problema real.",
    tags: ["Lua", "Bash", "Discord.js", "Node.js"],
  },
];

/* ─── Fade-in on scroll ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Typewriter ─── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), 72);
    } else if (!deleting && text.length === word.length) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);

  return (
    <span>
      <span style={{ color: "var(--accent)" }}>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "var(--accent)", marginLeft: 1 }}
      >_</motion.span>
    </span>
  );
}

/* ─── Social icons ─── */
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="10" x2="10" y2="2"/>
      <polyline points="4,2 10,2 10,8"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Home() {
  const [active, setActive] = useState<string>("sobre");
  const [copied, setCopied] = useState(false);

  /* Track active section */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contato@rwque.lol");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:contato@rwque.lol";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        maxWidth: 1160,
        margin: "0 auto",
        padding: "0 40px",
        gap: 0,
      }}
    >
      {/* ══════════════════
          LEFT — sticky sidebar
      ══════════════════ */}
      <aside
        style={{
          width: "var(--sidebar-w)",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 0 48px",
        }}
      >
        {/* Identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              rwque
            </h1>
            <div
              style={{
                marginTop: 8,
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--text-sub)",
                letterSpacing: "-0.01em",
              }}
            >
              <Typewriter words={["Web Developer", "Automation Specialist", "Script Writer"]} />
            </div>
            <p
              style={{
                marginTop: 18,
                fontSize: 13,
                color: "var(--text-sub)",
                lineHeight: 1.75,
                maxWidth: 220,
              }}
            >
              Faço sites e automações que realmente funcionam. Baseado no Brasil.
            </p>
          </motion.div>

          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 4 }}
          >
            {[
              { id: "sobre",    label: "Sobre" },
              { id: "skills",   label: "Skills" },
              { id: "servicos", label: "Serviços" },
              { id: "contato",  label: "Contato" },
            ].map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "7px 0",
                    color: isActive ? "var(--text)" : "var(--text-faint)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      height: 1,
                      width: isActive ? 40 : 20,
                      background: isActive ? "var(--accent)" : "currentColor",
                      transition: "width 0.25s, background 0.2s",
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </button>
              );
            })}
          </motion.nav>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ display: "flex", gap: 18, alignItems: "center" }}
        >
          {[
            { href: "https://github.com/isKuyo", label: "GitHub", Icon: GitHubIcon },
            { href: "mailto:contato@rwque.lol", label: "Email", Icon: EmailIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                color: "var(--text-faint)",
                transition: "color 0.18s, transform 0.18s",
                display: "flex",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-faint)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      </aside>

      {/* ══════════════════
          RIGHT — scrollable
      ══════════════════ */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          paddingLeft: 72,
          paddingTop: 80,
          paddingBottom: 120,
        }}
      >

        {/* ─── SOBRE ─── */}
        <section id="sobre" style={{ marginBottom: 96, scrollMarginTop: 80 }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                marginBottom: 32,
              }}
            >
              Sobre
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontSize: 15, color: "var(--text-sub)", lineHeight: 1.82 }}>
                Oi — sou <strong style={{ color: "var(--text)", fontWeight: 600 }}>Rwque</strong>, desenvolvedor web e especialista em automações. Trabalho com React, Next.js e Node.js pra criar produtos que funcionam de verdade — sem rodeios.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-sub)", lineHeight: 1.82 }}>
                Além de web, construo automações com Playwright e Python pra qualquer coisa que acontece num browser. Também escrevo scripts em Lua, Bash e Node para problemas específicos.
              </p>
              <p style={{ fontSize: 15, color: "var(--text-sub)", lineHeight: 1.82 }}>
                Orçamento por escopo, sem mensalidade. Falo português e inglês. Disponível agora.
              </p>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                gap: 0,
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {[
                ["3+", "Anos de experiência"],
                ["20+", "Projetos entregues"],
                ["BR", "GMT−3 · PT & EN"],
              ].map(([num, label], i, arr) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    padding: "24px 0",
                    borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                    paddingLeft: i > 0 ? 24 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: 26,
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "var(--text)",
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── SKILLS ─── */}
        <section id="skills" style={{ marginBottom: 96, scrollMarginTop: 80 }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                marginBottom: 32,
              }}
            >
              Skills
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SKILLS_ROW.map((row, ri) => (
              <Reveal key={ri} delay={ri * 0.07}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {row.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ri * 0.06 + si * 0.04, duration: 0.3 }}
                      whileHover={{ borderColor: "var(--border-hi)", color: "var(--text)" }}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12.5,
                        color: "var(--text-sub)",
                        cursor: "default",
                        transition: "border-color 0.18s, color 0.18s",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── SERVIÇOS ─── */}
        <section id="servicos" style={{ marginBottom: 96, scrollMarginTop: 80 }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                marginBottom: 32,
              }}
            >
              Serviços
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.018)" }}
                  transition={{ duration: 0.18 }}
                  style={{
                    padding: "28px 24px",
                    borderRadius: 12,
                    marginLeft: -24,
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: "-0.025em",
                        color: "var(--text)",
                        lineHeight: 1.2,
                      }}
                    >
                      {svc.title}
                    </h3>
                    <span style={{ color: "var(--text-faint)", flexShrink: 0, marginTop: 2 }}>
                      <ArrowIcon />
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-sub)", lineHeight: 1.75, marginBottom: 16 }}>{svc.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {svc.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          fontFamily: "var(--font-mono)",
                          color: "var(--accent)",
                          padding: "2px 8px",
                          background: "var(--accent-dim)",
                          borderRadius: 4,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── CONTATO ─── */}
        <section id="contato" style={{ scrollMarginTop: 80 }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                marginBottom: 32,
              }}
            >
              Contato
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div style={{ maxWidth: 480 }}>
              <p
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "var(--text)",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Tem um projeto?<br />
                <span style={{ color: "var(--accent)" }}>Fala comigo.</span>
              </p>
              <p style={{ fontSize: 14, color: "var(--text-sub)", lineHeight: 1.75, marginBottom: 36 }}>
                Respondo em menos de 24h. Sem burocracia.
              </p>

              {/* Email card */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <a
                  href="mailto:contato@rwque.lol"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    transition: "background 0.18s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-faint)", letterSpacing: "0.12em", marginBottom: 3 }}>E-MAIL</div>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
                      contato@rwque.lol
                    </div>
                  </div>
                  <span style={{ color: "var(--text-faint)" }}><ArrowIcon /></span>
                </a>
              </div>

              {/* Copy button */}
              <motion.button
                onClick={copyEmail}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  background: copied ? "var(--accent-dim)" : "transparent",
                  border: `1px solid ${copied ? "rgba(203,255,0,0.25)" : "var(--border)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  color: copied ? "var(--accent)" : "var(--text-sub)",
                  textTransform: "uppercase",
                  transition: "background 0.2s, border-color 0.2s, color 0.2s",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

        {/* Footer */}
        <div
          style={{
            marginTop: 120,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
            © 2026 rwque
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
            built with Next.js
          </span>
        </div>
      </main>

    </div>
  );
}
