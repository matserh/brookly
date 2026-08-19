'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import Preview from './Preview';

export interface BookData {
  title: string;
  author: string;
  tagline: string;
  description: string;
  price: string;
  currency: string;
  payment: string;
  format: string | null;
  cover: string;
}

const defaults: BookData = {
  title: 'Ton livre commence ici.',
  author: 'Par ton nom',
  tagline: 'Une courte présentation de ton livre apparaîtra ici.',
  description: 'La description complète de ton livre apparaîtra ici.',
  price: '5 000',
  currency: 'FCFA',
  payment: '',
  format: null,
  cover: '',
};

export default function BooklyApp() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Prêt à modifier');
  const [bookData, setBookData] = useState<BookData>(defaults);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookly-mvp');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBookData({ ...defaults, ...data });
        setSaveStatus('Projet chargé');
      } catch (e) {
        console.warn('Impossible de charger le projet.');
      }
    }
  }, []);

  const updateField = useCallback((field: keyof BookData, value: string) => {
    setBookData(prev => ({ ...prev, [field]: value }));
    setSaveStatus('Modifications non sauvegardées');
  }, []);

  const handleSave = useCallback(() => {
    try {
      localStorage.setItem('bookly-mvp', JSON.stringify(bookData));
      setSaveStatus('Projet sauvegardé');
    } catch (e) {
      setSaveStatus('Impossible de sauvegarder');
    }
  }, [bookData]);

  const handleExport = useCallback(() => {
    const html = generatePublicHTML(bookData);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ebook-store.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    setSaveStatus('Page exportée');
  }, [bookData]);

  const handleCoverChange = useCallback((coverData: string) => {
    setBookData(prev => ({ ...prev, cover: coverData }));
    setSaveStatus('Couverture modifiée');
  }, []);

  const handleFilesChange = useCallback((files: File[], format: string | null) => {
    setSelectedFiles(files);
    setBookData(prev => ({ ...prev, format }));
    setSaveStatus(files.length ? `${files.length} fichier(s) ajouté(s)` : 'Aucun fichier ajouté');
  }, []);

  const toggleSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setMobileOpen(true);
    } else {
      setSidebarHidden(true);
    }
  }, []);

  const showEditor = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setMobileOpen(true);
    } else {
      setSidebarHidden(false);
    }
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div 
      className={`app ${sidebarHidden ? 'sidebar-hidden' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <Sidebar
        bookData={bookData}
        selectedFiles={selectedFiles}
        saveStatus={saveStatus}
        onUpdateField={updateField}
        onSave={handleSave}
        onExport={handleExport}
        onCoverChange={handleCoverChange}
        onFilesChange={handleFilesChange}
        onCloseMobile={closeMobile}
      />
      
      <div className="overlay" onClick={closeMobile} />
      
      <Preview
        bookData={bookData}
        onHideSidebar={toggleSidebar}
        onShowEditor={showEditor}
      />
    </div>
  );
}

// Helper function to escape HTML
function escapeHTML(value: string): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Generate public HTML for export
function generatePublicHTML(data: BookData): string {
  const {
    title = defaults.title,
    author = defaults.author,
    tagline = defaults.tagline,
    description = defaults.description,
    price = defaults.price,
    currency = defaults.currency,
    payment = '#',
    format = 'Aucun fichier',
    cover,
  } = data;

  let badges = '';
  if (format === 'PDF') {
    badges = '<span>PDF</span>';
  } else if (format === 'EPUB') {
    badges = '<span>EPUB</span>';
  } else if (format === 'PDF + EPUB') {
    badges = '<span>PDF</span><span>EPUB</span>';
  }

  const coverHTML = cover
    ? `<img class="cover" src="${cover}" alt="">`
    : `<div class="cover empty">Aucune couverture</div>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHTML(title)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:#08090b;color:#f2f2f0;font-family:Inter,system-ui,sans-serif}
a{text-decoration:none;color:inherit}
nav{max-width:1120px;min-height:68px;margin:auto;padding:0 25px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07)}
.logo{font-size:10px;font-weight:850}
.meta{color:#646970;font-size:7px;font-weight:800;letter-spacing:1px}
.hero{max-width:1120px;min-height:650px;margin:auto;padding:75px 25px;display:flex;grid-template-columns:minmax(190px,360px) minmax(0,1fr);align-items:center;gap:70px}
.cover-wrap{display:flex;align-items:center;justify-content:center}
.cover{display:block;width:auto;height:auto;max-width:100%;max-height:510px;object-fit:contain;border-radius:4px 13px 13px 4px;box-shadow:20px 28px 70px rgba(0,0,0,.65)}
.cover.empty{width:280px;height:420px;display:grid;place-items:center;background:#15171a;color:#555;font-size:8px}
.eyebrow{margin-bottom:13px;color:#747981;font-size:8px;font-weight:850;letter-spacing:1.5px}
h1{max-width:700px;margin-bottom:15px;font-size:clamp(43px,6vw,77px);line-height:.95;letter-spacing:-4px}
.author{margin-bottom:17px;color:#9ba0a6;font-size:10px}
.tagline{max-width:600px;margin-bottom:21px;color:#92979f;font-size:12px;line-height:1.8}
.formats{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:25px}
.formats span{padding:5px 7px;border:1px solid rgba(255,255,255,.1);border-radius:5px;background:#0e1012;color:#90959c;font-size:7px;font-weight:800}
.purchase{display:flex;align-items:center;flex-wrap:wrap;gap:13px}
.price{font-size:19px;font-weight:850}
.price small{display:block;margin-top:2px;color:#62676e;font-size:7px;font-weight:500}
.buy{height:40px;display:flex;align-items:center;justify-content:center;padding:0 17px;border-radius:8px;background:#f2f2f1;color:#080808;font-size:8px;font-weight:850}
.about{max-width:850px;margin:auto;padding:90px 25px}
.label{margin-bottom:10px;color:#666b73;font-size:8px;font-weight:850;letter-spacing:1.5px;text-transform:uppercase}
h2{margin-bottom:20px;font-size:37px;line-height:1;letter-spacing:-2px}
.description{color:#92979f;font-size:12px;line-height:1.9;white-space:pre-line}
footer{max-width:1120px;margin:auto;padding:24px 25px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.07);color:#555a62;font-size:7px}
@media(max-width:700px){
nav{padding:0 18px}.meta{display:none}
.hero{grid-template-columns:1fr;min-height:auto;padding:55px 18px;gap:42px;text-align:center}
.hero-content{display:flex;flex-direction:column;align-items:center}
.cover{max-width:78vw;max-height:380px}.cover.empty{width:220px;height:330px}
h1{font-size:43px;letter-spacing:-2.5px}.tagline{max-width:500px}
.formats{justify-content:center}.purchase{justify-content:center}
.about{padding:60px 18px}h2{font-size:31px}footer{padding:20px 18px}
}
</style>
</head>
<body>
<nav>
<div class="logo">${escapeHTML(title).toUpperCase()}</div>
<div class="meta">${escapeHTML(format)}</div>
</nav>
<section class="hero">
<div class="cover-wrap">${coverHTML}</div>
<div class="hero-content">
<div class="eyebrow">LIVRE NUMÉRIQUE</div>
<h1>${escapeHTML(title)}</h1>
<div class="author">${escapeHTML(author)}</div>
<div class="tagline">${escapeHTML(tagline)}</div>
<div class="formats">${badges}</div>
<div class="purchase">
<div class="price">${escapeHTML(price)}<small>${escapeHTML(currency)} · paiement sécurisé</small></div>
<a class="buy" href="${escapeHTML(payment)}" target="_blank" rel="noopener noreferrer">Acheter le livre</a>
</div>
</div>
</section>
<section class="about">
<div class="label">À propos du livre</div>
<h2>Découvrez le livre.</h2>
<div class="description">${escapeHTML(description)}</div>
</section>
<footer>
<span>© 2026 · Édition numérique</span>
<span>Tous droits réservés</span>
</footer>
</body>
</html>`;
}
