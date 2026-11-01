const foundations = [
  {
    number: "01",
    title: "Application web",
    description: "Next.js App Router et React pour une base claire, prête à évoluer.",
    label: "INTERFACE",
  },
  {
    number: "02",
    title: "Qualité intégrée",
    description: "TypeScript strict et ESLint pour garder le code lisible et vérifiable.",
    label: "OUTILLAGE",
  },
  {
    number: "03",
    title: "Données à venir",
    description: "Emplacements prévus pour PostgreSQL, Auth et Storage via Supabase.",
    label: "NON CONNECTÉ",
  },
] as const;

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand" aria-label="Delifast">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M7 17.2 13.1 23 25 9" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand-name">deli<span>fast</span></span>
        </div>
        <span className="topbar-note"><span className="status-dot" /> Socle initial</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> APPLICATION WEB <span className="eyebrow-divider">/</span> INITIALISATION</p>
          <h1 id="hero-title">Une base solide.<br /><span>La suite, pas à pas.</span></h1>
          <p className="hero-description">
            Le socle technique de Delifast est en place. Les parcours et services métier seront construits dans les prochaines étapes — rien n’est encore connecté ni simulé ici.
          </p>
          <div className="hero-footnote">
            <span className="footnote-icon" aria-hidden="true">↗</span>
            <span>Une fondation conçue pour avancer simplement.</span>
          </div>
        </div>

        <aside className="hero-card" aria-label="État du socle technique">
          <div className="card-topline">
            <span>ÉTAT DU PROJET</span>
            <span className="card-index">DF / 001</span>
          </div>
          <div className="card-title-row">
            <div>
              <p className="card-caption">Version de démarrage</p>
              <h2>Le socle est prêt.</h2>
            </div>
            <span className="ready-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.4 4.2L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <div className="card-rule" />
          <p className="card-footnote">Cette page est provisoire. Elle confirme uniquement la présence de l’interface initiale.</p>
        </aside>
      </section>

      <section className="foundation-section" aria-labelledby="foundation-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">CE QUI EST EN PLACE</p>
            <h2 id="foundation-title">Les fondations</h2>
          </div>
          <p className="section-aside">Un socle technique, sans fonctionnalités métier ajoutées.</p>
        </div>
        <div className="foundation-grid">
          {foundations.map((item) => (
            <article className="foundation-card" key={item.number}>
              <div className="foundation-card-top">
                <span className="foundation-number">{item.number}</span>
                <span className="foundation-label">{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>DELIFAST <span className="footer-separator">·</span> APPLICATION WEB</span>
        <span>En cours d’initialisation</span>
      </footer>
    </main>
  );
}
