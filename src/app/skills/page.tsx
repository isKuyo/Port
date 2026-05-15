"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

type Skill = { name: string; icon?: string };

type Category = {
  label: string;
  color: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    color: "#60a5fa",
    skills: [
      { name: "HTML & CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion" },
    ],
  },
  {
    label: "Backend & APIs",
    color: "#a78bfa",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "REST APIs" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    ],
  },
  {
    label: "Automações",
    color: "#cbff00",
    skills: [
      { name: "Playwright" },
      { name: "Puppeteer" },
      { name: "Web Scraping" },
      { name: "Bots & Scripts" },
      { name: "Browser Automation" },
      { name: "Task Automation" },
    ],
  },
  {
    label: "Linguagens de Script",
    color: "#fb923c",
    skills: [
      { name: "Lua / Luau", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
      { name: "Bash" },
    ],
  },
  {
    label: "Ferramentas",
    color: "#34d399",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    ],
  },
];

export default function SkillsPage() {
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
      <motion.div variants={fadeUp} style={{ marginBottom: 60 }}>
        <div className="section-label" style={{ marginBottom: 18 }}>
          02 / Skills
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--text)",
            maxWidth: 600,
            marginBottom: 16,
          }}
        >
          O que eu uso no dia a dia.
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 480 }}>
          Ferramentas e tecnologias que domino — organizadas por área.
        </p>
      </motion.div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {CATEGORIES.map((cat) => (
          <motion.div key={cat.label} variants={fadeUp}>
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: cat.color,
                  boxShadow: `0 0 8px ${cat.color}88`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {cat.label}
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* Skills chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {cat.skills.map(({ name, icon }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 16px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    transition: "border-color 0.2s ease, background 0.2s ease, transform 0.15s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${cat.color}44`;
                    el.style.background = "var(--surface-2)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--surface)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={icon}
                      alt={name}
                      width={16}
                      height={16}
                      style={{ flexShrink: 0, objectFit: "contain" }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        variants={fadeUp}
        style={{
          marginTop: 64,
          padding: "20px 24px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 20 }}>⚡</span>
        <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Sempre aprendendo. Se o seu projeto usa uma tecnologia que não está aqui —{" "}
          <a
            href="mailto:contato@rwque.lol"
            style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
          >
            fala comigo.
          </a>{" "}
          Me adapto rápido.
        </p>
      </motion.div>
    </motion.div>
  );
}
