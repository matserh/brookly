import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

// GET - Servir les fichiers uploadés
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'Chemin manquant' },
        { status: 400 }
      );
    }
    
    // Sécurité : vérifier que le chemin ne contient pas de ..
    if (filePath.includes('..') || filePath.includes('/') && filePath.includes('\\')) {
      return NextResponse.json(
        { success: false, error: 'Chemin invalide' },
        { status: 403 }
      );
    }
    
    // Construire le chemin complet vers le fichier
    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    
    // Lire le fichier
    const fileBuffer = await readFile(fullPath);
    
    // Déterminer le type MIME basé sur l'extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.epub':
        contentType = 'application/epub+zip';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
    }
    
    // Retourner le fichier avec les headers appropriés
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000', // Cache pendant 1 an
      }
    });
    
  } catch (error) {
    console.error('Erreur service fichier:', error);
    return NextResponse.json(
      { success: false, error: 'Fichier non trouvé' },
      { status: 404 }
    );
  }
}
