"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const FACTS = [
  { label: "Localização", value: "Brasil 🇧🇷" },
  { label: "Foco principal", value: "Web + Automação" },
  { label: "Experiência", value: "3+ anos" },
  { label: "Disponível", value: "Sim — contato rápido" },
  { label: "Idiomas", value: "PT (nativo) · EN" },
  { label: "Horário", value: "GMT-3 (BRT)" },
];

export default function SobrePage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "64px 32px 80px",
        minHeight: "calc(100dvh - var(--nav-height))",
      }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} style={{ marginBottom: 64 }}>
        <div className="section-label" style={{ marginBottom: 18 }}>
          01 / Sobre mim
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--text)",
            maxWidth: 680,
          }}
        >
          Código limpo,{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #8fff4a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            entrega real.
          </span>
        </h1>
      </motion.div>

      {/* Two columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left: bio text */}
        <motion.div variants={fadeUp}>
          <div
            style={{
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "var(--text-muted)",
              lineHeight: 1.85,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p>
              Oi, sou <span style={{ color: "var(--text)", fontWeight: 600 }}>Rwque</span> — desenvolvedor baseado no Brasil. Trabalho com web há mais de 3 anos, e o que me motiva é simples: fazer coisas que funcionam de verdade e que as pessoas realmente usam.
            </p>
            <p>
              Comecei criando scripts e ferramentas por hobby, e fui percebendo que a linha entre "código bacana" e "produto que resolve problema" era exatamente onde eu queria trabalhar. Hoje atuo com{" "}
              <span style={{ color: "var(--text)", fontWeight: 500 }}>desenvolvimento web full-stack</span> e{" "}
              <span style={{ color: "var(--text)", fontWeight: 500 }}>automações de sites</span> — desde scraping e bots até sistemas completos de processamento de dados.
            </p>
            <p>
              Gosto de projetos com propósito. Se você tem uma ideia ou um problema que precisa de solução técnica, a gente pode conversar.
            </p>
          </div>

          {/* Values */}
          <div style={{ marginTop: 48 }}>
            <h3
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-faint)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Princípios
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Clareza antes de complexidade", desc: "Código simples que qualquer um entende é melhor que código inteligente que só eu entendo." },
                { title: "Entrega que funciona", desc: "Prefiro entregar algo funcional e evoluir do que buscar a solução perfeita por semanas." },
                { title: "Comunicação direta", desc: "Sem enrolação. Explico o que faço, quando entrego e quanto custa." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "16px 18px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    borderLeft: "2px solid var(--accent)",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 5 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: facts card */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(var(--accent-rgb), 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                👤
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>
                  Rwque
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Web Developer · Automation Specialist</div>
              </div>
            </div>

            {FACTS.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 22px",
                  borderBottom: i < FACTS.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text)",
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:contato@rwque.lol"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 22px",
              background: "rgba(var(--accent-rgb), 0.06)",
              border: "1px solid rgba(var(--accent-rgb), 0.18)",
              borderRadius: 12,
              textDecoration: "none",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(var(--accent-rgb), 0.1)";
              el.style.borderColor = "rgba(var(--accent-rgb), 0.32)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(var(--accent-rgb), 0.06)";
              el.style.borderColor = "rgba(var(--accent-rgb), 0.18)";
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>
                Vamos trabalhar juntos?
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                contato@rwque.lol
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
