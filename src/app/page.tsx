import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#070809',
      color: '#f2f2f0',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📚</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>
          Bookly
        </h1>
        <p style={{ color: '#777c83', fontSize: '16px' }}>
          Digital Book Store - Solution complète
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link
          href="/admin"
          style={{
            height: '50px',
            padding: '0 30px',
            background: '#f1f1ef',
            color: '#080808',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ⚙️ Panneau Admin
        </Link>

        <a
          href="/download/bookly-app.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            height: '50px',
            padding: '0 30px',
            background: 'transparent',
            color: '#f2f2f0',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          📄 Version Standalone (HTML)
        </a>
      </div>

      <div style={{
        marginTop: '60px',
        maxWidth: '600px',
        padding: '25px',
        background: '#0d0f11',
        border: '1px solid rgba(255,255,255,0.075)',
        borderRadius: '12px',
        color: '#777c83',
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        <h3 style={{ color: '#aeb2b7', marginBottom: '12px', fontSize: '15px' }}>
          🚀 Fonctionnalités incluses :
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ Base de données des livres (Prisma + SQLite)</li>
          <li>✅ Upload de fichiers PDF/EPUB/Couvertures</li>
          <li>✅ Panneau d&apos;administration complet</li>
          <li>✅ Pages de vente automatiques (/store/[slug])</li>
          <li>✅ Système de commandes et téléchargements</li>
          <li>✅ Statistiques (vues, téléchargements)</li>
          <li>✅ Intégration paiement (MyChariow, etc.)</li>
          <li>✅ Design responsive et moderne</li>
        </ul>
      </div>
    </div>
  );
}
