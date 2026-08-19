'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, ArrowRight, Menu, X, ChevronDown, Download, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

// Configuration du livre
const BOOK_CONFIG = {
  title: "Les 7 Habitudes de la Réussite",
  subtitle: "Le guide pratique pour transformer votre vie",
  chapters: 7,
  pages: 56,
  regularPrice: 7000,
  specialPrice: 3000,
  currency: "FCFA",
  
  // Description complète
  description: {
    hook: "Découvrez les secrets qui distinguent les personnes qui réussissent de celles qui restent bloquées dans leurs objectifs.",
    body1: "Dans « Les 7 Habitudes des Personnes qui Réussissent », vous apprendrez les comportements et les méthodes adoptés par les entrepreneurs, les leaders, les étudiants performants et les personnes qui accomplissent leurs rêves.",
    body2: "À travers 7 chapitres complets, cet eBook vous guide pas à pas pour développer la discipline, mieux gérer votre temps, fixer des objectifs clairs, apprendre efficacement, prendre soin de votre santé, construire un entourage positif et transformer les échecs en opportunités de croissance.",
    body3: "Rédigé dans un langage simple et accessible, ce guide pratique vous offre des conseils concrets que vous pourrez appliquer immédiatement dans votre vie quotidienne. Que vous soyez étudiant, salarié, entrepreneur ou simplement à la recherche d'une meilleure version de vous-même, ce livre vous aidera à adopter les habitudes qui favorisent le succès durable.",
    cta: "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite et découvrez comment de petites actions répétées chaque jour peuvent produire des résultats extraordinaires."
  },
  
  chaptersList: [
    { num: 1, title: "Être Proactif", desc: "Prenez le contrôle de votre vie" },
    { num: 2, title: "Commencer par la fin en tête", desc: "Définissez votre vision" },
    { num: 3, title: "Prioriser les priorités", desc: "Gérez votre temps efficacement" },
    { num: 4, title: "Penser Gagnant-Gagnant", desc: "Créez des relations positives" },
    { num: 5, title: "Comprendre d'abord", desc: "Écoutez activement" },
    { num: 6, title: "Synergiser", desc: "Travaillez ensemble" },
    { num: 7, title: "Aiguisez la tranchante", desc: "Renouvelez-vous continuellement" }
  ],
  
  features: [
    "📖 56 pages de contenu actionnable",
    "📱 Format PDF (lisible partout)",
    "⚡ Téléchargement immédiat",
    "♾️ Accès à vie",
    "💳 Paiement sécurisé"
  ]
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Navigation minimaliste */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">LES </span>
              <span className="text-[#facc15]">7</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#livre" className="hover:text-white transition-colors">Le Livre</a>
            <a href="#contenu" className="hover:text-white transition-colors">Contenu</a>
            <Button 
              onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#facc15] hover:bg-[#eab308] text-black font-medium px-5 py-2 rounded-lg text-sm"
            >
              Acheter — {BOOK_CONFIG.specialPrice.toLocaleString()} {BOOK_CONFIG.currency}
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628] border-t border-white/5 p-6 space-y-4">
            <a href="#livre" className="block text-gray-300" onClick={() => setMobileMenuOpen(false)}>Le Livre</a>
            <a href="#contenu" className="block text-gray-300" onClick={() => setMobileMenuOpen(false)}>Contenu</a>
            <Button 
              className="w-full bg-[#facc15] text-black font-medium"
              onClick={() => {
                document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })
                setMobileMenuOpen(false)
              }}
            >
              Acheter — {BOOK_CONFIG.specialPrice.toLocaleString()} {BOOK_CONFIG.currency}
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section - Minimaliste */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Texte */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">LES </span>
                  <span className="text-[#facc15]">7</span>
                  <br />
                  <span className="text-white">HABITUDES</span>
                  <br />
                  <span className="text-gray-400 text-3xl md:text-4xl lg:text-5xl">DE LA RÉUSSITE</span>
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  {BOOK_CONFIG.description.hook}
                </p>
              </div>

              {/* Prix + CTA */}
              <div className="space-y-4 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-gray-500 line-through text-lg">{BOOK_CONFIG.regularPrice.toLocaleString()}</span>
                  <span className="text-4xl font-bold text-[#facc15]">{BOOK_CONFIG.specialPrice.toLocaleString()}</span>
                  <span className="text-gray-400">{BOOK_CONFIG.currency}</span>
                </div>

                <Button 
                  size="lg"
                  onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#facc15] hover:bg-[#eab308] text-black font-semibold px-8 py-4 rounded-lg text-base w-full sm:w-auto"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Obtenir le livre maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-sm text-gray-500">
                  Offre spéciale de lancement • Accès immédiat
                </p>
              </div>
            </div>

            {/* Image du livre */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow subtil */}
                <div className="absolute inset-0 bg-[#facc15]/10 rounded-3xl blur-3xl scale-90"></div>
                
                <div className="relative bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-2xl p-8 shadow-2xl border border-white/5">
                  <Image 
                    src="/cover.jpg" 
                    alt="Les 7 Habitudes de la Réussite - Couverture"
                    width={400}
                    height={500}
                    className="rounded-lg w-full shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section id="livre" className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              {BOOK_CONFIG.description.body1}
            </p>
            <p>
              {BOOK_CONFIG.description.body2}
            </p>
            <p>
              {BOOK_CONFIG.description.body3}
            </p>
            <p className="text-white font-medium text-lg pt-4 border-t border-white/10">
              {BOOK_CONFIG.description.cta}
            </p>
          </div>
        </div>
      </section>

      {/* Chapitres */}
      <section id="contenu" className="py-20 bg-[#0d1f3c]/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ce que vous allez apprendre</h2>
            <p className="text-gray-400">{BOOK_CONFIG.chapters} chapitres • {BOOK_CONFIG.pages} pages</p>
          </div>

          <div className="grid gap-3">
            {BOOK_CONFIG.chaptersList.map((chapter) => (
              <Card key={chapter.num} className="bg-white/[0.03] border-white/5 hover:bg-white/[0.06] transition-colors group">
                <CardContent className="p-4 md:p-5 flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 bg-[#facc15]/10 text-[#facc15] rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-[#facc15] group-hover:text-black transition-colors">
                    {chapter.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-[#facc15] transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{chapter.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="achat" className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="bg-gradient-to-b from-[#1a365d]/50 to-transparent border border-white/10">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Commencez votre transformation
                </h2>
                <p className="text-gray-400">
                  Rejoignez ceux qui ont décidé d'agir pour leur réussite.
                </p>
              </div>

              {/* Prix */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-500 line-through text-xl">{BOOK_CONFIG.regularPrice.toLocaleString()} {BOOK_CONFIG.currency}</span>
                  <span className="bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded">-57%</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-[#facc15]">
                    {BOOK_CONFIG.specialPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-300">{BOOK_CONFIG.currency}</span>
                </div>
              </div>

              {/* Inclus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto">
                {BOOK_CONFIG.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#facc15] shrink-0" />
                    {feature.split(' ').slice(1).join(' ')}
                  </div>
                ))}
              </div>

              {/* Bouton */}
              <Button 
                size="lg"
                className="w-full bg-[#facc15] hover:bg-[#eab308] text-black font-semibold px-8 py-5 rounded-lg text-lg"
                onClick={() => {
                  // TODO: Remplacer par le vrai lien MyChariow
                  alert('Lien MyChariow bientôt disponible')
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger le livre maintenant
              </Button>

              <p className="text-xs text-gray-500">
                🔒 Paiement sécurisé via MyChariow • Accès immédiat après paiement
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Les 7 Habitudes de la Réussite</span>
          </div>
          <span>© 2024 — Tous droits réservés</span>
        </div>
      </footer>
    </div>
  )
}
