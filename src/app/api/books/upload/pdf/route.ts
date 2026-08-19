import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

// POST - Uploader un PDF
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
    
    // Vérifier que c'est un PDF
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'Le fichier doit être un PDF' },
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
    
    // Créer le dossier uploads/pdf s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'uploads', 'pdf');
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
          hasPDF: true,
          pdfPath: `/uploads/pdf/${fileName}`
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        fileName,
        filePath: `/uploads/pdf/${fileName}`,
        fileSize: file.size,
        bookId
      },
      message: 'PDF uploadé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur upload PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload du PDF' },
      { status: 500 }
    );
  }
}
