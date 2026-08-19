'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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
  slug: string;
}

export default function StorePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const fetchBook = async () => {
    try {
      // D'abord essayer de trouver par slug
      const res = await fetch('/api/books');
      const data = await res.json();
      
      if (data.success) {
        const found = data.data.find((b: Book) => b.slug === slug);
        if (found) {
          setBook(found);
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!book || !book.paymentUrl) return;
    
    setBuying(true);
    
    try {
      // Créer une commande
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          buyerEmail: '', // Peut être collecté via un formulaire
          buyerName: ''
        })
      });
      
      const orderData = await orderRes.json();
      
      if (orderData.success) {
        // Rediriger vers le lien de paiement
        window.open(book.paymentUrl, '_blank');
        
        // Stocker l'ID de commande pour le téléchargement après paiement
        localStorage.setItem('pendingOrder', JSON.stringify({
          orderId: orderData.data.id,
          downloadUrl: orderData.data.downloadUrl,
          epubDownloadUrl: orderData.data.epubDownloadUrl
        }));
        
        alert('Vous allez être redirigé vers la page de paiement. Après validation, vous pourrez télécharger votre livre.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070809',
        color: '#f2f2f0'
      }}>
        Chargement...
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070809',
        color: '#f2f2f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
          <p>Livre non trouvé</p>
          <a href="/admin" style={{ color: '#a2a6ab', textDecoration: 'underline' }}>
            Retour à l'admin
          </a>
        </div>
      </div>
    );
  }

  const formatBadges = [];
  if (book.hasPDF) formatBadges.push('PDF');
  if (book.hasEPUB) formatBadges.push('EPUB');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#08090b', 
      color: '#f2f2f0',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        maxWidth: '1120px',
        margin: 'auto',
        padding: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.07)'
      }}>
        <div style={{ fontWeight: '850', fontSize: '14px' }}>
          {book.title.toUpperCase()}
        </div>
        <div style={{ color: '#646970', fontSize: '12px', fontWeight: '800' }}>
          {formatBadges.length > 0 ? formatBadges.join(' + ') : 'NUMÉRIQUE'}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: '1120px',
        margin: 'auto',
        padding: '60px 25px',
        display: 'grid',
        gridTemplateColumns: 'minmax(200px,380px) minmax(0,1fr)',
        gap: '50px',
        alignItems: 'center'
      }}>
        {/* Couverture */}
        <div>
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px 12px 12px 4px',
                boxShadow: '18px 25px 60px rgba(0,0,0,.62)'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              aspectRatio: '2/3',
              background: '#141619',
              borderRadius: '4px 12px 12px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4e535a',
              fontSize: '24px'
            }}>📚</div>
          )}
        </div>

        {/* Contenu */}
        <div>
          <div style={{
            marginBottom: '15px',
            color: '#747981',
            fontSize: '10px',
            fontWeight: '850',
            letterSpacing: '1.5px'
          }}>
            LIVRE NUMÉRIQUE
          </div>
          
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: '.97',
            letterSpacing: '-3px',
            marginBottom: '18px',
            fontWeight: '800'
          }}>
            {book.title}
          </h1>
          
          <p style={{
            color: '#969ba2',
            fontSize: '13px',
            marginBottom: '20px'
          }}>
            Par {book.author}
          </p>
          
          {book.tagline && (
            <p style={{
              color: '#858a92',
              fontSize: '14px',
              lineHeight: '1.75',
              marginBottom: '25px',
              maxWidth: '550px'
            }}>
              {book.tagline}
            </p>
          )}

          {/* Badges format */}
          {formatBadges.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '25px'
            }}>
              {formatBadges.map((badge) => (
                <span key={badge} style={{
                  padding: '6px 10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '5px',
                  background: '#0e1012',
                  color: '#90959c',
                  fontSize: '11px',
                  fontWeight: '800'
                }}>
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Prix et achat */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{
                fontSize: '22px',
                fontWeight: '850',
                color: '#f0f0ee'
              }}>
                {book.price.toLocaleString()}
              </div>
              <small style={{
                display: 'block',
                marginTop: '3px',
                color: '#5d6269',
                fontSize: '11px'
              }}>
                {book.currency} · paiement sécurisé
              </small>
            </div>

            <button
              onClick={handlePurchase}
              disabled={buying || !book.paymentUrl}
              style={{
                height: '44px',
                padding: '0 24px',
                background: book.paymentUrl ? '#f2f2f1' : '#333',
                color: book.paymentUrl ? '#080808' : '#666',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '850',
                cursor: book.paymentUrl ? 'pointer' : 'not-allowed',
                opacity: buying ? 0.7 : 1,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {buying ? 'Chargement...' : 'Acheter le livre'}
              →
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      {book.description && (
        <section style={{
          maxWidth: '870px',
          margin: 'auto',
          padding: '72px 25px'
        }}>
          <div style={{
            marginBottom: '12px',
            color: '#656a72',
            fontSize: '11px',
            fontWeight: '850',
            letterSpacing: '1.4px',
            textTransform: 'uppercase'
          }}>
            À propos du livre
          </div>
          
          <h2 style={{
            fontSize: '32px',
            marginBottom: '22px',
            letterSpacing: '-2px'
          }}>
            Découvrez ce livre.
          </h2>
          
          <p style={{
            color: '#898e96',
            fontSize: '14px',
            lineHeight: '1.9',
            whiteSpace: 'pre-line'
          }}>
            {book.description}
          </p>
        </section>
      )}

      {/* Features */}
      <section style={{
        maxWidth: '1120px',
        margin: 'auto',
        padding: '0 25px 58px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <article style={{
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.075)',
          borderRadius: '10px',
          background: '#0e1013'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '12px',
            border: '1px solid rgba(255,255,255,0.075)',
            borderRadius: '7px',
            fontSize: '14px'
          }}>📄</div>
          <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '6px' }}>
            Format numérique
          </h3>
          <p style={{ color: '#646970', fontSize: '11px', lineHeight: '1.55' }}>
            Disponible en {formatBadges.join(' et ') || 'format numérique'} pour une lecture sur tous vos appareils.
          </p>
        </article>

        <article style={{
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.075)',
          borderRadius: '10px',
          background: '#0e1013'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '12px',
            border: '1px solid rgba(255,255,255,0.075)',
            borderRadius: '7px',
            fontSize: '14px'
          }}>⬇️</div>
          <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '6px' }}>
            Livraison immédiate
          </h3>
          <p style={{ color: '#646970', fontSize: '11px', lineHeight: '1.55' }}>
            Recevez votre fichier instantanément après validation du paiement.
          </p>
        </article>

        <article style={{
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.075)',
          borderRadius: '10px',
          background: '#0e1013'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '12px',
            border: '1px solid rgba(255,255,255,0.075)',
            borderRadius: '7px',
            fontSize: '14px'
          }}>🔒</div>
          <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '6px' }}>
            Paiement sécurisé
          </h3>
          <p style={{ color: '#646970', fontSize: '11px', lineHeight: '1.55' }}>
            Transaction sécurisée via notre partenaire de paiement.
          </p>
        </article>
      </section>

      {/* Footer */}
      <footer style={{
        maxWidth: '1120px',
        margin: 'auto',
        padding: '25px',
        borderTop: '1px solid rgba(255,255,255,0.055)',
        display: 'flex',
        justifyContent: 'space-between',
        color: '#535860',
        fontSize: '11px'
      }}>
        <span>© 2026 · Édition numérique</span>
        <span>Tous droits réservés</span>
      </footer>
    </div>
  );
}
