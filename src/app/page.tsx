'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, ArrowRight, Menu, X, Star, Download, Lock, Sparkles } from 'lucide-react'
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
    { num: 1, title: "Être Proactif", desc: "Prenez le contrôle de votre vie", icon: "🎯" },
    { num: 2, title: "Commencer par la fin en tête", desc: "Définissez votre vision", icon: "🔭" },
    { num: 3, title: "Prioriser les priorités", desc: "Gérez votre temps efficacement", icon: "⏰" },
    { num: 4, title: "Penser Gagnant-Gagnant", desc: "Créez des relations positives", icon: "🤝" },
    { num: 5, title: "Comprendre d'abord", desc: "Écoutez activement", icon: "👂" },
    { num: 6, title: "Synergiser", desc: "Travaillez ensemble pour plus", icon: "🚀" },
    { num: 7, title: "Aiguisez la tranchante", desc: "Renouvelez-vous continuellement", icon: "✨" }
  ],
  
  features: [
    { icon: BookOpen, title: "Contenu Complet", desc: "56 pages actionnables" },
    { icon: Download, title: "Accès Immédiat", desc: "Téléchargement instantané" },
    { icon: CheckCircle, title: "Guide Pratique", desc: "Conseils applicables" }
  ]
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#061020] text-white overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a1628]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              LES <span className="text-yellow-400">7</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#livre" className="text-gray-300 hover:text-white transition-colors">Le Livre</a>
            <a href="#contenu" className="text-gray-300 hover:text-white transition-colors">Contenu</a>
            <a href="#pourquoi" className="text-gray-300 hover:text-white transition-colors">Pourquoi</a>
            <Button 
              onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-yellow-500/25"
            >
              Obtenir le Livre
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/5 p-6 space-y-4 animate-in slide-in-from-top-4">
            <a href="#livre" className="block text-lg text-gray-200 py-2" onClick={() => setMobileMenuOpen(false)}>Le Livre</a>
            <a href="#contenu" className="block text-lg text-gray-200 py-2" onClick={() => setMobileMenuOpen(false)}>Contenu</a>
            <a href="#pourquoi" className="block text-lg text-gray-200 py-2" onClick={() => setMobileMenuOpen(false)}>Pourquoi</a>
            <Button 
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-full"
              onClick={() => {
                document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })
                setMobileMenuOpen(false)
              }}
            >
              Obtenir le Livre — {BOOK.specialPrice.toLocaleString()} {BOOK.currency}
            </Button>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left - Content */}
            <div className="space-y-8 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 text-sm font-medium text-yellow-400">
                <Sparkles className="w-4 h-4" />
                OFFRE SPÉCIALE DE LANCEMENT —57%
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">LES </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 drop-shadow-lg">7</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent">
                  HABITUDES
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent">
                  DE LA RÉUSSITE
                </span>
              </h1>

              {/* Subtitle/Hook */}
              <p className="text-lg sm:text-xl text-blue-100/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {BOOK.description.hook}
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {BOOK.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                    <feature.icon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{feature.title}</span>
                    <span className="text-xs text-gray-500 hidden sm:inline">• {feature.desc}</span>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    onClick={() => document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Obtenir le Livre Maintenant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Price */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-gray-500 line-through text-lg">{BOOK.regularPrice.toLocaleString()} {BOOK.currency}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-yellow-400">{BOOK.specialPrice.toLocaleString()}</span>
                    <span className="text-gray-300">{BOOK.currency}</span>
                  </div>
                  <span className="bg-green-500/15 text-green-400 text-xs px-2 py-1 rounded-full font-medium hidden sm:inline-block">
                    Économisez {(BOOK.regularPrice - BOOK.specialPrice).toLocaleString()} {BOOK.currency}
                  </span>
                </div>

                <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Paiement sécurisé • Accès immédiat • Garantie satisfaction
                </p>
              </div>
            </div>

            {/* Right - Book Mockup */}
            <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-cyan-500/20 rounded-[2.5rem] blur-2xl scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-[2.5rem] blur-xl scale-105"></div>
                
                {/* Phone Mockup with Book Cover */}
                <div className="relative bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
                  <div className="bg-[#0a1628] rounded-[2rem] overflow-hidden w-[280px] sm:w-[320px] aspect-[9/19] relative">
                    
                    {/* Notch */}
                    <div className="flex justify-center pt-2 pb-3">
                      <div className="w-24 h-6 bg-black rounded-full"></div>
                    </div>
                    
                    {/* Book Cover Image */}
                    <div className="px-4 pt-2">
                      <div className="rounded-xl overflow-hidden shadow-lg shadow-black/30">
                        <Image 
                          src="/cover.jpg" 
                          alt="Les 7 Habitudes de la Réussite"
                          width={280}
                          height={380}
                          className="w-full object-cover"
                          priority
                        />
                      </div>
                      
                      {/* Mini info below cover */}
                      <div className="mt-4 text-center space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">eBook Complet</p>
                        <div className="flex justify-center gap-3 text-xs text-gray-400">
                          <span>{BOOK.chapters} Chapitres</span>
                          <span>•</span>
                          <span>{BOOK.pages} Pages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-8 top-1/3 bg-[#1a365d]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl animate-pulse hidden lg:flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <div>
                    <p className="text-xs font-bold">Best-seller</p>
                    <p className="text-[10px] text-gray-400">2024</p>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-1/3 bg-[#1a365d]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl animate-pulse hidden lg:flex items-center gap-2" style={{ animationDelay: '1s' }}>
                  <Download className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs font-bold">PDF Instantané</p>
                    <p className="text-[10px] text-gray-400">Accès immédiat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ===== DESCRIPTION SECTION ===== */}
      <section id="livre" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Transformez votre <span className="text-yellow-400">vie</span> aujourd'hui
            </h2>
          </div>

          <div className="space-y-6 text-lg text-blue-100/80 leading-relaxed">
            <p className="text-xl text-white font-medium">
              {BOOK.description.body1}
            </p>
            <p>{BOOK.description.body2}</p>
            <p>{BOOK.description.body3}</p>
            
            <blockquote className="border-l-4 border-yellow-500 pl-6 my-8 italic text-yellow-100">
              "{BOOK.description.cta}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== CHAPTERS SECTION ===== */}
      <section id="contenu" className="py-24 relative bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <p className="text-yellow-400 font-medium mb-2">PROGRAMME COMPLET</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Les 7 Habitudes en détail
            </h2>
            <p className="text-blue-200/60 text-lg">
              {BOOK.chapters} chapitres • {BOOK.pages} pages • Un parcours transformationnel
            </p>
          </div>

          <div className="grid gap-4">
            {BOOK.chaptersList.map((chapter, idx) => (
              <Card key={idx} className="group bg-white/[0.03] backdrop-blur-sm border-white/10 hover:bg-white/[0.06] hover:border-yellow-500/30 transition-all duration-300 cursor-pointer">
                <CardContent className="p-5 md:p-6 flex items-center gap-5">
                  
                  {/* Number Badge */}
                  <div className="w-14 h-14 shrink-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 group-hover:from-yellow-400 group-hover:to-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-black text-yellow-400 group-hover:text-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-500/25">
                    {chapter.num}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{chapter.icon}</span>
                      <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                        {chapter.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">{chapter.desc}</p>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY SECTION ===== */}
      <section id="pourquoi" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Pourquoi ce livre va <span className="text-yellow-400">changer</span> votre vie ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Basé sur la réalité",
                desc: "Des principes prouvés par ceux qui ont réussi avant vous. Pas de théorie vide."
              },
              {
                icon: CheckCircle,
                title: "Actionnable maintenant",
                desc: "Chaque chapitre contient des exercices pratiques que vous pouvez appliquer dès aujourd'hui."
              },
              {
                icon: Star,
                title: "Transformation durable",
                desc: "Ces habitudes créent des changements profonds et permanents, pas des solutions rapides."
              }
            ].map((item, idx) => (
              <Card key={idx} className="group bg-white/[0.03] backdrop-blur-sm border-white/10 hover:bg-white/[0.06] hover:border-yellow-500/20 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400/15 to-yellow-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:from-yellow-400/25 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA / PURCHASE SECTION ===== */}
      <section id="achat" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-6">
          <Card className="bg-gradient-to-br from-[#1a365d]/80 to-[#0d1f3c]/80 backdrop-blur-xl border-2 border-yellow-500/20 overflow-hidden shadow-2xl shadow-yellow-500/5">
            
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            
            <CardContent className="p-8 md:p-14 text-center space-y-10">
              
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 text-red-400 text-sm font-bold">
                  <Lock className="w-4 h-4" />
                  OFFRE LIMITÉE DANS LE TEMPS
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                  Commencez votre<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">transformation</span> aujourd'hui
                </h2>
                
                <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
                  Ne laissez pas passer cette opportunité unique d&apos;acquérir le guide complet à prix réduit.
                </p>
              </div>

              {/* Price Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-4 text-xl">
                  <span className="text-gray-500 line-through">{BOOK.regularPrice.toLocaleString()} {BOOK.currency}</span>
                  <span className="bg-green-500/15 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                    -57%
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500">
                    {BOOK.specialPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl md:text-3xl text-gray-300 font-medium">{BOOK.currency}</span>
                </div>
                
                <p className="text-gray-500 text-sm">Paiement unique • Accès à vie • Téléchargement immédiat</p>
              </div>

              {/* What's Included */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                {[
                  "📖 Livre PDF complet (56 pages)",
                  "📱 Compatible mobile & tablette",
                  "♾️ Accès illimité à vie",
                  "🔒 Paiement sécurisé MyChariow",
                  "⚡ Téléchargement instantané",
                  "📧 Support dédié"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{item.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg px-12 py-6 rounded-full shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-[1.02]"
                onClick={() => {
                  // TODO: Replace with actual MyChariow link
                  alert('Lien MyChariow bientôt disponible')
                }}
              >
                <Download className="w-6 h-6 mr-3" />
                OBTENIR LE LIVRE MAINTENANT
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                Sécurisé • Lien MyChariow bientôt disponible
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
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
                a: "Le livre est au format PDF, compatible avec tous les appareils : smartphone, tablette, ordinateur, liseuse électronique."
              },
              {
                q: "Le prix est vraiment à 3 000 FCFA ?",
                a: "Oui ! C'est une offre spéciale de lancement. Le prix normal est de 7 000 FCFA, mais pour l'instant il est à 3 000 FCFA seulement."
              },
              {
                q: "Puis-je partager le livre ?",
                a: "Ce livre est protégé par copyright. Chaque achat est destiné à un usage personnel. Merci de respecter le travail de l'auteur."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-white/[0.03] border-white/10 hover:bg-white/[0.05] transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-yellow-400/90">{faq.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold">Les 7 Habitudes de la Réussite</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>© 2024 Tous droits réservés</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
