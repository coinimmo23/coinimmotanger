"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, PlusCircle,
  MessageSquare, LogOut, ExternalLink,
  Menu, X,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

const NAV = [
  { href: "/dashboard",              icon: LayoutDashboard, label: "Tableau de bord", exact: true  },
  { href: "/dashboard/listings",     icon: Building2,       label: "Annonces",        exact: false },
  { href: "/dashboard/listings/new", icon: PlusCircle,      label: "Nouvelle",        exact: false },
  { href: "/dashboard/messages",     icon: MessageSquare,   label: "Messages",        exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sidebar automatically whenever the route changes (mobile nav)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      {/* Mobile top bar trigger */}
      <button
        type="button"
        className="sb__trigger"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu size={18} />
      </button>

      {/* Backdrop (mobile only, shown when open) */}
      <div
        className={`sb__backdrop ${open ? "sb__backdrop--visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sb ${open ? "sb--open" : ""}`}>

        {/* Logo */}
        <div className="sb__logo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M12 2v20M2 7l10 5 10-5" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <div>
            <span className="sb__logo-name">
              {process.env.NEXT_PUBLIC_SITE_NAME ?? "Immobilier"}
            </span>
            <span className="sb__logo-tag">Administration</span>
          </div>

          <button
            type="button"
            className="sb__close"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="sb__divider" />

        {/* Nav */}
        <nav className="sb__nav">
          <span className="sb__nav-label">Navigation</span>
          {NAV.map(({ href, icon: Icon, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`sb__item ${active ? "sb__item--active" : ""}`}>
                <span className="sb__item-indicator" />
                <Icon size={15} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div className="sb__footer">
          <div className="sb__footer-theme">
            <span>Thème</span>
            <ThemeToggle />
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="sb__footer-link">
            <ExternalLink size={13} />
            <span>Voir le site</span>
          </a>
          <button onClick={handleLogout} className="sb__footer-link sb__footer-link--danger">
            <LogOut size={13} />
            <span>Déconnexion</span>
          </button>
        </div>

        <style>{`
          .sb {
            position: fixed; top: 0; left: 0;
            width: 220px; height: 100vh;
            background: var(--surface-2);
            border-right: 1px solid var(--border);
            display: flex; flex-direction: column;
            z-index: 200;
            transition: transform 0.28s ease;
          }

          .sb__logo {
            display: flex; align-items: center; gap: 12px;
            padding: 24px 20px 22px;
            position: relative;
          }
          .sb__logo svg { color: var(--gold); flex-shrink: 0; }
          .sb__logo-name {
            display: block;
            font-family: 'Playfair Display', serif;
            font-size: 15px; color: var(--white);
            letter-spacing: 0.03em; line-height: 1.2;
          }
          .sb__logo-tag {
            display: block;
            font-size: 9px; color: var(--muted);
            text-transform: uppercase; letter-spacing: 0.15em;
            margin-top: 2px;
          }

          .sb__close {
            display: none;
            margin-left: auto;
            background: none; border: none; cursor: pointer;
            color: var(--muted);
            padding: 6px;
            transition: color 0.15s ease;
          }
          .sb__close:hover { color: var(--off-white); }

          .sb__divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent);
            margin: 0 20px;
          }

          .sb__nav {
            padding: 20px 12px 8px;
            display: flex; flex-direction: column; gap: 2px;
          }
          .sb__nav-label {
            font-size: 9px; font-weight: 600;
            text-transform: uppercase; letter-spacing: 0.18em;
            color: var(--muted); padding: 0 8px; margin-bottom: 8px;
            display: block;
          }

          .sb__item {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 8px 9px 12px;
            color: var(--muted); font-size: 13px; font-weight: 400;
            text-decoration: none; position: relative;
            transition: color 0.15s ease, background 0.15s ease;
            border: 1px solid transparent;
          }
          .sb__item-indicator {
            position: absolute; left: 0; top: 50%;
            transform: translateY(-50%);
            width: 2px; height: 0;
            background: var(--gold);
            transition: height 0.2s ease;
          }
          .sb__item:hover {
            color: var(--off-white);
            background: var(--surface-3);
            border-color: var(--border);
          }
          .sb__item--active {
            color: var(--gold) !important;
            background: rgba(201,168,76,0.06) !important;
            border-color: rgba(201,168,76,0.15) !important;
          }
          .sb__item--active .sb__item-indicator { height: 60%; }

          .sb__footer {
            padding: 12px;
            border-top: 1px solid var(--border);
            display: flex; flex-direction: column; gap: 2px;
          }
          .sb__footer-theme {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 10px 12px;
            font-size: 11px; color: var(--muted);
            text-transform: uppercase; letter-spacing: 0.1em;
          }
          .sb__footer-link {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 10px; color: var(--muted); font-size: 12px;
            text-decoration: none; background: none; border: none;
            cursor: pointer; font-family: 'DM Sans', sans-serif;
            transition: color 0.15s ease;
            text-align: left; width: 100%;
          }
          .sb__footer-link:hover { color: var(--off-white); }
          .sb__footer-link--danger:hover { color: #c05252; }

          /* Mobile trigger button, hidden on desktop */
          .sb__trigger {
            display: none;
          }

          /* Backdrop, hidden until opened on mobile */
          .sb__backdrop {
            display: none;
          }

          @media (max-width: 768px) {
            .sb {
              transform: translateX(-100%);
              box-shadow: 4px 0 24px rgba(0,0,0,0.25);
            }
            .sb--open {
              transform: translateX(0);
            }
            .sb__close {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .sb__trigger {
              display: flex;
              align-items: center; justify-content: center;
              position: fixed; top: 14px; left: 14px;
              width: 38px; height: 38px;
              background: var(--surface-2);
              border: 1px solid var(--border);
              border-radius: 8px;
              color: var(--off-white);
              cursor: pointer;
              z-index: 150;
            }

            .sb__backdrop {
              display: block;
              position: fixed; inset: 0;
              background: rgba(0,0,0,0.5);
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.28s ease;
              z-index: 190;
            }
            .sb__backdrop--visible {
              opacity: 1;
              pointer-events: auto;
            }
          }
        `}</style>
      </aside>
    </>
  );
}