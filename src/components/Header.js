"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

//  {
//     label: "Delta",
//     href: "/delta",
//     children: [
//       { label: "All Entries", href: "/journal/all" },
//       { label: "New Entry", href: "/journal/new" },
//     ],
//   },
// { label: "External", href: "https://example.com", external: true },

const defaultLinks = [
  { label: "Home", href: "/" },
  {
    label: "Delta",
    href: "/delta",
  },
  { label: "About", href: "/about" },
];

const DeltaHeader = ({
  links = defaultLinks,
  brand = { name: "Delta", href: "/" },
  className = "",
}) => {
  const [open, setOpen] = useState(false); // mobile menu
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Close mobile menu on resize >= md
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // keyboard: escape closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderLink = (link, i) => {
    const hasChildren =
      Array.isArray(link.children) && link.children.length > 0;
    return (
      <li key={i} className="relative">
        <div className="flex items-center">
          <a
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="px-3 py-2 text-sm font-medium uppercase tracking-wide hover:bg-[#11272e]/70 hover:text-[#d43b3b] focus:outline-none focus:ring-2 focus:ring-[#6b0f15]"
            aria-haspopup={hasChildren ? "menu" : undefined}
            onClick={(e) => {
              if (hasChildren && window.innerWidth < 768) {
                // mobile: toggle submenu instead of navigating
                e.preventDefault();
                setActiveDropdown((cur) => (cur === i ? null : i));
              }
            }}
          >
            <span className="inline-flex items-center gap-2">
              {link.label}
              {link.external ? <ExternalLink size={14} /> : null}
              {hasChildren ? <ChevronDown size={14} /> : null}
            </span>
          </a>
        </div>

        {/* Dropdown (desktop) */}
        {hasChildren && (
          <AnimatePresence>
            {activeDropdown === i && window.innerWidth >= 768 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 mt-2 w-48 z-30 rounded-md border border-[#d43b3b] bg-[#0d1a1f] shadow-lg ring-1 ring-black/5"
                role="menu"
              >
                {link.children.map((c, idx) => (
                  <li key={idx}>
                    <a
                      href={c.href}
                      className="block px-4 py-2 text-sm hover:bg-[#1a2d33]/80 hover:text-[#d43b3b]"
                      role="menuitem"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}

        {/* Mobile submenu */}
        {hasChildren && (
          <AnimatePresence>
            {activeDropdown === i && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                {link.children.map((c, idx) => (
                  <li key={idx}>
                    <a
                      href={c.href}
                      className="block px-6 py-2 text-sm hover:bg-[#11272e]/70 hover:text-[#d43b3b]"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </li>
    );
  };

  return (
    <header
      ref={navRef}
      className={`w-full z-40 top-0 left-0 sticky backdrop-blur-sm bg-[#0d1a1f] dark:bg-[#0a1418] border-b border-[#223036] dark:border-[#1a2428] text-white ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <a
              href={brand.href}
              className="flex items-center gap-3 text-lg font-semibold"
            >
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-[#0a3b47] to-[#6b0f15] text-white shadow-md">
                {/* simple logo glyph (CSS) - replace with image if available */}
                <span className="text-sm">Δ</span>
              </div>
              <span className="hidden sm:inline-block">{brand.name}</span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <ul
              className="flex items-center gap-2"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {links.map((l, i) => (
                <div
                  key={i}
                  onMouseEnter={() =>
                    Array.isArray(l.children)
                      ? setActiveDropdown(i)
                      : setActiveDropdown(null)
                  }
                >
                  {renderLink(l, i)}
                </div>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b0f15]"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-[#223036]/60 dark:border-[#1a2428]/60"
          >
            <div className="px-4 pt-4 pb-6">
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <div key={i}>{renderLink(l, i)}</div>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href="/search"
                  className="block px-4 py-2 rounded-md hover:bg-[#11272e]/70 hover:text-[#d43b3b]"
                >
                  Search
                </a>
                <a
                  href="/account"
                  className="block px-4 py-2 rounded-md hover:bg-[#11272e]/70 hover:text-[#d43b3b] border text-center"
                >
                  Account
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DeltaHeader;
