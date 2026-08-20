'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Lock, Eye, EyeOff, LogIn, Shield, Settings, BarChart3, Users, FileText, ArrowLeft, ExternalLink, Upload, Save, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Configuration admin sécurisée
const ADMIN_CONFIG = {
  username: 'booklydanbookstorm',
  password: 'HkqBrJG2aviNjLR8blIH' // Mot de passe sécurisé à conserver dans un gestionnaire de mots de passe
}

// Phrase d'accroche pour le panneau admin
const ADMIN_TAGLINE = "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite."

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // États pour les données du livre (à connecter à une DB plus tard)
  const [bookData, setBookData] = useState({
    title: "Les 7 Habitudes de la Réussite",
    author: "Badi Mohamed",
    regularPrice: "7000",
    specialPrice: "3000",
    tagline: "Le changement commence par une seule décision. Faites aujourd'hui le premier pas vers la réussite.",
    description: "Découvrez les secrets qui distinguent les personnes qui réussissent de celles qui restent bloquées dans leurs objectifs.",
    paymentLink: ""
  })

  const [saved, setSaved] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 600))

    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
      setIsAuthenticated(true)
      localStorage.setItem('brookly_admin_auth', 'true')
      localStorage.setItem('brookly_admin_time', Date.now().toString())
    } else {
      setError('Identifiants incorrects')
      setIsLoading(false)
    }
  }

  // Vérifier session existante (24h)
  if (typeof window !== 'undefined') {
    const auth = localStorage.getItem('brookly_admin_auth')
    const time = localStorage.getItem('brookly_admin_time')
    if (auth === 'true' && time && (Date.now() - parseInt(time)) < 24 * 60 * 60 * 1000) {
      if (!isAuthenticated) setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('brookly_admin_auth')
    localStorage.removeItem('brookly_admin_time')
    setUsername('')
    setPassword('')
  }

  const handleSave = () => {
    // Simulation de sauvegarde (à connecter à API/DB)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#facc15]/10 rounded-xl">
              <Shield className="w-6 h-6 text-[#facc15]" />
            </div>
            <h1 className="text-xl font-bold text-white">Brookly Admin</h1>
            <p className="text-sm text-gray-300">Espace de gestion du livre</p>
          </div>

          {/* Formulaire */}
          <Card className="bg-[#0d1f3c] border-white/5">
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-200 text-sm">Identifiant</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre identifiant"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#facc15]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200 text-sm">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#facc15] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#facc15] hover:bg-[#eab308] text-black font-medium py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Vérification...
                    </div>
                  ) : (
                    <>
                      <LogIn size={16} className="mr-2" />
                      Se connecter
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lien retour */}
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="w-full text-gray-300 hover:text-white"
          >
            <ArrowLeft size={14} className="mr-2" />
            Retour au site public
          </Button>
        </div>
      </div>
    )
  }

  // Dashboard Admin
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <header className="bg-[#0a1628] border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#facc15] font-bold">7</span>
            <span className="font-semibold text-white">Admin</span>
            <span className="text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded">Brookly</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="text-xs text-gray-300 hover:text-white flex items-center gap-1"
            >
              Voir le site
              <ExternalLink size={12} />
            </a>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Tagline */}
        <div className="bg-gradient-to-r from-[#facc15]/10 to-transparent border-l-2 border-[#facc15] p-4 rounded-r-lg">
          <p className="text-sm text-white italic">{ADMIN_TAGLINE}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Ventes", value: "0", icon: BarChart3 },
            { label: "Revenus", value: "0 FCFA", icon: Users },
            { label: "Visites", value: "---", icon: BookOpen },
            { label: "Conversion", value: "---", icon: Settings },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white/[0.03] border-white/5">
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon size={18} className="text-[#facc15]" />
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-300">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grid principal - Gestion complète du livre */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Informations du livre - COMPLÈTES */}
          <Card className="bg-white/[0.03] border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Settings size={16} className="text-[#facc15]" />
                Informations du livre
              </CardTitle>
              <CardDescription className="text-xs text-gray-300">
                Modifiez les informations affichées sur le site public
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              
              {/* Titre & Auteur */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-medium">Titre du livre</label>
                  <Input 
                    value={bookData.title}
                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                    className="bg-white/5 border-white/10 text-sm h-10 text-white" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-medium">Auteur</label>
                  <Input 
                    value={bookData.author}
                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                    className="bg-white/5 border-white/10 text-sm h-10 text-white" 
                  />
                </div>
              </div>

              {/* Prix */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-medium">Prix promo (FCFA)</label>
                  <Input 
                    value={bookData.specialPrice}
                    onChange={(e) => setBookData({...bookData, specialPrice: e.target.value})}
                    type="number" 
                    className="bg-white/5 border-white/10 text-sm h-10 text-white" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-medium">Prix normal (FCFA)</label>
                  <Input 
                    value={bookData.regularPrice}
                    onChange={(e) => setBookData({...bookData, regularPrice: e.target.value})}
                    type="number" 
                    className="bg-white/5 border-white/10 text-sm h-10 text-white" 
                  />
                </div>
              </div>

              {/* Phrase d'accroche */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-medium">Phrase d'accroche (tagline)</label>
                <Textarea 
                  value={bookData.tagline}
                  onChange={(e) => setBookData({...bookData, tagline: e.target.value})}
                  className="bg-white/5 border-white/10 text-sm min-h-[80px] text-white resize-none"
                  placeholder="Phrase motivatrice..."
                />
              </div>

              {/* Description principale */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-medium">Description principale</label>
                <Textarea 
                  value={bookData.description}
                  onChange={(e) => setBookData({...bookData, description: e.target.value})}
                  className="bg-white/5 border-white/10 text-sm min-h-[100px] text-white resize-none"
                  placeholder="Description du livre..."
                />
              </div>

              {/* Bouton sauvegarder */}
              <Button 
                onClick={handleSave}
                className={`w-full ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-white/10 hover:bg-white/20'} text-white text-sm h-10 transition-all`}
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Modifications sauvegardées !
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les modifications
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Fichiers du livre */}
          <Card className="bg-white/[0.03] border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <FileText size={16} className="text-[#facc15]" />
                Fichiers du livre
              </CardTitle>
              <CardDescription className="text-xs text-gray-300">
                Gérez l'image de couverture du livre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              
              {/* Couverture actuelle */}
              <div className="space-y-3">
                <label className="text-xs text-gray-300 font-medium">Image de couverture</label>
                <div className="border border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#facc15]/30 transition-colors cursor-pointer group">
                  <div className="w-24 h-32 mx-auto mb-3 bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-lg overflow-hidden flex items-center justify-center relative group-hover:scale-105 transition-transform">
                    <img src="/cover.jpg" alt="Couverture" className="w-full h-full object-cover" onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }} />
                  </div>
                  <p className="text-sm font-medium text-white mb-2">Changer l'image</p>
                  <p className="text-xs text-gray-400 mb-3">PNG, JPG jusqu'à 5MB</p>
                  <Button variant="outline" size="sm" className="border-white/20 text-xs h-8 text-white hover:bg-white/10">
                    <Upload className="w-3 h-3 mr-1" />
                    Parcourir...
                  </Button>
                </div>
              </div>


            </CardContent>
          </Card>
        </div>

        {/* Configuration paiement - INFO SEULEMENT */}
        <Card className="bg-white/[0.03] border-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Settings size={16} className="text-[#facc15]" />
              Configuration du paiement
            </CardTitle>
            <CardDescription className="text-xs text-gray-300">
              Le lien de paiement se configure directement sur MyChariow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <ExternalLink size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Configuration MyChariow</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Pour configurer le lien de paiement, rendez-vous sur votre tableau de bord MyChariow. 
                    Une fois le lien créé, collez-le ci-dessous.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="text-xs text-gray-300 font-medium">Lien de paiement MyChariow (optionnel)</label>
                <Input 
                  value={bookData.paymentLink}
                  onChange={(e) => setBookData({...bookData, paymentLink: e.target.value})}
                  placeholder="https://pay.mychariow.com/votre-lien"
                  className="bg-white/5 border-white/10 text-sm h-10 text-white"
                />
                {!bookData.paymentLink && (
                  <p className="text-xs text-yellow-400/70 flex items-center gap-1">
                    <Shield size={12} />
                    Le bouton d'achat sera désactivé tant qu'aucun lien n'est configuré
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commandes (vide pour l'instant) */}
        <Card className="bg-white/[0.03] border-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Users size={16} className="text-[#facc15]" />
              Commandes
            </CardTitle>
            <CardDescription className="text-xs text-gray-300">Les commandes apparaîtront ici une fois le paiement configuré</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-300">
              <BookOpen size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm text-white">Aucune commande pour le moment</p>
              <p className="text-xs mt-1">Configurez le lien MyChariow pour commencer à vendre</p>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  )
}
