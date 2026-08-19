'use client';

import { useState, useEffect, useCallback } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  tagline: string | null;
  description: string;
  price: number;
  currency: string;
  paymentUrl: string | null;
  coverImage: string | null;
  hasPDF: boolean;
  hasEPUB: boolean;
  pdfPath: string | null;
  epubPath: string | null;
  isActive: boolean;
  slug: string;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Formulaire
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    tagline: '',
    description: '',
    price: '',
    currency: 'FCFA',
    paymentUrl: ''
  });

  // Charger les livres
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/books');
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Créer/Mettre à jour un livre
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let res;
      
      if (editingBook) {
        // Mise à jour
        res = await fetch(`/api/books/${editingBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price)
          })
        });
      } else {
        // Création
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          form.append(key, value);
        });
        
        res = await fetch('/api/books', {
          method: 'POST',
          body: form
        });
      }
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: editingBook ? 'Livre mis à jour !' : 'Livre créé !' });
        resetForm();
        fetchBooks();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erreur' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur réseau' });
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  // Upload fichier
  const handleFileUpload = async (file: File, type: 'pdf' | 'epub' | 'cover', bookId?: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (bookId) formData.append('bookId', bookId);
      
      const res = await fetch(`/api/books/upload/${type}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: `${type.toUpperCase()} uploadé !` });
        fetchBooks(); // Refresh pour voir les changements
      } else {
        setMessage({ type: 'error', text: data.error || 'Erreur upload' });
      }
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur upload' });
    }
  };

  // Supprimer un livre
  const deleteBook = async (id: string) => {
    if (!confirm('Supprimer ce livre ?')) return;
    
    try {
      const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Livre supprimé !' });
        fetchBooks();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur suppression' });
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  // Éditer un livre
  const editBook = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      tagline: book.tagline || '',
      description: book.description,
      price: book.price.toString(),
      currency: book.currency,
      paymentUrl: book.paymentUrl || ''
    });
    setShowForm(true);
  };

  // Reset formulaire
  const resetForm = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      tagline: '',
      description: '',
      price: '',
      currency: 'FCFA',
      paymentUrl: ''
    });
    setShowForm(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#070809', 
      color: '#f2f2f0',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: '#0d0f11',
        borderBottom: '1px solid rgba(255,255,255,0.075)',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>📚 Bookly Admin</h1>
          <p style={{ color: '#777c83', fontSize: '12px', marginTop: '4px' }}>
            Gestion des livres numériques
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          style={{
            height: '40px',
            padding: '0 20px',
            background: showForm ? '#333' : '#f1f1ef',
            color: showForm ? '#fff' : '#080808',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {showForm ? '✕ Annuler' : '+ Nouveau Livre'}
        </button>
      </header>

      {/* Message */}
      {message && (
        <div style={{
          margin: '20px 30px',
          padding: '15px 20px',
          borderRadius: '8px',
          background: message.type === 'success' ? '#1a3d1a' : '#3d1a1a',
          color: message.type === 'success' ? '#7bc97b' : '#c97b7b',
          fontSize: '14px'
        }}>
          {message.text}
        </div>
      )}

      {/* Formulaire */}
      {showForm && (
        <div style={{
          margin: '0 30px 30px',
          padding: '25px',
          background: '#0d0f11',
          border: '1px solid rgba(255,255,255,0.075)',
          borderRadius: '12px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>
            {editingBook ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 12px',
                    background: '#090b0d',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e6e7e5',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                  Auteur *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 12px',
                    background: '#090b0d',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e6e7e5',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                  Prix *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 12px',
                    background: '#090b0d',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e6e7e5',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                  Devise
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '0 12px',
                    background: '#090b0d',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e6e7e5',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                Accroche
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '0 12px',
                  background: '#090b0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#e6e7e5',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#090b0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#e6e7e5',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#aeb2b7' }}>
                Lien de paiement (MyChariow)
              </label>
              <input
                type="url"
                value={formData.paymentUrl}
                onChange={(e) => setFormData({...formData, paymentUrl: e.target.value})}
                placeholder="https://..."
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '0 12px',
                  background: '#090b0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#e6e7e5',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  height: '42px',
                  padding: '0 25px',
                  background: '#f1f1ef',
                  color: '#080808',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {editingBook ? 'Mettre à jour' : 'Créer le livre'}
              </button>
              
              {editingBook && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    height: '42px',
                    padding: '0 25px',
                    background: 'transparent',
                    color: '#999',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
          
          {/* Upload fichiers si édition */}
          {editingBook && (
            <div style={{ marginTop: '30px', paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.075)' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Fichiers du livre</h3>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <label style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '20px',
                  background: '#090b0d',
                  border: `2px dashed ${editingBook.hasPDF ? '#4ade80' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'pdf', editingBook.id);
                    }}
                  />
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                  <div style={{ fontSize: '13px', color: '#aeb2b7' }}>
                    {editingBook.hasPDF ? 'PDF ✓' : 'Uploader PDF'}
                  </div>
                </label>
                
                <label style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '20px',
                  background: '#090b0d',
                  border: `2px dashed ${editingBook.hasEPUB ? '#4ade80' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    accept=".epub"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'epub', editingBook.id);
                    }}
                  />
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📖</div>
                  <div style={{ fontSize: '13px', color: '#aeb2b7' }}>
                    {editingBook.hasEPUB ? 'EPUB ✓' : 'Uploader EPUB'}
                  </div>
                </label>
                
                <label style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '20px',
                  background: '#090b0d',
                  border: `2px dashed ${editingBook.coverImage ? '#4ade80' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'cover', editingBook.id);
                    }}
                  />
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
                  <div style={{ fontSize: '13px', color: '#aeb2b7' }}>
                    {editingBook.coverImage ? 'Couverture ✓' : 'Couverture'}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Liste des livres */}
      <main style={{ padding: '0 30px 30px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>
          Livres ({books.length})
        </h2>
        
        {loading ? (
          <p>Chargement...</p>
        ) : books.length === 0 ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#555a61',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '12px'
          }}>
            Aucun livre. Cliquez sur "+ Nouveau Livre" pour commencer.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {books.map((book) => (
              <div key={book.id} style={{
                background: '#0d0f11',
                border: '1px solid rgba(255,255,255,0.075)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* Couverture ou placeholder */}
                <div style={{
                  height: '180px',
                  background: book.coverImage 
                    ? `url(${book.coverImage}) center/cover`
                    : 'linear-gradient(135deg, #141619, #1a1c20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  {!book.coverImage && '📚'}
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px' }}>
                    {book.title}
                  </h3>
                  <p style={{ color: '#969ba2', fontSize: '13px', marginBottom: '10px' }}>
                    par {book.author}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: '#0e1012',
                      borderRadius: '4px',
                      fontSize: '11px',
                      color: '#8d9299'
                    }}>
                      {book.price.toLocaleString()} {book.currency}
                    </span>
                    
                    {book.hasPDF && (
                      <span style={{
                        padding: '4px 8px',
                        background: '#1a2e1a',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#7bc97b'
                      }}>
                        PDF
                      </span>
                    )}
                    
                    {book.hasEPUB && (
                      <span style={{
                        padding: '4px 8px',
                        background: '#1a2e1a',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#7bc97b'
                      }}>
                        EPUB
                      </span>
                    )}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                    color: '#555a61',
                    marginBottom: '15px'
                  }}>
                    <span>👁️ {book.viewCount} vues</span>
                    <span>⬇️ {book.downloadCount} téléchargements</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => editBook(book)}
                      style={{
                        flex: 1,
                        height: '34px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#c9ccd0',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Modifier
                    </button>
                    
                    <button
                      onClick={() => deleteBook(book.id)}
                      style={{
                        height: '34px',
                        padding: '0 15px',
                        background: 'transparent',
                        border: '1px solid rgba(255,100,100,0.2)',
                        borderRadius: '6px',
                        color: '#c97b7b',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                  
                  {/* Lien vers la page publique */}
                  <a
                    href={`/store/${book.slug}`}
                    target="_blank"
                    style={{
                      display: 'block',
                      marginTop: '12px',
                      padding: '10px',
                      background: '#15171a',
                      borderRadius: '6px',
                      color: '#a2a6ab',
                      fontSize: '12px',
                      textDecoration: 'none',
                      textAlign: 'center'
                    }}
                  >
                    Voir la page de vente →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
