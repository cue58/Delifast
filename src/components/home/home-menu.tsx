"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";

export default function HomeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="mobile-menu" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Masquer la navigation" : "Afficher la navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
      </button>
      <nav
        className="mobile-menu-panel"
        id="mobile-navigation"
        aria-label="Navigation mobile principale"
        hidden={!isOpen}
      >
        <Link href="#restaurants" onClick={closeMenu}>Restaurants</Link>
        <Link href="#categories" onClick={closeMenu}>Catégories</Link>
        <Link href="#commerces" onClick={closeMenu}>Commerces</Link>
      </nav>
    </div>
  );
}
