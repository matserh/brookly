'use client'

import { useState, useEffect } from 'react'
import { BookOpen, CheckCircle, ArrowRight, Menu, X, Download, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { getBookData, onBookDataChange, type BookData } from '@/lib/book-store'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // État dynamique - se met à jour quand l'admin modifie
  const [bookData, setBookData] = useState<BookData | null>(null)

  // Charger les données et écouter les changements
  useEffect(() => {
    // Chargement initial
    setBookData(getBookData())

    // Écouter les changements de l'admin
    const unsubscribe = onBookDataChange((data) => {
      setBookData(data)
    })

    return unsubscribe
  }, [])

  // Utiliser les données chargées ou un fallback
  const BOOK = bookData || {
    title: "Les 7 Habitudes de la Réussite",
    author: "Badi Mohamed",
    chaptersList: [
      { id: 1, title: "Être Proactif", desc: "Prenez la responsabilité de votre vie" },
      { id: 2, title: "Commencer par la fin en tête", desc: "Définissez votre vision" },
      { id: 3, title: "Placer les priorités en premier", desc: "Organisez votre temps" },
      { id: 4, title: "Penser Gagnant-Gagnant", desc: "Créez des relations gagnantes" },
      { id: 5, title: "Comprendre avant d'être compris", desc: "Écoutez vraiment" },
      { id: 6, title: "Synergizer", desc: "Combinez vos forces" },
      { id: 7, title: "Aiguisez l'outil", desc: "Renouvelez-vous continuellement" }
    ],
    regularPrice: 7000,
    specialPrice: 3000,
    currency: "FCFA",
    description: {
      hook: "Découvrez les secrets qui transforment votre vie.",
      body1: "",
      body2: "",
      body3: "",
      cta: ""
    },
    paymentLink: ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#061020] text-white">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a1628]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo-brookly.svg" alt="Brookly" width={120} height={30} className="h-7 w-auto sm:h-8" />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <a href="#livre" className="hover:text-yellow-400 transition-colors">Le Livre</a>
            <a href="#contenu" className="hover:text-yellow-400 transition-colors">Contenu</a>
            <a href="#achat" className="hover:text-yellow-400 transition-colors text-yellow-400">Acheter</a>
          </div>

          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/5 p-4 space-y-3">
            <a href="#livre" className="block text-white py-2" onClick={() => setMobileMenuOpen(false)}>Le Livre</a>
            <a href="#contenu" className="block text-white py-2" onClick={() => setMobileMenuOpen(false)}>Contenu</a>
            <a href="#achat" className="block text-yellow-400 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Acheter le livre</a>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left - Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="text-white">{BOOK.title.split(' ').slice(0, -2).join(' ')}</span>
                <br />
                <span className="text-yellow-400">{BOOK.title.split(' ').slice(-2).join(' ')}</span>
              </h1>

              {/* Hook */}
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-lg leading-relaxed">
                {BOOK.description.hook || "Transformez votre vie avec les principes de la réussite."}
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { icon: BookOpen, label: `${BOOK.chaptersList.length} Chapitres` },
                  { icon: Download, label: "Accès Immédiat" },
                  { icon: CheckCircle, label: "Guide Pratique" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                    <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="text-xs sm:text-sm">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Prix */}
              <div className="space-y-2 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-gray-400 line-through text-base sm:text-lg">{BOOK.regularPrice.toLocaleString()}</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400">{BOOK.specialPrice.toLocaleString()}</span>
                  <span className="text-base sm:text-lg text-white">{BOOK.currency}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300">
                  Offre de lancement - {BOOK.chaptersList.length} chapitres
                </p>
              </div>
            </div>

            {/* Right - Book Cover HORIZONTAL avec ANIMATION */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group">
                
                {/* Effet de brillance animée */}
                <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                </div>
                
                {/* Livre horizontal - ANIMATION FLOTTEMENT */}
                <div className="
                  relative
                  w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] xl:w-[520px]
                  aspect-[3/2]
                  rounded-[1.5rem] overflow-hidden
                  animate-float
                  shadow-2xl shadow-yellow-500/20
                  transform transition-all duration-500 group-hover:scale-[1.05] group-hover:shadow-yellow-500/40
                ">
                  
                  {/* Image couverture horizontale */}
                  <Image 
                    src={BOOK.coverImage || "/cover.jpg"} 
                    alt={BOOK.title}
                    fill
                    className="object-cover scale-105"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, 520px"
                  />
                </div>

                {/* Book info below */}
                <div className="mt-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-gray-300 font-semibold">eBook PDF</p>
                  <p className="text-sm text-white mt-1">{BOOK.chaptersList.length} chapitres</p>
                  <p className="text-xs text-gray-400 mt-1">Par {BOOK.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs text-gray-300">Défiler pour acheter</span>
          <ArrowRight className="w-4 h-4 text-yellow-400 rotate-90" />
        </div>
      </section>

      {/* ===== DESCRIPTION SECTION ===== */}
      <section id="livre" className="py-16 sm:py-20 md:py-24 relative">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="space-y-5 sm:space-y-6 text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed">
            {BOOK.description.body1 && (
              <p className="text-base sm:text-lg lg:text-xl text-white font-medium">
                {BOOK.description.body1}
              </p>
            )}
            {BOOK.description.body2 && <p>{BOOK.description.body2}</p>}
            {BOOK.description.body3 && <p>{BOOK.description.body3}</p>}
            
            {BOOK.description.cta && (
              <blockquote className="border-l-4 border-yellow-500 pl-4 sm:pl-6 my-6 sm:my-8 italic text-yellow-100 text-sm sm:text-base">
                "{BOOK.description.cta}"
              </blockquote>
            )}
            
            {/* Auteur */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-300">
                <span className="text-white font-medium">Auteur :</span> {BOOK.author}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHAPTERS SECTION - DESIGN PREMIUM ===== */}
      <section id="contenu" className="py-20 sm:py-28 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>
        
        <div className="relative max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header amélioré */}
          <div className="text-center mb-14 sm:mb-16 md:mb-20">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-yellow-400 font-semibold mb-3">Programme complet</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Les {BOOK.chaptersList.length} Habitudes qui
              <br />
              <span className="text-yellow-400">transforment votre vie</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Une méthode éprouvée, étape par étape, pour atteindre vos objectifs
            </p>
          </div>

          {/* Grille de chapitres - Design premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {BOOK.chaptersList.map((chapter, idx) => (
              <div 
                key={chapter.id || idx} 
                className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-yellow-500/40 rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1"
              >
                
                <div className="flex items-start gap-4">
                  {/* Numéro visible */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black text-black shadow-lg shadow-yellow-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {(idx + 1).toString()}
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{chapter.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note bas de section */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-sm text-gray-300">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Formation complète avec exercices pratiques
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION - DESIGN PREMIUM ===== */}
      <section id="achat" className="py-24 sm:py-32 md:py-40 relative overflow-hidden">
        {/* Background effets */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Carte principale */}
          <div className="relative bg-gradient-to-br from-[#1a365d]/95 via-[#0d1f3c]/95 to-[#1a365d]/95 backdrop-blur-2xl border-2 border-yellow-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/20">
            
            {/* Décoration top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
              
              {/* Grid layout 2 colonnes */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                
                {/* Left - Info & Prix */}
                <div className="space-y-8 text-left">
                  
                  {/* Badge offre spéciale */}
                  <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                    <CheckCircle className="w-4 h-4" />
                    OFFRE SPÉCIALE DE LANCEMENT
                  </div>
                  
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                      Commencez votre
                      <br />
                      <span className="text-yellow-400">transformation</span>
                      <br />
                      dès aujourd'hui
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Rejoignez des milliers de personnes qui ont transformé leur vie.
                    </p>
                  </div>

                  {/* Prix */}
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl text-gray-400 line-through">{BOOK.regularPrice.toLocaleString()} {BOOK.currency}</span>
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                        -{Math.round(((BOOK.regularPrice - BOOK.specialPrice) / BOOK.regularPrice) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl sm:text-7xl font-black text-yellow-400">
                        {BOOK.specialPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl sm:text-3xl text-white font-semibold">{BOOK.currency}</span>
                    </div>
                    <p className="text-sm text-gray-400">Paiement unique - Accès immédiat à vie</p>
                  </div>

                  {/* Liste inclus */}
                  <div className="space-y-3">
                    {[
                      { icon: BookOpen, text: `Livre PDF (${BOOK.chaptersList.length} chapitres)` },
                      { icon: Download, text: "Téléchargement instantané" },
                      { icon: CheckCircle, text: "Accès illimité à vie" },
                      { icon: CheckCircle, text: "Compatible tous appareils" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white">
                        <item.icon className="w-5 h-5 text-yellow-400 shrink-0" />
                        <span className="text-sm sm:text-base">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Bouton CTA & Garantie */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  
                  {/* Bouton principal */}
                  <Button 
                    className="
                      w-full max-w-sm
                      bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 
                      hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500
                      text-black font-black text-lg sm:text-xl py-6 sm:py-7 rounded-2xl 
                      shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 
                      transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]
                      flex flex-col items-center justify-center gap-2
                      animate-pulse-glow
                      relative overflow-hidden
                      group/btn
                    "
                    onClick={() => {
                      if (BOOK.paymentLink) {
                        window.open(BOOK.paymentLink, '_blank')
                      } else {
                        alert('Lien de paiement bientôt disponible')
                      }
                    }}
                  >
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-out rounded-2xl"></span>
                    
                    <Download className="w-7 h-7 relative z-10" />
                    <span className="whitespace-nowrap relative z-10 text-xl">OBTENIR LE LIVRE</span>
                    <ArrowRight className="w-6 h-6 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Paiement sécurisé</span>
                    <span>|</span>
                    <span>Livraison instantanée</span>
                  </div>

                  {/* Mini garantie */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center max-w-sm">
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-white">Garantie satisfaction :</strong> Si le livre ne correspond pas à vos attentes, contactez-nous sous 48h à 
                      <a href="mailto:aeronscriptlabs@gmail.com" className="text-yellow-400 hover:text-yellow-300 underline ml-1">aeronscriptlabs@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "Comment je reçois le livre après paiement ?",
                a: "Une fois votre paiement confirmé, vous recevrez instantanément un lien de téléchargement sécurisé par email."
              },
              {
                q: "Sur quels appareils puis-je lire le livre ?",
                a: "Le livre est au format PDF, compatible avec tous les appareils : smartphone, tablette, ordinateur."
              },
              {
                q: `Le prix est vraiment à ${BOOK.specialPrice.toLocaleString()} ${BOOK.currency} ?`,
                a: `Oui ! C'est une offre spéciale de lancement. Le prix normal est de ${BOOK.regularPrice.toLocaleString()} ${BOOK.currency}.`
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white/[0.03] border-white/10 hover:bg-white/[0.05] transition-colors">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-yellow-400/90">{faq.q}</h3>
                  <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 sm:py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Image src="/logo-brookly.svg" alt="Brookly" width={80} height={20} className="h-5 w-auto opacity-80" />
            </div>
            <span>© 2026 Brookly - Tous droits réservés</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
