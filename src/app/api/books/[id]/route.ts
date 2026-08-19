import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Récupérer un livre par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = await db.book.findUnique({
      where: { id }
    });
    
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Livre non trouvé' },
        { status: 404 }
      );
    }
    
    // Incrémenter le compteur de vues
    await db.book.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    });
    
    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    console.error('Erreur récupération livre:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du livre' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un livre
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Vérifier que le livre existe
    const existingBook = await db.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json(
        { success: false, error: 'Livre non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le livre
    const updatedBook = await db.book.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.author && { author: data.author }),
        ...(data.tagline !== undefined && { tagline: data.tagline }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price !== undefined && { price: parseFloat(data.price) }),
        ...(data.currency && { currency: data.currency }),
        ...(data.paymentUrl !== undefined && { paymentUrl: data.paymentUrl }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
        ...(data.hasPDF !== undefined && { hasPDF: data.hasPDF }),
        ...(data.hasEPUB !== undefined && { hasEPUB: data.hasEPUB }),
        ...(data.pdfPath !== undefined && { pdfPath: data.pdfPath }),
        ...(data.epubPath !== undefined && { epubPath: data.epubPath }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: updatedBook,
      message: 'Livre mis à jour avec succès'
    });
    
  } catch (error) {
    console.error('Erreur mise à jour livre:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du livre' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un livre
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Vérifier que le livre existe
    const existingBook = await db.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json(
        { success: false, error: 'Livre non trouvé' },
        { status: 404 }
      );
    }
    
    // Supprimer le livre
    await db.book.delete({ where: { id } });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Livre supprimé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur suppression livre:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du livre' },
      { status: 500 }
    );
  }
}
