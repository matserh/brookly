'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, Lock, Eye, EyeOff, LogIn, Shield, Settings, 
  BarChart3, Users, ArrowLeft, ExternalLink, Upload, Save, 
  CheckCircle, Image, PenLine, CreditCard, Package, LogOut,
  Sparkles, ChevronRight, AlertCircle, Plus, Trash2, GripVertical,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getBookData, saveBookData, resetBookData, onBookDataChange, type BookData, type Habit } from '@/lib/book-store'

// Configuration admin sécurisée
const ADMIN_CONFIG = {
  username: 'booklydanbookstorm',
  password: 'HkqBrJG2aviNjLR8blIH'
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState<'book' | 'habits' | 'cover' | 'payment'>('book')
  const [resetConfirm, setResetConfirm] = useState(false)

  // États pour les données du livre - chargés depuis le store
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    regularPrice: 0,
    specialPrice: 0,
    currency: "FCFA",
    tagline: "",
    description: { hook: "", body1: "", body2: "", body3: "", cta: "" },
    chaptersList: [],
    paymentLink: ""
  })

  // État local pour les habitudes (avant sauvegarde)
  const [chaptersList, setChaptersList] = useState<Habit[]>([])

  // Nouvelle habitude
  const [newHabit, setNewHabit] = useState({ title: "", desc: "" })

  // État pour la couverture
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  // Charger les données au montage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = getBookData()
      setBookData(data)
      setChaptersList(data.chaptersList)

      // Écouter les changements (si modifié ailleurs)
      const unsubscribe = onBookDataChange((newData) => {
        setBookData(newData)
        setChaptersList(newData.chaptersList)
      })
      
      return unsubscribe
    }
  }, [])

  // Vérifier session existante au chargement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('brookly_admin_auth')
      const time = localStorage.getItem('brookly_admin_time')
      if (auth === 'true' && time && (Date.now() - parseInt(time)) < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 800))

    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
      setIsAuthenticated(true)
      localStorage.setItem('brookly_admin_auth', 'true')
      localStorage.setItem('brookly_admin_time', Date.now().toString())
    } else {
      setError('Identifiants incorrects')
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('brookly_admin_auth')
    localStorage.removeItem('brookly_admin_time')
    setUsername('')
    setPassword('')
  }

  // VRAIE sauvegarde - persiste dans localStorage et notifie la page publique
  const handleSave = () => {
    // Sauvegarder toutes les données
    const dataToSave = {
      ...bookData,
      chaptersList: chaptersList,
      regularPrice: typeof bookData.regularPrice === 'string' ? parseInt(bookData.regularPrice) || 0 : bookData.regularPrice,
      specialPrice: typeof bookData.specialPrice === 'string' ? parseInt(bookData.specialPrice) || 0 : bookData.specialPrice
    }
    
    saveBookData(dataToSave)
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Réinitialiser aux valeurs par défaut
  const handleReset = () => {
    if (resetConfirm) {
      const defaultData = resetBookData()
      setBookData(defaultData)
      setChaptersList(defaultData.chaptersList)
      setResetConfirm(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      setResetConfirm(true)
      // Auto-cache après 5 secondes
      setTimeout(() => setResetConfirm(false), 5000)
    }
  }

  // Gestion des habitudes
  const addHabit = () => {
    if (newHabit.title.trim() && newHabit.desc.trim()) {
      const newId = chaptersList.length > 0 ? Math.max(...chaptersList.map(h => h.id)) + 1 : 1
      setChaptersList([...chaptersList, { id: newId, title: newHabit.title.trim(), desc: newHabit.desc.trim() }])
      setNewHabit({ title: "", desc: "" })
    }
  }

  const removeHabit = (id: number) => {
    setChaptersList(chaptersList.filter(h => h.id !== id))
  }

  const updateHabit = (id: number, field: 'title' | 'desc', value: string) => {
    setChaptersList(chaptersList.map(h => h.id === id ? { ...h, [field]: value } : h))
  }

  // Gestion de l'upload de couverture
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image (JPG ou PNG)')
        return
      }
      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB')
        return
      }
      // Créer un aperçu
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
        setCoverFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverSave = async () => {
    if (coverPreview) {
      // Sauvegarder l'image en base64 dans le store
      saveBookData({ coverImage: coverPreview })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  // Page de connexion - Design premium
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg shadow-yellow-500/30 mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Brookly <span className="text-yellow-400">Admin</span>
            </h1>
            <p className="text-sm text-gray-400">
              Espace de gestion sécurisé
            </p>
          </div>

          {/* Carte de connexion */}
          <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleLogin} className="space-y-5">
                
                {/* Identifiant */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <PenLine size={14} className="text-yellow-400" />
                    Identifiant
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre identifiant"
                    className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 focus:ring-yellow-400/20 h-12 rounded-xl transition-all"
                    required
                  />
                </div>

                {/* Mot de passe */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <Lock size={14} className="text-yellow-400" />
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 focus:ring-yellow-400/20 h-12 rounded-xl pr-12 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Erreur */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-pulse">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                {/* Bouton connexion */}
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="
                    w-full 
                    bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 
                    hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500
                    text-black font-bold text-base py-3.5 rounded-xl
                    shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40
                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    relative overflow-hidden group
                  "
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  {isLoading ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Vérification...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <LogIn size={18} />
                      Se connecter
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lien retour */}
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="w-full mt-6 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour au site public
          </Button>

          {/* Footer info */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Connexion sécurisée • Session 24h
          </p>
        </div>
      </div>
    )
  }

  // Dashboard Admin - Design premium complet
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] overflow-x-hidden">
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/3 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px]"></div>
      </div>

      {/* Header premium */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1628]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <span className="text-black font-black text-lg">7</span>
              </div>
              <div>
                <span className="font-bold text-white">Admin</span>
                <span className="hidden sm:inline text-xs text-gray-400 ml-2">Brookly</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <a 
                href="/" 
                target="_blank" 
                className="hidden sm:flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
              >
                Voir le site
                <ExternalLink size={12} />
              </a>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome banner */}
        <div className="relative bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative">
            <h2 className="text-lg font-bold text-white mb-1">Bienvenue dans l'espace de gestion</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Gérez les informations de votre livre, les habitudes et configurez le paiement. Les modifications sont appliquées instantanément sur le site public.
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/5 overflow-x-auto scrollbar-hide">
          {[
            { id: 'book' as const, icon: BookOpen, label: 'Informations' },
            { id: 'habits' as const, icon: Sparkles, label: 'Habitudes' },
            { id: 'cover' as const, icon: Image, label: 'Couverture' },
            { id: 'payment' as const, icon: CreditCard, label: 'Paiement' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0
                ${activeSection === tab.id 
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeSection === 'book' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main form */}
            <Card className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm border-white/5 hover:border-white/10 transition-colors">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                    <Settings size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-white">
                  Informations du livre
                </CardTitle>
                <CardDescription className="text-xs text-gray-400 mt-0.5">
                  Modifiez les données affichées sur le site public
                </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Titre & Auteur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                      <PenLine size={12} className="text-yellow-400" />
                      Titre du livre
                    </label>
                    <Input 
                      value={bookData.title}
                      onChange={(e) => setBookData({...bookData, title: e.target.value})}
                      className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 h-11 rounded-xl transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                      <Users size={12} className="text-yellow-400" />
                      Auteur
                    </label>
                    <Input 
                      value={bookData.author}
                      onChange={(e) => setBookData({...bookData, author: e.target.value})}
                      className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 h-11 rounded-xl transition-all" 
                    />
                  </div>
                </div>

                {/* Prix */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Package size={12} className="text-yellow-400" />
                    Tarification (FCFA)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Input 
                        value={bookData.specialPrice}
                        onChange={(e) => setBookData({...bookData, specialPrice: e.target.value})}
                        type="number" 
                        className="bg-white/[0.05] border-white/10 text-white focus:border-green-400/50 h-11 rounded-xl pl-4 pr-16 transition-all" 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-md">
                        Promo
                      </span>
                    </div>
                    <div className="relative">
                      <Input 
                        value={bookData.regularPrice}
                        onChange={(e) => setBookData({...bookData, regularPrice: e.target.value})}
                        type="number" 
                        className="bg-white/[0.05] border-white/10 text-white focus:border-gray-400/50 h-11 rounded-xl pl-4 pr-16 transition-all" 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold bg-white/10 px-2 py-1 rounded-md">
                        Normal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phrase d'accroche */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={12} className="text-yellow-400" />
                    Phrase d'accroche
                  </label>
                  <Textarea 
                    value={bookData.tagline}
                    onChange={(e) => setBookData({...bookData, tagline: e.target.value})}
                    className="bg-white/[0.05] border-white/10 text-white min-h-[90px] resize-none focus:border-yellow-400/50 rounded-xl transition-all"
                    placeholder="Phrase motivatrice qui accroche..."
                  />
                </div>

                {/* Description principale */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                    <BookOpen size={12} className="text-yellow-400" />
                    Description (hook)
                  </label>
                  <Textarea 
                    value={typeof bookData.description === 'string' ? bookData.description : bookData.description?.hook || ''}
                    onChange={(e) => setBookData({
                      ...bookData, 
                      description: typeof bookData.description === 'string' 
                        ? e.target.value 
                        : { ...bookData.description, hook: e.target.value }
                    })}
                    className="bg-white/[0.05] border-white/10 text-white min-h-[110px] resize-none focus:border-yellow-400/50 rounded-xl transition-all"
                    placeholder="Description courte qui accroche..."
                  />
                </div>

                {/* Bouton sauvegarder */}
                <Button 
                  onClick={handleSave}
                  className={`
                    w-full h-12 rounded-xl font-semibold text-base transition-all duration-300
                    ${saved 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98]'
                    }
                    relative overflow-hidden group
                  `}
                >
                  <span className={`absolute inset-0 ${!saved ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700' : ''}`}></span>
                  {saved ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <CheckCircle className="w-5 h-5" />
                      Modifications sauvegardées !
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <Save className="w-5 h-5" />
                      Sauvegarder les modifications
                    </div>
                  )}
                </Button>

                {/* Bouton réinitialiser */}
                <Button 
                  onClick={handleReset}
                  className={`
                    w-full h-11 rounded-xl font-semibold text-sm transition-all duration-300
                    ${resetConfirm 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30'
                    }
                  `}
                >
                  {resetConfirm ? (
                    <span className="flex items-center gap-2">
                      <AlertCircle size={16} />
                      Confirmer la réinitialisation ?
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <RotateCcw size={16} />
                      Réinitialiser aux valeurs par défaut
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview card */}
            <Card className="bg-white/[0.03] backdrop-blur-sm border-white/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Eye size={14} className="text-yellow-400" />
                  Aperçu en temps réel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-[#1a365d]/50 to-[#0d1f3c]/50 rounded-xl p-5 border border-white/5 space-y-4">
                  
                  {/* Mini book preview */}
                  <div className="aspect-[3/2] bg-gradient-to-br from-[#0d1f3c] to-[#1a365d] rounded-lg overflow-hidden relative">
                    <img src="/cover.jpg" alt="Preview" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm line-clamp-1">{bookData.title}</p>
                      <p className="text-gray-300 text-xs">{bookData.author}</p>
                    </div>
                  </div>

                  {/* Info preview */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prix promo</span>
                      <span className="text-green-400 font-bold">{bookData.specialPrice} FCFA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prix normal</span>
                      <span className="text-gray-300 line-through">{bookData.regularPrice} FCFA</span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-gray-400 text-xs mb-1">Accroche :</p>
                      <p className="text-white text-xs line-clamp-2 italic">{bookData.tagline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'habits' && (
          <Card className="bg-white/[0.03] backdrop-blur-sm border-white/5">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-white">
                      Gestion des habitudes
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400 mt-0.5">
                      {chaptersList.length} habitude{chaptersList.length > 1 ? 's' : ''} configurée{chaptersList.length > 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Liste des habitudes */}
              <div className="space-y-3">
                {chaptersList.map((habit, index) => (
                  <div 
                    key={habit.id}
                    className="group bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:border-yellow-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {/* Numéro */}
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                        {index + 1}
                      </div>
                      
                      {/* Contenu éditable */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <Input 
                          value={habit.title}
                          onChange={(e) => updateHabit(habit.id, 'title', e.target.value)}
                          className="bg-white/[0.05] border-white/10 text-white text-sm h-9 font-medium focus:border-yellow-400/50"
                          placeholder="Titre de l'habitude"
                        />
                        <Input 
                          value={habit.desc}
                          onChange={(e) => updateHabit(habit.id, 'desc', e.target.value)}
                          className="bg-white/[0.05] border-white/10 text-gray-300 text-xs h-8 focus:border-yellow-400/50"
                          placeholder="Description courte..."
                        />
                      </div>

                      {/* Bouton supprimer */}
                      <button
                        onClick={() => removeHabit(habit.id)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter une habitude */}
              <div className="border border-dashed border-white/10 rounded-xl p-4 hover:border-yellow-500/30 transition-colors">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Plus size={12} className="text-yellow-400" />
                  Ajouter une habitude
                </p>
                <div className="space-y-3">
                  <Input 
                    value={newHabit.title}
                    onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
                    placeholder="Titre de la nouvelle habitude"
                    className="bg-white/[0.05] border-white/10 text-white text-sm h-10 focus:border-yellow-400/50"
                    onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                  />
                  <Input 
                    value={newHabit.desc}
                    onChange={(e) => setNewHabit({...newHabit, desc: e.target.value})}
                    placeholder="Description courte..."
                    className="bg-white/[0.05] border-white/10 text-gray-300 text-sm h-10 focus:border-yellow-400/50"
                    onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                  />
                  <Button 
                    onClick={addHabit}
                    disabled={!newHabit.title.trim() || !newHabit.desc.trim()}
                    className="w-full bg-white/5 hover:bg-yellow-400/10 text-white hover:text-yellow-400 border border-white/10 hover:border-yellow-500/30 h-10 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} className="mr-2" />
                    Ajouter cette habitude
                  </Button>
                </div>
              </div>

              {/* Info */}
              <p className="text-xs text-gray-500 text-center">
                Appuyez sur Entrée ou cliquez sur le bouton pour ajouter. Aucune limite de nombre.
              </p>
            </CardContent>
          </Card>
        )}

        {activeSection === 'cover' && (
          <Card className="bg-white/[0.03] backdrop-blur-sm border-white/5 max-w-2xl mx-auto">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Image size={18} className="text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    Image de couverture
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400 mt-0.5">
                    Changez l'image affichée sur le site
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Zone d'upload */}
              <div 
                className="border border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-yellow-500/30 transition-all group bg-white/[0.02] cursor-pointer"
                onClick={() => document.getElementById('cover-upload')?.click()}
              >
                {/* Aperçu de l'image */}
                <div className="w-48 h-32 mx-auto mb-5 bg-gradient-to-br from-[#1a365d] to-[#0d1f3c] rounded-xl overflow-hidden shadow-xl shadow-black/20 group-hover:scale-105 transition-transform duration-300 relative">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Nouvelle couverture" className="w-full h-full object-cover" />
                  ) : (
                    <img src="/cover.jpg" alt="Couverture actuelle" className="w-full h-full object-cover" />
                  )}
                  {coverPreview && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                      Nouveau
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <p className="text-white font-medium">
                    {coverPreview ? 'Nouvelle image sélectionnée' : 'Couverture actuelle'}
                  </p>
                  <p className="text-xs text-gray-400">Format recommandé : 600 x 400px (ratio 3:2)</p>
                  
                  <div className="pt-3">
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 hover:border-yellow-500/40 gap-2 rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById('cover-upload')?.click()
                      }}
                    >
                      <Upload size={16} />
                      {coverPreview ? 'Changer l\'image' : 'Parcourir...'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Info sélection */}
              {coverFile && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 space-y-3">
                  <p className="text-green-300 text-sm font-medium flex items-center gap-2">
                    <CheckCircle size={16} />
                    Image prête à être sauvegardée
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{coverFile.name}</span>
                    <span>{(coverFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <Button 
                    onClick={handleCoverSave}
                    className={`w-full h-11 rounded-xl font-semibold transition-all ${
                      saved 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black hover:scale-[1.02]'
                    }`}
                  >
                    {saved ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle size={16} />
                        Sauvegardée !
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save size={16} />
                        Appliquer cette couverture
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {/* Info box */}
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <AlertCircle size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">Note importante</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    L&apos;image doit être en format JPG, PNG ou WebP, poids maximum 5MB. La couverture s&apos;affiche horizontalement sur le site.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'payment' && (
          <Card className="bg-white/[0.03] backdrop-blur-sm border-white/5 max-w-2xl mx-auto">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <CreditCard size={18} className="text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-white">
                    Configuration du paiement
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400 mt-0.5">
                    Le lien MyChariow gère automatiquement la livraison du PDF
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* MyChariow info */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                    <ExternalLink size={22} className="text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">Intégration MyChariow</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Configurez votre lien de paiement directement depuis votre tableau de bord MyChariow. Une fois créé, collez-le ci-dessous pour activer les achats.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input lien */}
              <div className="space-y-2">
                <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={12} className="text-yellow-400" />
                  Lien de paiement MyChariow
                </label>
                <Input 
                  value={bookData.paymentLink}
                  onChange={(e) => setBookData({...bookData, paymentLink: e.target.value})}
                  placeholder="https://pay.mychariow.com/votre-lien-paiement"
                  className="bg-white/[0.05] border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 h-12 rounded-xl transition-all"
                />
              </div>

              {/* Status */}
              {!bookData.paymentLink ? (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3">
                  <Shield size={18} className="text-yellow-400 shrink-0" />
                  <p className="text-yellow-200/80 text-sm">
                    Le bouton d&apos;achat sera désactivé tant qu&apos;aucun lien n&apos;est configuré
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-400 shrink-0" />
                  <p className="text-green-200/80 text-sm">
                    Lien configuré ! Les achats sont activés
                  </p>
                </div>
              )}

              {/* Save button for payment */}
              <Button 
                onClick={handleSave}
                className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder le lien
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick stats - Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {[
            { label: "Ventes totales", value: "0", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
            { label: "Revenus", value: "0 FCFA", icon: Package, color: "from-green-500 to-emerald-500" },
            { label: "Conversion", value: "---", icon: Settings, color: "from-purple-500 to-pink-500" },
            { label: "Statut", value: "Actif", icon: CheckCircle, color: "from-yellow-500 to-orange-500" }
          ].map((stat, idx) => (
            <Card key={idx} className="bg-white/[0.03] border-white/5 hover:bg-white/[0.05] transition-all group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-yellow-400/50" />
              <span>Brookly Admin Panel • Sécurisé</span>
            </div>
            <span>© 2026 Tous droits réservés</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
