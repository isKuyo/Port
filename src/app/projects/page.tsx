"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RobloxGame {
  universeId: number;
  name: string;
  description: string;
  visits: number;
  favoritedCount: number;
  playing: number;
  totalUpVotes: number;
  totalDownVotes: number;
  genre: string;
  rootPlaceId: number;
  thumbnail: string | null;
  url: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function ProjectsPage() {
  const [games, setGames] = useState<RobloxGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [accent, setAccent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("accent") ?? "#818cf8";
    }
    return "#818cf8";
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("accent");
    if (stored) setAccent(stored);
  }, []);

  const accentBorder = hexToRgba(accent, 0.3);
  const accentBg = hexToRgba(accent, 0.04);
  const accentHoverBorder = hexToRgba(accent, 0.5);
  const accentHoverBg = hexToRgba(accent, 0.07);

  useEffect(() => {
    fetch("/api/roblox")
      .then((r) => r.json())
      .then((d) => { setGames(d.games ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ minHeight: "100dvh", padding: "4rem 1.5rem" }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        <motion.div variants={item} style={{ marginBottom: 40 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontSize: 14, color: "#a1a1aa", textDecoration: "none",
              fontWeight: 600, letterSpacing: "0.01em",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f4f4f5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a1a1aa"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            back
          </Link>

          <h1 style={{
            marginTop: 24, fontSize: 28, fontWeight: 700,
            letterSpacing: "-0.04em", color: "#f4f4f5", lineHeight: 1.1,
          }}>
            Projects
          </h1>
          <p style={{ marginTop: 8, fontSize: 13, color: "#52525b" }}>
            Roblox games I&apos;ve contributed on.
          </p>
        </motion.div>

        {loading && (
          <motion.div variants={item} style={{ color: "#3f3f46", fontSize: 13 }}>
            Loading...
          </motion.div>
        )}

        {!loading && games.length === 0 && (
          <motion.div variants={item} style={{ color: "#3f3f46", fontSize: 13 }}>
            No games found.
          </motion.div>
        )}

        <motion.div
          variants={container}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {games.map((game) => {
            const total = game.totalUpVotes + game.totalDownVotes;
            const rating = total > 0 ? Math.round((game.totalUpVotes / total) * 100) : null;

            return (
              <motion.a
                key={game.universeId}
                variants={item}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", flexDirection: "column",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${accentBorder}`,
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, background 0.2s ease, transform 0.2s ease",
                }}
                whileHover={{ y: -3 }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = accentHoverBorder;
                  el.style.background = accentHoverBg;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = accentBorder;
                  el.style.background = accentBg;
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#111" }}>
                  {game.thumbnail ? (
                    <Image
                      src={game.thumbnail}
                      alt={game.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#1a1a1a" }} />
                  )}
                </div>

                <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#f4f4f5", lineHeight: 1.3 }}>
                    {game.name}
                  </p>

                  {game.description && (
                    <p style={{
                      fontSize: 12, color: "#71717a", lineHeight: 1.6,
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {game.description}
                    </p>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "auto", paddingTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#f4f4f5" stroke="none" style={{ flexShrink: 0, display: "block" }}>
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                      <span style={{ fontSize: 11, color: "#71717a", lineHeight: 1 }}>{formatNumber(game.visits)}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#f43f5e" stroke="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span style={{ fontSize: 11, color: "#71717a" }}>{formatNumber(game.favoritedCount)}</span>
                    </div>

                    {rating !== null && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        <span style={{ fontSize: 11, color: "#71717a" }}>{rating}%</span>
                      </div>
                    )}

                    {game.playing > 1000 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "#71717a" }}>{formatNumber(game.playing)} playing</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </main>
  );
}
