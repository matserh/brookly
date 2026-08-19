import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Créer une nouvelle commande (après paiement)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { bookId, buyerEmail, buyerName, paymentRef, pricePaid, currency = 'FCFA' } = data;
    
    if (!bookId) {
      return NextResponse.json(
        { success: false, error: 'bookId est requis' },
        { status: 400 }
      );
    }
    
    // Vérifier que le livre existe
    const book = await db.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Livre non trouvé' },
        { status: 404 }
      );
    }
    
    // Créer la commande avec un lien de téléchargement valide 24h
    const downloadExpires = new Date();
    downloadExpires.setHours(downloadExpires.getHours() + 24);
    
    const order = await db.order.create({
      data: {
        bookId,
        buyerEmail,
        buyerName,
        paymentRef,
        pricePaid: pricePaid || book.price,
        currency,
        status: 'completed', // Supposons que le paiement est validé
        downloadExpires,
        downloadCount: 0
      },
      include: { book: true }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        ...order,
        downloadUrl: `/api/download/${order.id}?format=pdf`,
        epubDownloadUrl: `/api/download/${order.id}?format=epub`
      },
      message: 'Commande créée avec succès'
    });
    
  } catch (error) {
    console.error('Erreur création commande:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}

// GET - Récupérer les commandes (admin)
export async function GET(request: NextRequest) {
  try {
    // Ici vous pouvez ajouter une vérification d'authentification admin
    const orders = await db.order.findMany({
      include: { book: true },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limiter à 50 résultats
    });
    
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}
