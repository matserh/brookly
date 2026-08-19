'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Lock, Eye, EyeOff, LogIn, Shield, Settings, BarChart3, Users, FileText, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Configuration admin (en production, utiliser des variables d'environnement)
const ADMIN_CONFIG = {
  username: 'admin',
  password: 'brookly2024' // À changer en production !
}

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

    // Simuler un délai de vérification
    await new Promise(resolve => setTimeout(resolve, 800))

    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      localStorage.setItem('admin_time', Date.now().toString())
    } else {
      setError('Identifiants incorrects')
      setIsLoading(false)
    }
  }

  // Vérifier si déjà authentifié
  if (typeof window !== 'undefined') {
    const auth = localStorage.getItem('admin_auth')
    const time = localStorage.getItem('admin_time')
    if (auth === 'true' && time && (Date.now() - parseInt(time)) < 24 * 60 * 60 * 1000) {
      // Session valide (24h)
      if (!isAuthenticated) setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_time')
    setUsername('')
    setPassword('')
  }

  // Formulaire de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#061020] flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <Card className="w-full max-w-md relative bg-gradient-to-br from-[#1a365d]/90 to-[#0d1f3c]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-white">Administration</CardTitle>
            <CardDescription className="text-blue-200">
              Connectez-vous pour accéder au panneau de gestion
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Nom d'utilisateur</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre identifiant"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Connexion...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard Admin (après connexion)
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#061020]">
      {/* Header */}
      <header className="bg-[#0a1628]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="font-bold text-white">Brookly Admin</h1>
                <p className="text-xs text-gray-400">Gestion du livre</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, label: "Ventes totales", value: "127", color: "from-blue-500 to-blue-600" },
            { icon: Users, label: "Acheteurs", value: "89", color: "from-green-500 to-green-600" },
            { icon: BarChart3, label: "Revenus", value: "381 000 FCFA", color: "from-yellow-500 to-yellow-600" },
            { icon: FileText, label: "Taux conversion", value: "12.4%", color: "from-purple-500 to-purple-600" }
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Livre Info */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-yellow-400" />
                Informations du livre
              </CardTitle>
              <CardDescription>Gérez les détails de votre livre</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Titre</label>
                  <Input defaultValue="Les 7 Habitudes de la Réussite" className="bg-white/5 border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Auteur</label>
                  <Input defaultValue="Votre Nom" className="bg-white/5 border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Prix (FCFA)</label>
                  <Input defaultValue="3000" type="number" className="bg-white/5 border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Prix normal</label>
                  <Input defaultValue="7000" type="number" className="bg-white/5 border-white/20" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Lien de paiement MyChariow</label>
                <Input placeholder="https://pay.mychariow.com/..." className="bg-white/5 border-white/20" />
                <p className="text-xs text-yellow-400">⚠️ Lien non configuré - Les achats ne fonctionneront pas</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Fichiers */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Gestion des fichiers
              </CardTitle>
              <CardDescription>PDF, EPUB et couverture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PDF Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-white">Livre PDF</p>
                <p className="text-sm text-gray-400 mt-1">56 pages • 7 chapitres</p>
                <Button variant="outline" size="sm" className="mt-3 border-white/20 text-white hover:bg-white/10">
                  Changer le fichier
                </Button>
              </div>

              {/* Cover Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer">
                <div className="w-24 h-32 mx-auto mb-3 bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-lg flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-center px-2 text-gray-400">Couverture<br/>actuelle</span>
                </div>
                <p className="font-medium text-white">Image de couverture</p>
                <Button variant="outline" size="sm" className="mt-3 border-white/20 text-white hover:bg-white/10">
                  Changer l'image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow-400" />
              Commandes récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-sm font-medium text-gray-400">Client</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Email</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Montant</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Statut</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: "Marie K.", email: "marie@email.com", amount: "3000 FCFA", status: "Complété", date: "19/08/2024" },
                    { name: "Ahmed B.", email: "ahmed@email.com", amount: "3000 FCFA", status: "Complété", date: "19/08/2024" },
                    { name: "Fatou D.", email: "fatou@email.com", amount: "3000 FCFA", status: "En attente", date: "18/08/2024" },
                  ].map((order, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-3 text-white">{order.name}</td>
                      <td className="py-3 text-gray-400">{order.email}</td>
                      <td className="py-3 text-white font-medium">{order.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Complété' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
