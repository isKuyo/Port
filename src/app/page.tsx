"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLanyard } from "@/hooks/useLanyard";
import { useEffect, useRef, useState } from "react";

const STATUS_COLOR: Record<string, string> = {
  online: "#4ade80",
  idle: "#fbbf24",
  dnd: "#4ade80",
  offline: "#52525b",
};

const STATUS_LABEL: Record<string, string> = {
  online: "online",
  idle: "idle",
  dnd: "online",
  offline: "offline",
};

const SKILLS = [
  { name: "Lua / Luau",  pct: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg" },
  { name: "JavaScript", pct: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "HTML / CSS", pct: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "C++",        pct: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#",         pct: 55, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
];

const PROJECTS = [
  {
    name: "Projects",
    description: "Roblox games I've contributed on.",
    tags: ["Roblox", "Luau"],
    url: "/projects",
  },
  {
    name: "Works",
    description: "My portfolio, projects and demos.",
    tags: ["Showcases"],
    url: "https://discord.gg/Q4qZh9qpC3",
  },
];

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const DEFAULT_ACCENT = "#818cf8";

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getMostVibrantColor(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(DEFAULT_ACCENT); return; }
      ctx.drawImage(img, 0, 0, 64, 64);
      const { data } = ctx.getImageData(0, 0, 64, 64);
      let best = { r: 129, g: 140, b: 248 };
      let bestScore = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 128) continue;
        const rn = r / 255, gn = g / 255, bn = b / 255;
        const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
        const l = (max + min) / 2;
        const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
        const score = s * (1 - Math.abs(l - 0.5) * 1.5);
        if (score > bestScore) { bestScore = score; best = { r, g, b }; }
      }
      const h = (v: number) => v.toString(16).padStart(2, "0");
      resolve(`#${h(best.r)}${h(best.g)}${h(best.b)}`);
    };
    img.onerror = () => resolve(DEFAULT_ACCENT);
    img.src = url;
  });
}

export default function Home() {
  const { data } = useLanyard();
  const [progress, setProgress] = useState(0);
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("entered") === "1") setEntered(true);
  }, []);
  const [views, setViews] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const status = data?.discord_status ?? "offline";
  const statusColor = STATUS_COLOR[status] ?? STATUS_COLOR.offline;

  const avatarUrl = data?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${
        data.discord_user.avatar.startsWith("a_") ? "gif" : "webp"
      }?size=256`
    : "https://cdn.discordapp.com/embed/avatars/0.png";

  const ACCENT = accent;
  const ACCENT_DIM = hexToRgba(accent, 0.12);
  const ACCENT_BORDER = hexToRgba(accent, 0.25);
  const ACCENT_FAINT = hexToRgba(accent, 0.05);

  const spotify = data?.spotify;
  const isListening = !!data?.listening_to_spotify && !!spotify;

  useEffect(() => {
    getMostVibrantColor(avatarUrl).then((color) => {
      setAccent(color);
      sessionStorage.setItem("accent", color);
    });
  }, [avatarUrl]);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isListening || !spotify) {
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const update = () => {
      const elapsed = Date.now() - spotify.timestamps.start;
      const total = spotify.timestamps.end - spotify.timestamps.start;
      setProgress(Math.min((elapsed / total) * 100, 100));
    };
    update();
    intervalRef.current = setInterval(update, 500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isListening, spotify]);

  return (
    <>
    <AnimatePresence>
      {!entered && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onClick={() => { sessionStorage.setItem("entered", "1"); setEntered(true); }}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "#080808",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <motion.p
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "#d4d4d8", fontSize: 16, letterSpacing: "0.25em", fontWeight: 500, userSelect: "none" }}
          >
            click to enter...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>

    {views !== null && (
      <div style={{
        position: "fixed", top: 22, left: 22, zIndex: 50,
        display: "flex", alignItems: "center", gap: 7,
        color: "#e4e4e7", fontSize: 14, fontWeight: 500,
        pointerEvents: "none",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>{views.toLocaleString()}</span>
      </div>
    )}

    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem" }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-[480px] flex flex-col gap-9"
      >

        {/* ── HEADER ── */}
        <motion.div variants={item} className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar with spinning gradient ring */}
            <div style={{ position: "relative", flexShrink: 0, width: 64, height: 64 }}>
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                padding: 2,
                background: `conic-gradient(from 0deg, ${ACCENT}, rgba(255,255,255,0.55) 90deg, ${ACCENT} 180deg, rgba(255,255,255,0.2) 270deg, ${ACCENT})`,
                transition: "background 0.6s ease",
                animation: "spin-ring 4s linear infinite",
              }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#080808" }} />
              </div>
              <div style={{
                position: "absolute", inset: 3,
                borderRadius: "50%", overflow: "hidden",
                background: "#141414",
              }}>
                {data && <Image src={avatarUrl} alt="rwque" fill priority sizes="58px" className="object-cover" unoptimized />}
              </div>
            </div>

            <div>
              <h1 style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${ACCENT} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                rwque
              </h1>
              <p style={{
                fontSize: 13,
                marginTop: 4,
                lineHeight: 1.4,
                fontWeight: 600,
                background: "linear-gradient(to right, #6b6b6b 0, #ffffff 20%, #6b6b6b 40%)",
                backgroundSize: "220px auto",
                backgroundPosition: "0",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shine 5s infinite linear",
                display: "inline-block",
              }}>
                Fullstack · Addicted to code
              </p>
              <p style={{
                fontSize: 11,
                marginTop: 5,
                lineHeight: 1.4,
                fontWeight: 500,
                backgroundImage: "linear-gradient(90deg, #22c55e 0%, #facc15 50%, #22c55e 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "brazil-flow 2s linear infinite",
                display: "block",
              }}>
                Brazil
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div
            className="flex items-center gap-2 flex-shrink-0 mt-1"
            style={{
              padding: "5px 10px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span className="relative flex" style={{ width: 7, height: 7 }}>
              {status !== "offline" && (
                <span className="absolute inset-0 rounded-full" style={{
                  backgroundColor: statusColor,
                  animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                  opacity: 0.5,
                }} />
              )}
              <span className="relative inline-flex w-full h-full rounded-full" style={{ backgroundColor: statusColor }} />
            </span>
            <span style={{ fontSize: 11, color: "#71717a", lineHeight: 1, whiteSpace: "nowrap" }}>
              {STATUS_LABEL[status]}
            </span>
          </div>
        </motion.div>

        {/* ── BIO ── */}
        <motion.div variants={item}>
          <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.8 }}>
            Developer focused on{" "}
            <span style={{ color: "#e4e4e7", fontWeight: 500 }}>Roblox</span>.
            {" "}Building gameplay systems and mechanics, focusing on performance and how things feel in-game. I like keeping my code clean and making sure everything works smoothly.
          </p>
        </motion.div>

        {/* ── SOCIALS ── */}
        <motion.div variants={item} className="flex items-center justify-center gap-3">
          {[
            {
              href: "https://discord.com/users/1088946006663630969",
              label: "Discord",
              hoverColor: "#5865F2",
              hoverBg: "rgba(88,101,242,0.12)",
              hoverBorder: "rgba(88,101,242,0.3)",
              icon: (
                <svg width="16" height="16" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
                </svg>
              ),
            },
            {
              href: "https://tiktok.com/@rwquev",
              label: "TikTok",
              hoverColor: "#ffffff",
              hoverBg: "rgba(255,255,255,0.1)",
              hoverBorder: "rgba(255,255,255,0.25)",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              ),
            },
          ].map(({ href, label, icon, hoverColor, hoverBg, hoverBorder }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              style={{
                padding: "9px 20px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "#71717a",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = hoverColor;
                el.style.borderColor = hoverBorder;
                el.style.background = hoverBg;
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#71717a";
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.transform = "translateY(0)";
              }}
            >
              {icon}
              {label}
            </a>
          ))}
        </motion.div>

        {/* ── DIVIDER ── */}
        <motion.div variants={item} style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* ── SKILLS ── */}
        <motion.div variants={item} className="flex flex-col gap-3">
          <span style={{
            fontSize: 10, fontWeight: 600, color: "#52525b",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Skills
          </span>
          <div className="flex flex-col gap-3">
            {SKILLS.map(({ name, pct, icon }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={icon}
                      alt={name}
                      width={16}
                      height={16}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12, color: "#a1a1aa", fontWeight: 400 }}>{name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#52525b", fontFamily: "monospace" }}>{pct}%</span>
                </div>
                <div style={{
                  height: 3, borderRadius: 9999,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: "100%",
                      borderRadius: 9999,
                      background: `linear-gradient(90deg, ${ACCENT}, ${hexToRgba(ACCENT, 0.5)})`,
                      boxShadow: `0 0 8px ${hexToRgba(ACCENT, 0.4)}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <motion.div variants={item} style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* ── PROJECTS ── */}
        <motion.div variants={item} className="flex flex-col gap-3">
          <span style={{
            fontSize: 10, fontWeight: 600, color: "#52525b",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            More
          </span>
          <div className="flex flex-col gap-1">
            {PROJECTS.map((project, i) => (
              <a
                key={project.name}
                href={project.url}
                target={project.url.startsWith("/") ? "_self" : "_blank"}
                rel={project.url.startsWith("/") ? undefined : "noopener noreferrer"}
                className="group flex items-center justify-between gap-4"
                style={{
                  padding: "14px 14px",
                  margin: "0 -14px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = ACCENT_FAINT;
                  const bar = el.querySelector(".accent-bar") as HTMLElement;
                  if (bar) bar.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  const bar = el.querySelector(".accent-bar") as HTMLElement;
                  if (bar) bar.style.opacity = "0";
                }}
              >
                <div
                  className="accent-bar"
                  style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: 2, borderRadius: 9999,
                    background: ACCENT,
                    opacity: 0, transition: "opacity 0.2s ease",
                  }}
                />
                <div className="flex items-start gap-4 min-w-0">
                  <span style={{
                    fontSize: 11, fontFamily: "monospace",
                    color: "#3f3f46", flexShrink: 0, marginTop: 2,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#e4e4e7", lineHeight: 1.3, marginBottom: 4 }}>
                      {project.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {project.tags.map((t) => (
                        <span key={t} style={{
                          fontSize: 10, padding: "2px 7px",
                          borderRadius: 4,
                          background: ACCENT_DIM,
                          border: `1px solid ${ACCENT_BORDER}`,
                          color: ACCENT,
                          fontWeight: 500,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100"
                  style={{ color: ACCENT, transition: "opacity 0.2s ease" }}
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── NOW PLAYING ── */}
        <AnimatePresence>
          {isListening && spotify && (
            <motion.div
              key="spotify"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 36 }} />
              <div className="flex flex-col gap-3">
                <span style={{
                  fontSize: 10, fontWeight: 600, color: "#52525b",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  Now Playing
                </span>
                <div
                  className="flex items-center gap-4"
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{
                    position: "relative", width: 48, height: 48,
                    borderRadius: 8, overflow: "hidden", flexShrink: 0,
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}>
                    <Image src={spotify.album_art_url} alt={spotify.album} fill sizes="48px" className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#1db954">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                      <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 500 }}>listening now</span>
                    </div>
                    <p style={{
                      fontSize: 13, fontWeight: 600, color: "#f4f4f5",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {spotify.song}
                    </p>
                    <p style={{
                      fontSize: 12, color: "#71717a", marginTop: 1,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {spotify.artist}
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: "#52525b", flexShrink: 0 }}>
                        {formatTime(Date.now() - spotify.timestamps.start)}
                      </span>
                      <div style={{
                        flex: 1, height: 2, background: "rgba(255,255,255,0.08)",
                        borderRadius: 9999, overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%", width: `${progress}%`,
                          background: "#1db954", borderRadius: 9999,
                          transition: "width 0.5s linear",
                          boxShadow: "0 0 8px rgba(29,185,84,0.5)",
                        }} />
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: "#52525b", flexShrink: 0 }}>
                        {formatTime(spotify.timestamps.end - spotify.timestamps.start)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <motion.div
          variants={item}
          style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ fontSize: 11, color: "#3f3f46" }}>
            rwque · {new Date().getFullYear()}
          </p>
        </motion.div>

      </motion.div>
    </main>
    </>
  );
}
