"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";

type AuthMode = "connexion" | "inscription";
type AccountProfile = "client" | "commercant";

type PasswordFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggle: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

function PasswordField({ id, label, placeholder, autoComplete, visible, onToggle, inputRef }: PasswordFieldProps) {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>{label}</label>
      <div className="auth-password-wrap">
        <input
          ref={inputRef}
          id={id}
          name={id === "signup-password" ? "password" : id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={6}
          required
        />
        <button className="auth-password-toggle" type="button" onClick={onToggle} aria-label={`${visible ? "Masquer" : "Afficher"} ${label.toLocaleLowerCase("fr")}`} aria-pressed={visible}>
          {visible ? "Masquer" : "Afficher"}
        </button>
      </div>
    </div>
  );
}

export default function AuthClient({ mode, initialProfile }: { mode: AuthMode; initialProfile: string }) {
  const isSignup = mode === "inscription";
  const initialMerchant = initialProfile === "commercant";
  const [profile, setProfile] = useState<AccountProfile>(initialMerchant ? "commercant" : "client");
  const [visibleFields, setVisibleFields] = useState({ login: false, signup: false, confirmation: false });
  const [message, setMessage] = useState("");
  const confirmationRef = useRef<HTMLInputElement>(null);
  const merchantNameRef = useRef<HTMLInputElement>(null);
  const merchantTypeRef = useRef<HTMLSelectElement>(null);
  const merchantAddressRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const profileSuffix = profile === "commercant" ? "?profil=commercant" : "";

  function toggleVisibility(field: keyof typeof visibleFields) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  }

  function changeProfile(next: AccountProfile) {
    setProfile(next);
    setMessage("");
    router.replace(`/inscription${next === "commercant" ? "?profil=commercant" : ""}`, { scroll: false });
  }

  function handleForgotPassword() {
    setMessage("La récupération du mot de passe sera disponible après l’intégration du service d’authentification. Aucune demande n’a été envoyée.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!isSignup) {
      setMessage("Le formulaire est valide, mais le service d’authentification n’est pas encore connecté. Aucune connexion n’a eu lieu.");
      return;
    }

    const password = form.elements.namedItem("password") as HTMLInputElement | null;
    const confirmation = confirmationRef.current;
    if (!password || !confirmation || password.value !== confirmation.value) {
      setMessage("Les deux mots de passe ne correspondent pas. Vérifiez puis réessayez.");
      confirmation?.focus();
      return;
    }

    if (profile === "commercant") {
      const requiredValues = [
        { value: merchantNameRef.current?.value ?? "", input: merchantNameRef.current },
        { value: merchantTypeRef.current?.value ?? "", input: merchantTypeRef.current },
        { value: merchantAddressRef.current?.value ?? "", input: merchantAddressRef.current },
      ];
      const missing = requiredValues.find((field) => !field.value.trim());
      if (missing) {
        setMessage("Veuillez compléter les informations obligatoires de votre commerce.");
        missing.input?.focus();
        return;
      }
    }

    setMessage(profile === "commercant"
      ? "Le formulaire commerçant est valide. L’inscription et la validation administrative seront disponibles lorsque le service sera connecté. Aucun compte n’a été créé."
      : "Le formulaire client est valide, mais le service d’authentification n’est pas encore connecté. Aucun compte n’a été créé.");
  }

  return (
    <>
      <header className="auth-header">
        <div className="auth-nav">
          <Link className="auth-logo" href="/" aria-label="Retour à l’accueil Delifast">➤ DELIFAST</Link>
          <Link className="auth-back" href="/">← Retour à l’accueil</Link>
        </div>
      </header>
      <main className="auth-page">
        <aside className="auth-promo">
          <div className="auth-promo-kicker">Bienvenue chez Delifast</div>
          <h1>Les bonnes rencontres commencent ici.</h1>
          <p>Retrouvez les commerces et spécialités qui vous font envie, ou développez votre activité auprès de nouveaux clients.</p>
          <div className="auth-benefits">
            <div><span aria-hidden="true">✓</span><p>Découvrez des commerçants et leurs offres.</p></div>
            <div><span aria-hidden="true">✓</span><p>Présentez votre activité en ligne.</p></div>
            <div><span aria-hidden="true">✓</span><p>Une expérience simple sur mobile.</p></div>
          </div>
        </aside>
        <section className="auth-form-panel" aria-labelledby="auth-title">
          <div className="auth-eyebrow">Votre espace Delifast</div>
          <h2 id="auth-title">{isSignup ? "Rejoignez Delifast" : "Heureux de vous revoir !"}</h2>
          <p className="auth-intro">{isSignup ? "Créez votre compte client ou commerçant en quelques étapes." : "Connectez-vous pour continuer votre expérience."}</p>
          <nav className="auth-tabs" aria-label="Choisir une action">
            <Link role="tab" aria-selected={!isSignup} className={!isSignup ? "active" : ""} href={`/connexion${profileSuffix}`}>Connexion</Link>
            <Link role="tab" aria-selected={isSignup} className={isSignup ? "active" : ""} href={`/inscription${profileSuffix}`}>Inscription</Link>
          </nav>
          {initialMerchant && <p className="auth-profile-note">Parcours commerçant — utilisez vos identifiants existants ou créez un compte commerçant.</p>}
          {message && <div className="auth-message" id="auth-status" role="status" aria-live="polite">{message}</div>}

          {!isSignup ? (
            <form className="auth-form" onSubmit={handleSubmit} aria-describedby={message ? "auth-status" : undefined}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="identifiant">Adresse e-mail ou téléphone</label>
                <input id="identifiant" name="identifiant" type="text" placeholder="ex. nom@exemple.com" autoComplete="username" required />
              </div>
              <PasswordField id="password" label="Mot de passe" placeholder="Votre mot de passe" autoComplete="current-password" visible={visibleFields.login} onToggle={() => toggleVisibility("login")} />
              <div className="auth-options-row">
                <label className="auth-checkbox"><input type="checkbox" name="remember" /> Se souvenir de moi</label>
                <button className="auth-text-button" type="button" onClick={handleForgotPassword}>Mot de passe oublié ?</button>
              </div>
              <p className="auth-small-note">La mémorisation d’une session ne sera possible qu’après la connexion d’un vrai service d’authentification.</p>
              <button className="auth-submit" type="submit">Se connecter</button>
              <p className="auth-switch">Pas encore de compte ? <Link href={`/inscription${profileSuffix}`}>Créer un compte</Link></p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit} aria-describedby={message ? "auth-status" : undefined}>
              <fieldset className="auth-profile-options">
                <legend className="visually-hidden">Type de compte</legend>
                <label className={`auth-profile-card${profile === "client" ? " selected" : ""}`}>
                  <input type="radio" name="profile" value="client" checked={profile === "client"} onChange={() => changeProfile("client")} />
                  <span aria-hidden="true">🛍️</span><span><strong>Client</strong><small>Découvrir et acheter</small></span>
                </label>
                <label className={`auth-profile-card${profile === "commercant" ? " selected" : ""}`}>
                  <input type="radio" name="profile" value="commercant" checked={profile === "commercant"} onChange={() => changeProfile("commercant")} />
                  <span aria-hidden="true">🏪</span><span><strong>Commerçant</strong><small>Présenter mon activité</small></span>
                </label>
              </fieldset>
              <div className="auth-two-fields">
                <div className="auth-field"><label className="auth-label" htmlFor="nom">Nom</label><input id="nom" name="nom" type="text" placeholder="Votre nom" autoComplete="family-name" required /></div>
                <div className="auth-field"><label className="auth-label" htmlFor="prenom">Prénom</label><input id="prenom" name="prenom" type="text" placeholder="Votre prénom" autoComplete="given-name" required /></div>
              </div>
              <div className="auth-field"><label className="auth-label" htmlFor="telephone">Téléphone</label><input id="telephone" name="telephone" type="tel" placeholder="Ex. 70 00 00 00" autoComplete="tel" required /></div>
              <div className="auth-field"><label className="auth-label" htmlFor="email">Adresse e-mail</label><input id="email" name="email" type="email" placeholder="nom@exemple.com" autoComplete="email" required /></div>
              {profile === "commercant" && (
                <div className="auth-business-fields">
                  <div className="auth-field"><label className="auth-label" htmlFor="nom-commerce">Nom du commerce</label><input ref={merchantNameRef} id="nom-commerce" name="nomCommerce" type="text" placeholder="Nom de votre établissement" required /></div>
                  <div className="auth-field"><label className="auth-label" htmlFor="type-commerce">Type d’activité</label><select ref={merchantTypeRef} id="type-commerce" name="typeCommerce" defaultValue="" required><option value="">Choisir une catégorie</option><option>Restaurant</option><option>Alimentation et épicerie</option><option>Mode et accessoires</option><option>Beauté et bien-être</option><option>Électronique</option><option>Autre commerce</option></select></div>
                  <div className="auth-field"><label className="auth-label" htmlFor="adresse-commerce">Adresse du commerce</label><input ref={merchantAddressRef} id="adresse-commerce" name="adresseCommerce" type="text" placeholder="Ville, quartier, rue" required /></div>
                </div>
              )}
              <PasswordField id="signup-password" label="Créer un mot de passe" placeholder="6 caractères minimum" autoComplete="new-password" visible={visibleFields.signup} onToggle={() => toggleVisibility("signup")} />
              <PasswordField id="confirmation" label="Confirmer le mot de passe" placeholder="Répétez le mot de passe" autoComplete="new-password" visible={visibleFields.confirmation} onToggle={() => toggleVisibility("confirmation")} inputRef={confirmationRef} />
              <div className="auth-field auth-terms-field">
                <label className="auth-checkbox"><input type="checkbox" name="conditions" required /> <span>J’accepte les <Link href="/conditions-utilisation">conditions d’utilisation</Link> (contenu provisoire à valider).</span></label>
              </div>
              <button className="auth-submit" type="submit">Créer mon compte</button>
              <p className="auth-small-note">Les comptes commerçants pourront être soumis à une validation par l’administration.</p>
              <p className="auth-switch">Vous avez déjà un compte ? <Link href={`/connexion${profileSuffix}`}>Se connecter</Link></p>
            </form>
          )}
        </section>
      </main>
      <footer className="auth-footer">© {new Date().getFullYear()} Delifast. Parcours de démonstration — aucun compte n’est créé ou connecté.</footer>
    </>
  );
}
