import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'book-data.json')

// Données par défaut
const DEFAULT_DATA = {
  title: "Les 7 Habitudes de la Réussite",
  author: "Badi Mohamed",
  regularPrice: 7000,
  specialPrice: 3000,
  currency: "FCFA",
  tagline: "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite.",
  description: {
    hook: "Découvrez les secrets qui distinguent les personnes qui réussissent de celles qui restent bloquées dans leurs objectifs.",
    body1: "Dans « Les 7 Habitudes des Personnes qui Réussissent », vous apprendrez les comportements et les méthodes adoptés par les entrepreneurs, les leaders, les étudiants performants et les personnes qui accomplissent leurs rêves.",
    body2: "À travers 7 chapitres complets, cet eBook vous guide pas à pas pour développer la discipline, mieux gérer votre temps, fixer des objectifs clairs, apprendre efficacement, prendre soin de votre santé, construire un entourage positif et transformer les échecs en opportunités de croissance.",
    body3: "Rédigé dans un langage simple et accessible, ce guide pratique vous offre des conseils concrets que vous pourrez appliquer immédiatement dans votre vie quotidienne.",
    cta: "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite."
  },
  chaptersList: [
    { id: 1, title: "Être Proactif", desc: "Prenez la responsabilité de votre vie au lieu de subir les événements" },
    { id: 2, title: "Commencer par la fin en tête", desc: "Définissez clairement votre vision et vos objectifs de vie" },
    { id: 3, title: "Placer les priorités en premier", desc: "Organisez votre temps autour de ce qui compte vraiment" },
    { id: 4, title: "Penser Gagnant-Gagnant", desc: "Créez des relations mutuellement bénéfiques et durables" },
    { id: 5, title: "Comprendre avant d'être compris", desc: "Écoutez vraiment les autres avant de vouloir vous faire comprendre" },
    { id: 6, title: "Synergiser", desc: "Combinez vos forces pour créer mieux que seul" },
    { id: 7, title: "Aiguisez l'outil", desc: "Renouvelez continuellement vos capacités physiques, mentales et spirituelles" }
  ],
  paymentLink: "",
  coverImage: ""
}

// S'assurer que le dossier data existe
async function ensureDataDir() {
  const dir = join(process.cwd(), 'data')
  try {
    await mkdir(dir, { recursive: true })
  } catch (e) {
    // Le dossier existe déjà
  }
}

// Lire les données
export async function GET() {
  try {
    await ensureDataDir()
    
    try {
      const data = await readFile(DATA_FILE, 'utf-8')
      return NextResponse.json(JSON.parse(data))
    } catch (e) {
      // Fichier n'existe pas encore, retourner les défauts
      return NextResponse.json(DEFAULT_DATA)
    }
  } catch (error) {
    console.error('Erreur lecture données:', error)
    return NextResponse.json(DEFAULT_DATA)
  }
}

// Sauvegarder les données
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir()
    
    const newData = await request.json()
    
    // Fusionner avec les données existantes ou défauts
    let currentData = DEFAULT_DATA
    try {
      const existing = await readFile(DATA_FILE, 'utf-8')
      currentData = JSON.parse(existing)
    } catch (e) {
      // Utiliser les défauts
    }
    
    const mergedData = { ...currentData, ...newData }
    
    await writeFile(DATA_FILE, JSON.stringify(mergedData, null, 2), 'utf-8')
    
    return NextResponse.json({ 
      success: true, 
      data: mergedData,
      message: 'Données sauvegardées avec succès'
    })
  } catch (error) {
    console.error('Erreur sauvegarde:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}

// Réinitialiser aux valeurs par défaut
export async function DELETE() {
  try {
    await ensureDataDir()
    await writeFile(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8')
    
    return NextResponse.json({ 
      success: true, 
      data: DEFAULT_DATA,
      message: 'Données réinitialisées'
    })
  } catch (error) {
    console.error('Erreur réinitialisation:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la réinitialisation' },
      { status: 500 }
    )
  }
}
