import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

// POST - Uploader un EPUB
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
    
    // Vérifier que c'est un EPUB
    if (file.type !== 'application/epub+zip' && 
        !file.type === 'application/zip' && 
        !file.name.endsWith('.epub')) {
      return NextResponse.json(
        { success: false, error: 'Le fichier doit être un EPUB' },
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
    
    // Créer le dossier uploads/epub s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'uploads', 'epub');
    await mkdir(uploadDir, { recursive: true });
    
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
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
          hasEPUB: true,
          epubPath: `/uploads/epub/${fileName}`
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        fileName,
        filePath: `/uploads/epub/${fileName}`,
        fileSize: file.size,
        bookId
      },
      message: 'EPUB uploadé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur upload EPUB:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload du EPUB' },
      { status: 500 }
    );
  }
}
