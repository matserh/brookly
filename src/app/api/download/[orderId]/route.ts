import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { readFile } from 'fs/promises';
import path from 'path';

// GET - Télécharger un livre après achat
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    
    // Récupérer la commande
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { book: true }
    });
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Commande non trouvée' },
        { status: 404 }
      );
    }
    
    // Vérifier que la commande est complétée
    if (order.status !== 'completed') {
      return NextResponse.json(
        { success: false, error: 'Cette commande n\'est pas encore validée' },
        { status: 403 }
      );
    }
    
    // Vérifier que le lien de téléchargement n'a pas expiré
    if (order.downloadExpires && new Date() > order.downloadExpires) {
      return NextResponse.json(
        { success: false, error: 'Le lien de téléchargement a expiré' },
        { status: 410 }
      );
    }
    
    // Vérifier le nombre de téléchargements
    if (order.downloadCount >= 5) { // Limite à 5 téléchargements
      return NextResponse.json(
        { success: false, error: 'Nombre maximum de téléchargements atteint' },
        { status: 410 }
      );
    }
    
    // Déterminer quel fichier servir (PDF ou EPUB)
    const format = request.nextUrl.searchParams.get('format') || 'pdf';
    let filePath: string;
    let fileName: string;
    let contentType: string;
    
    if (format === 'epub' && order.book.epubPath) {
      filePath = path.join(process.cwd(), order.book.epubPath);
      fileName = `${order.book.title.replace(/[^a-zA-Z0-9]/g, '_')}.epub`;
      contentType = 'application/epub+zip';
    } else if (order.book.pdfPath) {
      filePath = path.join(process.cwd(), order.book.pdfPath);
      fileName = `${order.book.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      contentType = 'application/pdf';
    } else {
      return NextResponse.json(
        { success: false, error: 'Fichier non disponible' },
        { status: 404 }
      );
    }
    
    // Lire le fichier
    const fileBuffer = await readFile(filePath);
    
    // Incrémenter le compteur de téléchargements
    await db.order.update({
      where: { id: orderId },
      data: {
        downloadCount: { increment: 1 }
      }
    });
    
    // Incrémenter le compteur du livre
    await db.book.update({
      where: { id: order.bookId },
      data: {
        downloadCount: { increment: 1 }
      }
    });
    
    // Retourner le fichier
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString()
      }
    });
    
  } catch (error) {
    console.error('Erreur téléchargement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du téléchargement' },
      { status: 500 }
    );
  }
}
