'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, ArrowRight, Menu, X, Download, Lock } from 'lucide-react'
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
  
  // Dimensions réelles d'un PDF/livre (ratio A5 approximatif)
  // A5 = 148 x 210mm → ratio 1:1.416
  coverRatio: 210 / 148, // hauteur / largeur
  
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

// Composant Livre avec proportions PDF réelles
function BookCover({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Container avec ombre de livre réel */}
      <div className="relative w-full h-full bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-sm shadow-2xl overflow-hidden border border-white/10">
        
        {/* Image de couverture - remplit tout l'espace */}
        <Image 
          src="/cover.jpg" 
          alt="Les 7 Habitudes de la Réussite"
          fill
          className="object-cover"
          priority
        />
        
        {/* Légère ombre intérieure pour effet profondeur */}
        <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
        
        {/* Reflet subtil (comme un vrai livre brillant) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
      </div>
      
      {/* Ombre portée réaliste sous le livre */}
      <div className="absolute -bottom-2 left-4 right-4 h-4 bg-black/30 blur-lg rounded-full"></div>
    </div>
  )
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
            <Button 
              onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Acheter — {BOOK.specialPrice.toLocaleString()} {BOOK.currency}
            </Button>
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
            <Button 
              className="w-full bg-yellow-400 text-black font-semibold"
              onClick={() => {
                document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })
                setMobileMenuOpen(false)
              }}
            >
              Acheter — {BOOK.specialPrice.toLocaleString()} {BOOK.currency}
            </Button>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left - Content */}
            <div className="space-y-5 lg:space-y-6 order-2 lg:order-1">
              
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

              {/* Price + CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-gray-500 line-through text-base sm:text-lg">{BOOK.regularPrice.toLocaleString()}</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400">{BOOK.specialPrice.toLocaleString()}</span>
                  <span className="text-base sm:text-lg text-gray-300">{BOOK.currency}</span>
                </div>

                <Button 
                  size="lg"
                  onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-yellow-500/25 w-full sm:w-auto"
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Obtenir le Livre
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>

                <p className="text-xs sm:text-sm text-gray-500">
                  Paiement sécurisé • Accès immédiat
                </p>
              </div>
            </div>

            {/* Right - BOOK COVER avec proportions PDF exactes */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              
              {/* 
                Proportions réelles d'un livre/PDF:
                - Mobile: comme un livre tenu en main (~140x200px visuel)
                - Tablet: taille intermédiaire (~200x284px)  
                - Desktop: grand format (~280x396px)
                
                Ratio constant: 1:1.416 (format A5/book)
              */}
              <div className="
                w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px]
                aspect-[1/1.416]
                relative
              ">
                <BookCover className="w-full h-full" />
              </div>
            </div>
          </div>
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
              Les 7 Habitudes en détail
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {BOOK.chapters} chapitres • {BOOK.pages} pages
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
                  
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section id="achat" className="py-16 sm:py-20 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-br from-[#1a365d]/80 to-[#0d1f3c]/80 backdrop-blur-xl border border-yellow-500/20 overflow-hidden">
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            
            <CardContent className="p-6 sm:p-8 md:p-12 text-center space-y-6 sm:space-y-8">
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  Commencez votre transformation aujourd'hui
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Le guide complet pour atteindre vos objectifs et réaliser vos rêves.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3 text-base sm:text-lg">
                  <span className="text-gray-500 line-through">{BOOK.regularPrice.toLocaleString()} {BOOK.currency}</span>
                  <span className="bg-green-500/15 text-green-400 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                    -57%
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-yellow-400">
                    {BOOK.specialPrice.toLocaleString()}
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl text-gray-300">{BOOK.currency}</span>
                </div>
                
                <p className="text-gray-500 text-xs sm:text-sm">Paiement unique • Accès à vie • Téléchargement immédiat</p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-md mx-auto text-left text-xs sm:text-sm">
                {[
                  "Livre PDF complet (56 pages)",
                  "Compatible mobile & tablette",
                  "Accès illimité à vie",
                  "Paiement sécurisé MyChariow",
                  "Téléchargement instantané",
                  "Support dédié"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base sm:text-lg px-8 py-4 sm:py-5 rounded-xl shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-200"
                onClick={() => {
                  alert('Lien MyChariow bientôt disponible')
                }}
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                OBTENIR LE LIVRE MAINTENANT
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
              </Button>

              <p className="text-xs text-gray-600">
                Sécurisé • Lien MyChariow bientôt disponible
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-24 relative">
        <div class="max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "Comment je reçois le livre après paiement ?",
                a: "Une fois votre paiement confirmé via MyChariow, vous recevrez instantanément un lien de téléchargement sécurisé par email."
              },
              {
                q: "Sur quels appareils puis-je lire le livre ?",
                a: "Le livre est au format PDF, compatible avec tous les appareils : smartphone, tablette, ordinateur."
              },
              {
                q: "Le prix est vraiment à 3 000 FCFA ?",
                a: "Oui ! C'est une offre spéciale de lancement. Le prix normal est de 7 000 FCFA."
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
              <span className="font-medium">Les 7 Habitudes de la Réussite</span>
            </div>
            <span>© 2024 Tous droits réservés</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
