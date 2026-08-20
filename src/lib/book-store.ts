// Système de stockage partagé entre Admin et Page Publique
// Utilise localStorage pour persister les données

export interface Habit {
  id: number;
  title: string;
  desc: string;
}

export interface BookData {
  title: string;
  author: string;
  regularPrice: number;
  specialPrice: number;
  currency: string;
  tagline: string;
  description: {
    hook: string;
    body1: string;
    body2: string;
    body3: string;
    cta: string;
  };
  chaptersList: Habit[];
  paymentLink: string;
  coverImage?: string; // base64 ou URL
}

// Valeurs par défaut
const DEFAULT_BOOK_DATA: BookData = {
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
  paymentLink: ""
};

const STORAGE_KEY = 'brookly_book_data';

// Récupérer les données du livre
export function getBookData(): BookData {
  if (typeof window === 'undefined') return DEFAULT_BOOK_DATA;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Fusion avec les défauts pour éviter les champs manquants
      return { ...DEFAULT_BOOK_DATA, ...parsed };
    }
  } catch (e) {
    console.error('Erreur lecture données:', e);
  }
  
  return DEFAULT_BOOK_DATA;
}

// Sauvegarder les données du livre
export function saveBookData(data: Partial<BookData>): BookData {
  const currentData = getBookData();
  const newData = { ...currentData, ...data };
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      // Dispatch un événement pour notifier les autres composants
      window.dispatchEvent(new CustomEvent('bookDataChanged', { detail: newData }));
    } catch (e) {
      console.error('Erreur sauvegarde:', e);
    }
  }
  
  return newData;
}

// Réinitialiser aux valeurs par défaut
export function resetBookData(): BookData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('bookDataChanged', { detail: DEFAULT_BOOK_DATA }));
  }
  return DEFAULT_BOOK_DATA;
}

// Écouter les changements (pour la page publique)
export function onBookDataChange(callback: (data: BookData) => void): () => void {
  const handler = ((e: CustomEvent<BookData>) => callback(e.detail)) as EventListener;
  
  window.addEventListener('bookDataChanged', handler);
  
  // Retourner fonction de cleanup
  return () => window.removeEventListener('bookDataChanged', handler);
}
