'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, ArrowRight, Menu, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

// Configuration du livre
const BOOK = {
  title: "Les 7 Habitudes de la Réussite",
  chapters: 7,
  pages: 56,
  regularPrice: 7000,
  specialPrice: 3000,
  currency: "FCFA",
  
  description: {
    hook: "Découvrez les secrets qui distinguent les personnes qui réussissent de celles qui restent bloquées dans leurs objectifs.",
    body1: "Dans « Les 7 Habitudes des Personnes qui Réussissent », vous apprendrez les comportements et les méthodes adoptés par les entrepreneurs, les leaders, les étudiants performants et les personnes qui accomplissent leurs rêves.",
    body2: "À travers 7 chapitres complets, cet eBook vous guide pas à pas pour développer la discipline, mieux gérer votre temps, fixer des objectifs clairs, apprendre efficacement, prendre soin de votre santé, construire un entourage positif et transformer les échecs en opportunités de croissance.",
    body3: "Rédigé dans un langage simple et accessible, ce guide pratique vous offre des conseils concrets que vous pourrez appliquer immédiatement dans votre vie quotidienne.",
    cta: "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite."
  },
  
  chaptersList: [
    { num: 1, title: "Être Proactif", desc: "Prenez le contrôle de votre vie" },
    { num: 2, title: "Commencer par la fin en tête", desc: "Définissez votre vision" },
    { num: 3, title: "Prioriser les priorités", desc: "Gérez votre temps efficacement" },
    { num: 4, title: "Penser Gagnant-Gagnant", desc: "Créez des relations positives" },
    { num: 5, title: "Comprendre d'abord", desc: "Écoutez activement" },
    { num: 6, title: "Synergiser", desc: "Travaillez ensemble pour plus" },
    { num: 7, title: "Aiguisez la tranchante", desc: "Renouvelez-vous continuellement" }
  ]
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-base sm:text-lg tracking-tight">
              LES <span className="text-yellow-400">7</span> HABITUDES
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#livre" className="hover:text-white transition-colors">Le Livre</a>
            <a href="#contenu" className="hover:text-white transition-colors">Contenu</a>
            <a href="#achat" className="hover:text-yellow-400 transition-colors text-yellow-400">Acheter</a>
          </div>

          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/5 p-4 space-y-3">
            <a href="#livre" className="block text-gray-300 py-2" onClick={() => setMobileMenuOpen(false)}>Le Livre</a>
            <a href="#contenu" className="block text-gray-300 py-2" onClick={() => setMobileMenuOpen(false)}>Contenu</a>
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
                <span className="text-white">LES </span>
                <span className="text-yellow-400">7</span>
                <br />
                <span className="text-white">HABITUDES</span>
                <br />
                <span className="text-gray-300 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">DE LA RÉUSSITE</span>
              </h1>

              {/* Hook */}
              <p className="text-base sm:text-lg lg:text-xl text-blue-100/80 max-w-lg leading-relaxed">
                {BOOK.description.hook}
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { icon: BookOpen, label: "Contenu Complet" },
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
                  <span className="text-gray-500 line-through text-base sm:text-lg">{BOOK.regularPrice.toLocaleString()}</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400">{BOOK.specialPrice.toLocaleString()}</span>
                  <span className="text-base sm:text-lg text-gray-300">{BOOK.currency}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Offre de lancement - {BOOK.chapters} chapitres - {BOOK.pages} pages
                </p>
              </div>
            </div>

            {/* Right - Book Cover HORIZONTAL sans fond */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group">
                
                {/* Livre horizontal - SANS FOND */}
                <div className="
                  relative
                  w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] xl:w-[520px]
                  aspect-[3/2]
                  rounded-[1.5rem] overflow-hidden
                  transform transition-transform duration-500 group-hover:scale-[1.02]
                ">
                  
                  {/* Image couverture horizontale - zoom pour cacher bords */}
                  <Image 
                    src="/cover.jpg" 
                    alt="Les 7 Habitudes de la Réussite"
                    fill
                    className="object-cover scale-105"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, 520px"
                  />
                </div>

                {/* Book info below */}
                <div className="mt-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">eBook PDF</p>
                  <p className="text-sm text-gray-400 mt-1">{BOOK.chapters} chapitres - {BOOK.pages} pages</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Defiler pour acheter</span>
          <ArrowRight className="w-4 h-4 text-yellow-400 rotate-90" />
        </div>
      </section>

      {/* ===== DESCRIPTION SECTION ===== */}
      <section id="livre" className="py-16 sm:py-20 md:py-24 relative">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="space-y-5 sm:space-y-6 text-sm sm:text-base lg:text-lg text-blue-100/80 leading-relaxed">
            <p className="text-base sm:text-lg lg:text-xl text-white font-medium">
              {BOOK.description.body1}
            </p>
            <p>{BOOK.description.body2}</p>
            <p>{BOOK.description.body3}</p>
            
            <blockquote className="border-l-4 border-yellow-500 pl-4 sm:pl-6 my-6 sm:my-8 italic text-yellow-100 text-sm sm:text-base">
              "{BOOK.description.cta}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== CHAPTERS SECTION ===== */}
      <section id="contenu" className="py-16 sm:py-20 md:py-24 relative bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
              Les 7 Habitudes en detail
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {BOOK.chapters} chapitres - {BOOK.pages} pages
            </p>
          </div>

          <div className="grid gap-2 sm:gap-3">
            {BOOK.chaptersList.map((chapter, idx) => (
              <Card key={idx} className="group bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-yellow-500/30 transition-all duration-200">
                <CardContent className="p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4">
                  
                  <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 group-hover:from-yellow-400 group-hover:to-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center text-sm sm:text-lg font-bold text-yellow-400 group-hover:text-black transition-all duration-200">
                    {chapter.num}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-white group-hover:text-yellow-400 transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm truncate">{chapter.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION - SEUL BOUTON D'ACHAT ===== */}
      <section id="achat" className="py-20 sm:py-28 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/15 via-transparent to-transparent"></div>
        
        <div className="relative max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-br from-[#1a365d]/90 to-[#0d1f3c]/90 backdrop-blur-xl border-2 border-yellow-500/30 overflow-hidden shadow-2xl shadow-yellow-500/10">
            
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            
            <CardContent className="p-8 sm:p-10 md:p-14 text-center space-y-8">
              
              {/* Header */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  Obtenez le livre maintenant
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
                  Commencez votre transformation des aujourd'hui.
                </p>
              </div>

              {/* Prix */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 text-base sm:text-lg">
                  <span className="text-gray-500 line-through">{BOOK.regularPrice.toLocaleString()} {BOOK.currency}</span>
                  <span className="bg-green-500/15 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                    -57%
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-yellow-400">
                    {BOOK.specialPrice.toLocaleString()}
                  </span>
                  <span className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium">{BOOK.currency}</span>
                </div>
                
                <p className="text-gray-500 text-sm">Paiement unique - Acces immediat a vie</p>
              </div>

              {/* Inclus */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-sm">
                {[
                  "Livre PDF complet (56 pages)",
                  "Compatible mobile & tablette",
                  "Acces illimite a vie",
                  "Paiement securise MyChariow",
                  "Telechargement instantane",
                  "Support dedie"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* BOUTON D'ACHAT UNIQUE */}
              <Button 
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg sm:text-xl px-10 py-5 sm:py-6 rounded-xl shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  // TODO: Remplacer par le vrai lien MyChariow
                  alert('Lien MyChariow bientot disponible')
                }}
              >
                <Download className="w-6 h-6 mr-3" />
                OBTENIR LE LIVRE MAINTENANT
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <p className="text-xs text-gray-600">
                Paiement securise via MyChariow
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div className="max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
              Questions frequentes
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "Comment je recois le livre apres paiement ?",
                a: "Une fois votre paiement confirme via MyChariow, vous recevrez instantanement un lien de telechargement securise par email."
              },
              {
                q: "Sur quels appareils puis-je lire le livre ?",
                a: "Le livre est au format PDF, compatible avec tous les appareils : smartphone, tablette, ordinateur."
              },
              {
                q: "Le prix est vraiment a 3 000 FCFA ?",
                a: "Oui ! C'est une offre speciale de lancement. Le prix normal est de 7 000 FCFA."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white/[0.03] border-white/10 hover:bg-white/[0.05] transition-colors">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-yellow-400/90">{faq.q}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 sm:py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">Les 7 Habitudes de la Reussite</span>
            </div>
            <span>2024 Tous droits reserves</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
