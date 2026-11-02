import Link from "next/link";

export type InformationPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export default function InformationPage({ content }: { content: InformationPageContent }) {
  return (
    <>
      <header className="information-header">
        <div className="information-wrap information-nav">
          <Link className="catalogue-logo" href="/" aria-label="Delifast, accueil">➤ DELIFAST</Link>
          <Link className="catalogue-button light" href="/catalogue">Explorer le catalogue</Link>
        </div>
      </header>
      <main className="information-main information-wrap">
        <p className="information-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="information-intro">{content.intro}</p>
        {content.sections.map((section) => (
          <section className="information-section" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <Link className="catalogue-button" href="/">Retour à l’accueil</Link>
      </main>
      <footer className="catalogue-footer">
        <div className="catalogue-wrap catalogue-footer-row">
          <Link className="catalogue-logo" href="/">➤ DELIFAST</Link>
          <nav aria-label="Pages d’information">
            <Link href="/a-propos">À propos</Link>
            <Link href="/aide-contact">Aide &amp; contact</Link>
            <Link href="/conditions-utilisation">Conditions d’utilisation</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
