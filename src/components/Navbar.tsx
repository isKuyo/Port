"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/skills", label: "Skills" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.6)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: 18,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.04em",
              }}
            >
              rwque<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: 2 }}>
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    position: "relative",
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: active ? "var(--text)" : "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-bg"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.06)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{label}</span>
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "var(--accent)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={open ? "open" : "closed"}
              style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}
            >
              <motion.span
                variants={{ open: { rotate: 45, y: 9 }, closed: { rotate: 0, y: 0 } }}
                style={{ display: "block", height: 1.5, background: "var(--text)", borderRadius: 2, transformOrigin: "center" }}
              />
              <motion.span
                variants={{ open: { opacity: 0, x: -6 }, closed: { opacity: 1, x: 0 } }}
                style={{ display: "block", height: 1.5, background: "var(--text)", borderRadius: 2 }}
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -9 }, closed: { rotate: 0, y: 0 } }}
                style={{ display: "block", height: 1.5, background: "var(--text)", borderRadius: 2, transformOrigin: "center" }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "var(--nav-height)",
              left: 0, right: 0,
              zIndex: 99,
              background: "rgba(8,8,8,0.98)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 0 20px",
              backdropFilter: "blur(24px)",
            }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Link
                  href={href}
                  style={{
                    display: "block",
                    padding: "13px 24px",
                    fontSize: 17,
                    fontWeight: 600,
                    color: pathname === href ? "var(--text)" : "var(--text-muted)",
                    textDecoration: "none",
                    fontFamily: "var(--font-syne)",
                    letterSpacing: "-0.02em",
                    borderLeft: pathname === href ? "2px solid var(--accent)" : "2px solid transparent",
                    transition: "border-color 0.2s",
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
