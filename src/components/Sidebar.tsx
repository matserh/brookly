'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { BookData } from './BooklyApp';

interface SidebarProps {
  bookData: BookData;
  selectedFiles: File[];
  saveStatus: string;
  onUpdateField: (field: keyof BookData, value: string) => void;
  onSave: () => void;
  onExport: () => void;
  onCoverChange: (coverData: string) => void;
  onFilesChange: (files: File[], format: string | null) => void;
  onCloseMobile: () => void;
}

export default function Sidebar({
  bookData,
  selectedFiles,
  saveStatus,
  onUpdateField,
  onSave,
  onExport,
  onCoverChange,
  onFilesChange,
  onCloseMobile,
}: SidebarProps) {
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync cover preview when bookData.cover changes
  useEffect(() => {
    if (bookData.cover) {
      setCoverPreview(bookData.cover);
    }
  }, [bookData.cover]);

  const handleCoverUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCoverPreview(result);
      onCoverChange(result);
    };
    reader.readAsDataURL(file);
  }, [onCoverChange]);

  const handleCoverInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCoverUpload(file);
  }, [handleCoverUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleCoverUpload(file);
  }, [handleCoverUpload]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const name = file.name.toLowerCase();
      return name.endsWith('.pdf') || name.endsWith('.epub');
    });

    // Detect format
    const hasPDF = validFiles.some(f => f.name.toLowerCase().endsWith('.pdf'));
    const hasEPUB = validFiles.some(f => f.name.toLowerCase().endsWith('.epub'));
    
    let format: string | null = null;
    if (hasPDF && hasEPUB) format = 'PDF + EPUB';
    else if (hasPDF) format = 'PDF';
    else if (hasEPUB) format = 'EPUB';

    onFilesChange(validFiles, format);
  }, [onFilesChange]);

  const getFormatDescription = () => {
    switch (bookData.format) {
      case 'PDF': return 'Document PDF disponible.';
      case 'EPUB': return 'Livre numérique au format EPUB.';
      case 'PDF + EPUB': return 'Deux formats numériques disponibles.';
      default: return "Ajoute ton fichier PDF ou EPUB pour détecter automatiquement le format.";
    }
  };

  const getFormatBadges = () => {
    if (!bookData.format) return [];
    if (bookData.format === 'PDF') return ['PDF'];
    if (bookData.format === 'EPUB') return ['EPUB'];
    return ['PDF', 'EPUB'];
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Brand */}
        <div className="brand">
          <div className="brand-mark">B</div>
          <div>
            <div className="brand-name">Bookly</div>
            <div className="brand-sub">Digital Book Store</div>
          </div>
        </div>

        {/* Cover Section */}
        <section className="editor-section">
          <div className="section-heading">
            <span>Couverture</span>
            <span>01</span>
          </div>
          
          <div 
            className={`cover-upload ${isDragging ? 'dragging' : ''}`}
            onClick={() => coverInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={coverInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleCoverInputChange}
              style={{ display: 'none' }}
            />
            
            {coverPreview && (
              <img 
                src={coverPreview} 
                alt="" 
                className="cover-preview-mini"
              />
            )}
            
            {!coverPreview && (
              <>
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <div className="upload-title">Ajouter une couverture</div>
                <div className="upload-help">PNG, JPG ou WEBP</div>
              </>
            )}
          </div>
        </section>

        {/* Book Files Section */}
        <section className="editor-section">
          <div className="section-heading">
            <span>Livre numérique</span>
            <span>02</span>
          </div>

          {/* Format Detector */}
          <div className="field">
            <label>Format disponible</label>
            <div className="format-box">
              <div className="format-box-header">
                <div>
                  <span className="format-label-small">FORMAT DÉTECTÉ</span>
                  <strong>{bookData.format || 'Aucun fichier'}</strong>
                </div>
                <div className={`format-status ${bookData.format ? 'ready' : ''}`}>
                  <span></span>
                  {bookData.format ? 'Prêt' : 'En attente'}
                </div>
              </div>
              <div className="format-description">{getFormatDescription()}</div>
            </div>
          </div>

          {/* File Upload */}
          <div className="field">
            <label>Fichiers du livre</label>
            <div 
              className="file-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.epub,application/pdf,application/epub+zip"
                multiple
                onChange={handleFileInputChange}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
              />
              
              <div className="file-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M6 3h8l4 4v14H6z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6" />
                  <path d="M9 17h5" />
                </svg>
              </div>
              
              <div className="file-info">
                <div className="file-name">
                  {selectedFiles.length === 0 
                    ? 'Ajouter un fichier'
                    : selectedFiles.length === 1 
                      ? selectedFiles[0].name
                      : `${selectedFiles.length} fichiers sélectionnés`
                  }
                </div>
                <div className="file-help">PDF ou EPUB</div>
              </div>
            </div>

            {/* File List */}
            {selectedFiles.length > 0 && (
              <div className="file-list">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-item-name">{file.name}</div>
                    <div className="file-item-type">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="editor-section">
          <div className="section-heading">
            <span>Contenu</span>
            <span>03</span>
          </div>

          <div className="field">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              className="input"
              type="text"
              placeholder="Le titre de ton livre"
              value={bookData.title}
              onChange={(e) => onUpdateField('title', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="author">Auteur</label>
            <input
              id="author"
              className="input"
              type="text"
              placeholder="Ton nom"
              value={bookData.author}
              onChange={(e) => onUpdateField('author', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="tagline">Accroche</label>
            <textarea
              id="tagline"
              className="textarea"
              placeholder="Une courte présentation du livre..."
              value={bookData.tagline}
              onChange={(e) => onUpdateField('tagline', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="description">Description du livre</label>
            <textarea
              id="description"
              className="textarea description"
              placeholder="Décris ton livre en détail..."
              value={bookData.description}
              onChange={(e) => onUpdateField('description', e.target.value)}
            />
          </div>
        </section>

        {/* Payment Section */}
        <section className="editor-section">
          <div className="section-heading">
            <span>Vente</span>
            <span>04</span>
          </div>

          <div className="price-row">
            <div className="field">
              <label htmlFor="price">Prix</label>
              <input
                id="price"
                className="input"
                type="text"
                placeholder="5 000"
                value={bookData.price}
                onChange={(e) => onUpdateField('price', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="currency">Devise</label>
              <input
                id="currency"
                className="input"
                type="text"
                value={bookData.currency}
                onChange={(e) => onUpdateField('currency', e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="payment">Lien de paiement MyChariow</label>
            <input
              id="payment"
              className="input"
              type="url"
              placeholder="https://..."
              value={bookData.payment}
              onChange={(e) => onUpdateField('payment', e.target.value)}
            />
          </div>
        </section>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="actions">
          <button className="action primary" type="button" onClick={onSave}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 4h11l3 3v13H5z" />
              <path d="M8 4v6h8V4" />
              <path d="M8 20v-6h8v6" />
            </svg>
            Sauvegarder
          </button>

          <button className="action" type="button" onClick={onExport}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M4 21h16" />
            </svg>
            Exporter
          </button>
        </div>

        <div className="save-status">{saveStatus}</div>
      </div>
    </aside>
  );
}
