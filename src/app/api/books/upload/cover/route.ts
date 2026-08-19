import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

// POST - Uploader une couverture
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const bookId = data.get('bookId') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }
    
    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Le fichier doit être une image (PNG, JPG, WEBP)' },
        { status: 400 }
      );
    }
    
    // Vérifier que le livre existe
    if (bookId) {
      const book = await db.book.findUnique({ where: { id: bookId } });
      if (!book) {
        return NextResponse.json(
          { success: false, error: 'Livre non trouvé' },
          { status: 404 }
        );
      }
    }
    
    // Créer le dossier uploads/covers s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'uploads', 'covers');
    await mkdir(uploadDir, { recursive: true });
    
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${timestamp}-cover.${ext}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Convertir le fichier en buffer et le sauvegarder
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    // Mettre à jour le livre en base de données si bookId fourni
    if (bookId) {
      await db.book.update({
        where: { id: bookId },
        data: {
          coverImage: `/uploads/covers/${fileName}`
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        fileName,
        filePath: `/uploads/covers/${fileName}`,
        fileSize: file.size,
        bookId
      },
      message: 'Couverture uploadée avec succès'
    });
    
  } catch (error) {
    console.error('Erreur upload couverture:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload de la couverture' },
      { status: 500 }
    );
  }
}
