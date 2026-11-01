"use client";

import { useRef, useState, type FormEvent } from "react";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setFeedback("Saisissez un restaurant, un plat ou un commerce.");
      inputRef.current?.focus();
      return;
    }

    setFeedback(
      "La page de recherche n’est pas encore disponible. Aucune recherche n’a été lancée.",
    );
  }

  return (
    <>
      <form className="searchbox" role="search" onSubmit={handleSubmit}>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          ref={inputRef}
          id="searchInput"
          name="q"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setFeedback("");
          }}
          placeholder="Un restaurant, un plat, un commerce…"
          aria-label="Rechercher un restaurant, un plat ou un commerce"
          aria-invalid={feedback.startsWith("Saisissez") || undefined}
          aria-describedby="search-status"
        />
        <button className="btn btn-primary" type="submit">Rechercher</button>
      </form>
      <div className={`toast${feedback ? " show" : ""}`} id="search-status" role="status" aria-live="polite">
        {feedback}
      </div>
    </>
  );
}
