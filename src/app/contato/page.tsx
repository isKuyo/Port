"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const EMAIL = "contato@rwque.lol";

export default function ContatoPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback: just open mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  };

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
        <div className="section-label" style={{ marginBottom: 18 }}>
          04 / Contato
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.0,
            color: "var(--text)",
            marginBottom: 20,
          }}
        >
          Vamos conversar?
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 480 }}>
          Se você tem um projeto, uma dúvida ou só quer bater papo sobre tecnologia — a caixa de entrada está aberta.
        </p>
      </motion.div>

      {/* Email CTA — main element */}
      <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            maxWidth: 620,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {/* Email display */}
          <a
            href={`mailto:${EMAIL}`}
            style={{
              flex: 1,
              padding: "22px 24px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(var(--accent-rgb), 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 3, letterSpacing: "0.04em" }}>
                E-MAIL
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 700,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                {EMAIL}
              </div>
            </div>
          </a>

          {/* Divider */}
          <div style={{ width: 1, alignSelf: "stretch", background: "var(--border)" }} />

          {/* Copy button */}
          <button
            onClick={copyEmail}
            style={{
              padding: "22px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              color: copied ? "var(--accent)" : "var(--text-muted)",
              transition: "color 0.2s ease, background 0.2s ease",
              flexShrink: 0,
              minWidth: 80,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em" }}>
              {copied ? "COPIADO" : "COPIAR"}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Info cards row */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          maxWidth: 620,
          marginBottom: 52,
        }}
      >
        {[
          {
            icon: "⚡",
            title: "Resposta rápida",
            desc: "Geralmente em menos de 24h",
          },
          {
            icon: "💬",
            title: "Sem burocracia",
            desc: "Direto no e-mail, sem formulários",
          },
          {
            icon: "🎯",
            title: "Orçamento grátis",
            desc: "Me conta o projeto e faço a proposta",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            style={{
              padding: "18px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div variants={fadeUp}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-faint)",
            letterSpacing: "0.04em",
          }}
        >
          Baseado no Brasil · GMT-3 · Respondo em português e inglês
        </p>
      </motion.div>
    </motion.div>
  );
}
