"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const SERVICES = [
  {
    number: "01",
    title: "Desenvolvimento Web",
    description:
      "Sites, landing pages e web apps feitos do zero. Desde o design até o deploy — sem templates prontos, sem gambiarras.",
    features: [
      "Landing pages de alta conversão",
      "Web apps full-stack com React/Next.js",
      "Dashboards e painéis administrativos",
      "Integrações com APIs externas",
      "SEO on-page e performance",
      "Deploy e configuração de domínio",
    ],
    accent: "#cbff00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Automações de Sites",
    description:
      "Bots, scrapers e fluxos automatizados que trabalham por você. Se é repetitivo e acontece num navegador, dá pra automatizar.",
    features: [
      "Web scraping e extração de dados",
      "Automação de tarefas repetitivas",
      "Bots de monitoramento e alertas",
      "Preenchimento automático de formulários",
      "Testes automatizados com Playwright",
      "Integração com planilhas e bancos de dados",
    ],
    accent: "#60a5fa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Scripts & Ferramentas",
    description:
      "Scripts customizados, bots e ferramentas internas que resolvem problemas específicos do seu negócio ou fluxo de trabalho.",
    features: [
      "Scripts de processamento de dados",
      "Bots para Discord / Telegram",
      "Ferramentas de linha de comando (CLI)",
      "Integrações entre plataformas (webhooks)",
      "Relatórios automáticos via e-mail",
      "Manutenção e evolução de código existente",
    ],
    accent: "#a78bfa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l2 2-2 2M11 12h4" />
      </svg>
    ),
  },
];

export default function ServicosPage() {
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
          03 / Serviços
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--text)",
            maxWidth: 640,
            marginBottom: 16,
          }}
        >
          O que posso fazer por você.
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 500 }}>
          Cada projeto é tratado individualmente. Orçamento por escopo, sem valores fixos na parede — me conta o que você precisa.
        </p>
      </motion.div>

      {/* Service cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SERVICES.map((service) => (
          <motion.div
            key={service.number}
            variants={fadeUp}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "36px 36px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "start",
              transition: "border-color 0.25s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${service.accent}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            {/* Accent glow */}
            <div
              style={{
                position: "absolute",
                top: -60,
                left: -60,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${service.accent}0a 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* Left: title + desc */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: `${service.accent}12`,
                    border: `1px solid ${service.accent}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: service.accent,
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: service.accent,
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    {service.number}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "var(--text)",
                      lineHeight: 1.1,
                    }}
                  >
                    {service.title}
                  </h2>
                </div>
              </div>

              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                }}
              >
                {service.description}
              </p>
            </div>

            {/* Right: features list */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-faint)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Inclui
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {service.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13.5,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: service.accent,
                        flexShrink: 0,
                        opacity: 0.7,
                      }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        variants={fadeUp}
        style={{
          marginTop: 48,
          padding: "32px 36px",
          background: "rgba(var(--accent-rgb), 0.04)",
          border: "1px solid rgba(var(--accent-rgb), 0.14)",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            Tem um projeto em mente?
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Manda um e-mail com a ideia. Respondo rápido.
          </p>
        </div>
        <Link
          href="/contato"
          style={{
            padding: "13px 28px",
            background: "var(--accent)",
            color: "#080808",
            borderRadius: 9,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Falar sobre projeto →
        </Link>
      </motion.div>
    </motion.div>
  );
}
