"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MARQUEE_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Playwright", "Web Scraping", "Tailwind CSS",
  "Automações", "APIs REST", "Python",
  "Bots", "UI/UX",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Home() {
  return (
    <div style={{ minHeight: "calc(100dvh - var(--nav-height))", display: "flex", flexDirection: "column" }}>

      {/* ─── HERO ─── */}
      <div
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 72,
        }}
      >
        {/* Left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ flex: 1, minWidth: 0, paddingTop: 20, paddingBottom: 20 }}
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="section-label" style={{ marginBottom: 28 }}>
            Portfolio · 2026
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(72px, 11vw, 148px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "var(--text)",
              marginBottom: 28,
            }}
          >
            RWQUE
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "var(--text-muted)",
              lineHeight: 1.55,
              fontWeight: 400,
              maxWidth: 460,
              marginBottom: 12,
            }}
          >
            Desenvolvimento web &{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>automações</span> —
            entrego projetos que funcionam e causam impacto.
          </motion.p>

          {/* Location / status row */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 44,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-faint)",
                letterSpacing: "0.04em",
              }}
            >
              🇧🇷 Brasil
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-faint)", display: "inline-block" }} />
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "#4ade80",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  animation: "pulse-glow 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
              Disponível para projetos
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/servicos"
              style={{
                padding: "13px 30px",
                background: "var(--accent)",
                color: "#080808",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "-0.015em",
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "0.88";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }}
            >
              Ver Serviços
            </Link>
            <Link
              href="/contato"
              style={{
                padding: "13px 30px",
                background: "transparent",
                color: "var(--text)",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid var(--border-strong)",
                letterSpacing: "-0.015em",
                transition: "border-color 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(var(--accent-rgb), 0.4)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.transform = "translateY(0)";
              }}
            >
              Entrar em Contato
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: code snippet + stats */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flexShrink: 0,
            width: "clamp(280px, 30vw, 340px)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
          className="hidden md:flex"
        >
          {/* Code block */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "20px 22px",
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              lineHeight: 2,
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              <span style={{ marginLeft: 6, color: "var(--text-faint)", fontSize: 11 }}>rwque.ts</span>
            </div>
            <div>
              <span style={{ color: "#737373" }}>{"// about me"}</span>
              <br />
              <span style={{ color: "#c792ea" }}>const </span>
              <span style={{ color: "var(--text)" }}>rwque </span>
              <span style={{ color: "#89ddff" }}>= </span>
              <span style={{ color: "#c792ea" }}>{"{"}  </span>
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
              <span style={{ color: "#c792ea" }}>{"}"}</span>
              <span style={{ color: "var(--text-muted)" }}>;</span>
            </div>
          </div>

          {/* Stats 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { value: "3+", label: "Anos de exp." },
              { value: "BR", label: "Localização" },
              { value: "24h", label: "Tempo de resposta" },
              { value: "∞", label: "Café consumido" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "15px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 5,
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── MARQUEE ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          borderTop: "1px solid var(--border)",
          overflow: "hidden",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 28s linear infinite",
            gap: 0,
          }}
        >
          {[0, 1].map((idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                paddingRight: 0,
              }}
            >
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${idx}-${item}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text-faint)",
                    whiteSpace: "nowrap",
                    padding: "0 28px",
                    letterSpacing: "0.03em",
                  }}
                >
                  <span style={{ color: "var(--accent)", marginRight: 10 }}>↗</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── FOOTER BAR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "14px 32px",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.04em" }}>
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
      </motion.div>
    </div>
  );
}
