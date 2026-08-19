import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET - Récupérer tous les livres
export async function GET() {
  try {
    const books = await db.book.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    console.error('Erreur récupération livres:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des livres' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau livre
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    
    const title = data.get('title') as string;
    const author = data.get('author') as string;
    const price = parseFloat(data.get('price') as string);
    const currency = (data.get('currency') as string) || 'FCFA';
    const tagline = data.get('tagline') as string || null;
    const description = data.get('description') as string || '';
    const paymentUrl = data.get('paymentUrl') as string || null;
    
    // Générer un slug à partir du titre
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + Date.now();
    
    // Créer le livre en base de données
    const book = await db.book.create({
      data: {
        title,
        author,
        tagline,
        description,
        price,
        currency,
        paymentUrl,
        slug,
        hasPDF: false,
        hasEPUB: false
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: book,
      message: 'Livre créé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur création livre:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du livre' },
      { status: 500 }
    );
  }
}
