'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Lock, Eye, EyeOff, LogIn, Shield, Settings, BarChart3, Users, FileText, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <p className="text-sm text-gray-500">Espace de gestion du livre</p>
          </div>

          {/* Formulaire */}
          <Card className="bg-[#0d1f3c] border-white/5">
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-400 text-sm">Identifiant</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre identifiant"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#facc15]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-400 text-sm">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#facc15] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
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
            className="w-full text-gray-500 hover:text-white"
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
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">Brookly</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              className="text-xs text-gray-500 hover:text-white flex items-center gap-1"
            >
              Voir le site
              <ExternalLink size={12} />
            </a>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-400"
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
          <p className="text-sm text-gray-300 italic">{ADMIN_TAGLINE}</p>
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
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Infos livre */}
          <Card className="bg-white/[0.03] border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Settings size={16} className="text-[#facc15]" />
                Informations du livre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">Titre</label>
                  <Input defaultValue="Les 7 Habitudes de la Réussite" className="bg-white/5 border-white/10 text-sm h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">Auteur</label>
                  <Input defaultValue="Votre Nom" className="bg-white/5 border-white/10 text-sm h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">Prix promo (FCFA)</label>
                  <Input defaultValue="3000" type="number" className="bg-white/5 border-white/10 text-sm h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">Prix normal (FCFA)</label>
                  <Input defaultValue="7000" type="number" className="bg-white/5 border-white/10 text-sm h-9" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-gray-500">Lien de paiement MyChariow</label>
                <Input placeholder="https://pay.mychariow.com/..." className="bg-white/5 border-white/10 text-sm h-9" />
                <p className="text-xs text-[#facc15]/70">⚠️ Non configuré — Les achats sont désactivés</p>
              </div>

              <Button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm h-9 mt-2">
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Fichiers */}
          <Card className="bg-white/[0.03] border-white/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <FileText size={16} className="text-[#facc15]" />
                Fichiers du livre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* PDF */}
              <div className="border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[#facc15]/30 transition-colors cursor-pointer">
                <FileText size={24} className="mx-auto mb-2 text-gray-500" />
                <p className="text-sm font-medium text-white">Livre PDF</p>
                <p className="text-xs text-gray-500">56 pages • 7 chapitres • ~2MB</p>
                <Button variant="outline" size="sm" className="mt-2 border-white/20 text-xs h-7">
                  Choisir un fichier
                </Button>
              </div>

              {/* Couverture */}
              <div className="border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[#facc15]/30 transition-colors cursor-pointer">
                <div className="w-20 h-28 mx-auto mb-2 bg-[#1a365d] rounded overflow-hidden flex items-center justify-center">
                  <span className="text-[10px] text-gray-500 text-center px-1">Couverture<br/>actuelle</span>
                </div>
                <p className="text-sm font-medium text-white">Image de couverture</p>
                <Button variant="outline" size="sm" className="mt-2 border-white/20 text-xs h-7">
                  Changer l'image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commandes (vide pour l'instant) */}
        <Card className="bg-white/[0.03] border-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Users size={16} className="text-[#facc15]" />
              Commandes
            </CardTitle>
            <CardDescription className="text-xs">Les commandes apparaîtront ici une fois le paiement configuré</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucune commande pour le moment</p>
              <p className="text-xs mt-1">Configurez le lien MyChariow pour commencer à vendre</p>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  )
}
