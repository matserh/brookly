'use client';

import { BookData } from './BooklyApp';

interface PreviewProps {
  bookData: BookData;
  onHideSidebar: () => void;
  onShowEditor: () => void;
}

export default function Preview({ bookData, onHideSidebar, onShowEditor }: PreviewProps) {
  const {
    title = 'Ton livre commence ici.',
    author = 'Par ton nom',
    tagline = 'Une courte présentation de ton livre apparaîtra ici.',
    description = 'La description complète de ton livre apparaîtra ici.',
    price = '5 000',
    currency = 'FCFA',
    payment = '',
    format,
    cover,
  } = bookData;

  const getFormatBadges = () => {
    if (!format) return [];
    if (format === 'PDF') return ['PDF'];
    if (format === 'EPUB') return ['EPUB'];
    return ['PDF', 'EPUB'];
  };

  const badges = getFormatBadges();

  return (
    <main className="preview-area">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="toolbar-button" type="button" onClick={onHideSidebar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className="hide-text">Masquer l&apos;éditeur</span>
          </button>

          <div className="live">
            <span className="live-dot"></span>
            Page en direct
          </div>
        </div>
      </div>

      {/* Show Editor Button (Mobile/Floating) */}
      <button 
        className="show-editor" 
        type="button"
        onClick={onShowEditor}
        aria-label="Afficher l'éditeur"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      {/* Website Preview */}
      <div className="website">
        <div className="page">
          {/* Navigation */}
          <nav className="page-nav">
            <div className="page-brand">{title.toUpperCase() || 'MON LIVRE'}</div>
            <div className="page-meta">{format || 'AUCUN FICHIER'}</div>
          </nav>

          {/* Hero Section */}
          <section className="hero">
            <div className="book-wrap">
              {cover ? (
                <img 
                  src={cover} 
                  alt="Couverture du livre" 
                  className="book-cover"
                />
              ) : (
                <div className="book-cover empty">Aucune couverture</div>
              )}
            </div>

            <div className="hero-content">
              <div className="eyebrow">LIVRE NUMÉRIQUE</div>
              
              <h1 className="book-title">{title}</h1>
              
              <div className="book-author">{author}</div>
              
              <div className="book-tagline">{tagline}</div>

              <div className="format-badges">
                {badges.map((badge, index) => (
                  <span key={index} className="format-badge">{badge}</span>
                ))}
              </div>

              <div className="purchase">
                <div className="price">
                  {price}
                  <small>{currency} · paiement sécurisé</small>
                </div>

                <a
                  className="buy-button"
                  href={payment || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acheter le livre
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h13" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="about">
            <div className="about-label">À propos du livre</div>
            <h2 className="about-title">Découvrez le livre.</h2>
            <div className="about-description">{description}</div>
          </section>

          {/* Features Section */}
          <section className="features">
            <article className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
                  <path d="M4 5.5v15" />
                </svg>
              </div>
              <div className="feature-title">Format numérique</div>
              <div className="feature-text">
                Le format est automatiquement déterminé à partir des fichiers ajoutés.
              </div>
            </article>

            <article className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 20h14" />
                </svg>
              </div>
              <div className="feature-title">Livraison numérique</div>
              <div className="feature-text">
                Le lecteur reçoit le contenu numérique après son achat.
              </div>
            </article>

            <article className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>
              <div className="feature-title">Paiement</div>
              <div className="feature-text">
                Le bouton d&apos;achat redirige vers ton lien MyChariow.
              </div>
            </article>
          </section>

          {/* Footer */}
          <footer className="page-footer">
            <span>© 2026 · Édition numérique</span>
            <span>Tous droits réservés</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
