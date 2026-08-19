'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, Star, Users, Clock, Download, Lock, ArrowRight, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Configuration du livre
const BOOK_CONFIG = {
  title: "Les 7 Habitudes de la Réussite",
  subtitle: "Le guide pratique pour transformer votre vie",
  author: "Votre Nom",
  chapters: 7,
  pages: 56,
  regularPrice: 7000,
  specialPrice: 3000,
  currency: "FCFA",
  tagline: "Un guide pratique pour atteindre VOS objectifs et réaliser VOS rêves",
  features: [
    { icon: BookOpen, title: "Contenu Complet", desc: "Formation pas à pas" },
    { icon: Download, title: "Accès Immédiat", desc: "Téléchargement instantané" },
    { icon: CheckCircle, title: "Guide Pratique", desc: "Conseils simples et efficaces" }
  ],
  chaptersList: [
    "Chapitre 1: Être Proactif - Prenez le contrôle de votre vie",
    "Chapitre 2: Commencer par la fin en tête - Définissez votre vision",
    "Chapitre 3: Prioriser les priorités - Gérez votre temps efficacement",
    "Chapitre 4: Penser Gagnant-Gagnant - Créez des relations positives",
    "Chapitre 5: Comprendre d'abord, être compris ensuite - Écoutez activement",
    "Chapitre 6: Synergiser - Travaillez ensemble pour plus de résultats",
    "Chapitre 7: Aiguisez la tranchante - Renouvelez-vous continuellement"
  ],
  testimonials: [
    { name: "Marie K.", text: "Ce livre a transformé ma façon de voir les objectifs. Je recommande à 100% !", rating: 5 },
    { name: "Ahmed B.", text: "7 chapitres d'or. Chaque page apporte une valeur concrète.", rating: 5 },
    { name: "Fatou D.", text: "Après lecture, j'ai complètement changé mes habitudes quotidiennes.", rating: 5 }
  ]
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for navbar
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#061020] text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                {BOOK_CONFIG.title.split(' ')[0]} {BOOK_CONFIG.title.split(' ')[1]}
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#apropos" className="hover:text-yellow-400 transition-colors">À Propos</a>
              <a href="#contenu" className="hover:text-yellow-400 transition-colors">Contenu</a>
              <a href="#temoignages" className="hover:text-yellow-400 transition-colors">Témoignages</a>
              <Button 
                onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-2 rounded-full"
              >
                Acheter Maintenant
              </Button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#0a1628]/98 backdrop-blur-md rounded-lg mt-2 p-4 space-y-4">
              <a href="#apropos" className="block hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>À Propos</a>
              <a href="#contenu" className="block hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>Contenu</a>
              <a href="#temoignages" className="block hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>Témoignages</a>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold"
                onClick={() => {
                  document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
              >
                Acheter Maintenant
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 text-yellow-400 text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                OFFRE LIMITÉE -50%
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="text-white">LES </span>
                <span className="text-yellow-400">7</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  HABITUDES
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  DE LA RÉUSSITE
                </span>
              </h1>

              <p className="text-xl text-blue-200 max-w-lg mx-auto lg:mx-0">
                {BOOK_CONFIG.tagline}
              </p>

              {/* Features pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {BOOK_CONFIG.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    <feature.icon className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">{feature.title}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Obtenir le Livre - {BOOK_CONFIG.specialPrice.toLocaleString()} {BOOK_CONFIG.currency}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Price info */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm">
                <span className="text-gray-400 line-through">{BOOK_CONFIG.regularPrice.toLocaleString()} {BOOK_CONFIG.currency}</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                  Économisez {(BOOK_CONFIG.regularPrice - BOOK_CONFIG.specialPrice).toLocaleString()} {BOOK_CONFIG.currency}
                </span>
              </div>
            </div>

            {/* Right content - Book mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-3xl scale-110"></div>
                
                {/* Phone mockup */}
                <div className="relative bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                  <div className="bg-[#0a1628] rounded-[2.5rem] overflow-hidden w-[280px] sm:w-[320px] aspect-[9/19]">
                    {/* Phone notch */}
                    <div className="flex justify-center pt-2 pb-4">
                      <div className="w-24 h-6 bg-black rounded-full"></div>
                    </div>
                    
                    {/* Book cover on phone */}
                    <div className="px-4 space-y-4">
                      <div className="text-center space-y-2">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">LES</p>
                        <h2 className="text-5xl font-black text-yellow-400">7</h2>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white leading-tight">
                        HABITUDES<br/>DE LA<br/>RÉUSSITE
                      </h3>
                      
                      {/* Mini silhouette */}
                      <div className="flex justify-center py-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-t from-blue-900 to-transparent rounded-t-full opacity-60"></div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-gray-800 rounded-t-full"></div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-center text-blue-200 leading-relaxed px-2">
                        UN GUIDE PRATIQUE POUR ATTEINDRE <span className="text-yellow-400">VOS OBJECTIFS</span> ET RÉALISER <span className="text-yellow-400">VOS RÊVES</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-4 top-1/4 bg-[#1a365d]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3 shadow-xl animate-pulse hidden sm:block">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-xs font-bold">+500 lecteurs</p>
                      <p className="text-[10px] text-gray-400">satisfaits</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/4 bg-[#1a365d]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3 shadow-xl animate-pulse hidden sm:block" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-xs font-bold">56 Pages</p>
                      <p className="text-[10px] text-gray-400">de contenu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/40" />
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Pourquoi ce <span className="text-yellow-400">livre va changer</span> votre vie ?
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Découvrez les 7 habitudes fondamentales qui séparent les personnes ordinaires de celles qui réussissent extraordinaires.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Basé sur la recherche",
                desc: "Des principes prouvés par des années d'étude sur le succès et le développement personnel."
              },
              {
                icon: CheckCircle,
                title: "Actionnable immédiatement",
                desc: "Chaque chapitre contient des exercices pratiques que vous pouvez appliquer dès aujourd'hui."
              },
              {
                icon: Star,
                title: "Résultats durables",
                desc: "Ces habitudes ne sont pas des solutions rapides, mais des transformations profondes et permanentes."
              }
            ].map((item, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-yellow-500/30 transition-all group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-blue-200">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content/Chapters Section */}
      <section id="contenu" className="py-20 relative bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ce que vous allez <span className="text-yellow-400">apprendre</span>
            </h2>
            <p className="text-xl text-blue-200">
              {BOOK_CONFIG.chapters} chapitres • {BOOK_CONFIG.pages} pages • Un voyage transformationnel
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {BOOK_CONFIG.chaptersList.map((chapter, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-yellow-500/30 hover:bg-white/10 transition-all group cursor-pointer">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors">
                      {chapter.split(':')[0]}
                    </h3>
                    <p className="text-blue-200">
                      {chapter.split(':')[1]?.trim()}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ce que disent nos <span className="text-yellow-400">lecteurs</span>
            </h2>
            <p className="text-xl text-blue-200">
              Rejoignez des centaines de personnes qui ont transformé leur vie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BOOK_CONFIG.testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-yellow-500/30 transition-all">
                <CardContent className="p-8 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">Lecteur satisfait</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Purchase Section */}
      <section id="achat" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] border-2 border-yellow-500/30 overflow-hidden">
            {/* Header glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 text-red-400 text-sm font-bold animate-pulse">
                  <Clock className="w-4 h-4" />
                  OFFRE LIMITÉE DANS LE TEMPS
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                  Commencez votre <span className="text-yellow-400">transformation</span> aujourd'hui
                </h2>
                
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                  Ne laissez pas passer cette opportunité unique d&apos;acquérir le guide complet à prix réduit.
                </p>
              </div>

              {/* Price display */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-2xl">
                  <span className="text-gray-400 line-through">{BOOK_CONFIG.regularPrice.toLocaleString()} {BOOK_CONFIG.currency}</span>
                  <span className="text-green-400 font-bold">(-57%)</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl sm:text-7xl font-black text-yellow-400">
                    {BOOK_CONFIG.specialPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-300">{BOOK_CONFIG.currency}</span>
                </div>
                
                <p className="text-gray-400">Paiement unique • Accès à vie • Téléchargement immédiat</p>
              </div>

              {/* What's included */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  "📖 Livre PDF complet (56 pages)",
                  "📱 Compatible mobile & tablette",
                  "♾️ Accès illimité à vie",
                  "🔒 Paiement sécurisé",
                  "⚡ Téléchargement instantané",
                  "📧 Support dédié"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-left">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{item.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-xl px-12 py-6 rounded-full shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  // TODO: Replace with actual MyChariow payment link
                  window.open('#', '_blank')
                }}
              >
                <Lock className="w-6 h-6 mr-3" />
                OBTENIR LE LIVRE MAINTENANT
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <p className="text-sm text-gray-400">
                🔒 Sécurisé • Lien MyChariow bientôt disponible
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Questions <span className="text-yellow-400">fréquentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment je reçois le livre après paiement ?",
                a: "Une fois votre paiement confirmé via MyChariow, vous recevrez instantanément un lien de téléchargement sécurisé par email."
              },
              {
                q: "Sur quels appareils puis-je lire le livre ?",
                a: "Le livre est au format PDF, compatible avec tous les appareils : smartphone, tablette, ordinateur, liseuse."
              },
              {
                q: "Le prix est-il vraiment à 3000 FCFA ?",
                a: "Oui ! C'est une offre limitée. Le prix normal est de 7000 FCFA, mais pour l'instant il est à 3000 FCFA seulement."
              },
              {
                q: "Puis-je partager le livre avec d'autres personnes ?",
                a: "Ce livre est protégé par copyright. Chaque achat est destiné à un usage personnel. Merci de respecter le travail de l'auteur."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-yellow-400">{faq.q}</h3>
                  <p className="text-blue-200">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              <span className="font-bold">Les 7 Habitudes de la Réussite</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2024 Tous droits réservés</span>
              <span>•</span>
              <span>Contact: contact@exemple.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
