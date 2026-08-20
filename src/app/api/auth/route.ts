import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Les identifiants sont dans les variables d'environnement (JAMAIS exposées au client)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-in-production'

// Stockage en mémoire des sessions (en production, utiliser Redis/DB)
const sessions = new Map<string, { expires: number }>()

// Nettoyer les sessions expirées
function cleanExpiredSessions() {
  const now = Date.now()
  for (const [token, session] of sessions.entries()) {
    if (session.expires < now) {
      sessions.delete(token)
    }
  }
}

// POST /api/auth/login - Connexion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validation basique
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Identifiants requis' },
        { status: 400 }
      )
    }

    // Vérification des identifiants (côté serveur uniquement !)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Générer un token de session sécurisé
      const token = randomUUID()
      
      // Session valide 24h
      sessions.set(token, {
        expires: Date.now() + (24 * 60 * 60 * 1000)
      })

      // Nettoyer les anciennes sessions
      cleanExpiredSessions()

      // Retourner le token (HTTP-only cookie serait mieux, mais localStorage OK pour MVP)
      return NextResponse.json({
        success: true,
        token,
        message: 'Connexion réussie',
        expiresIn: 24 * 60 * 60 // 24h en secondes
      })
    }

    // Échec de l'authentification
    // Attendre un peu pour éviter le brute-force timing attacks
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))

    return NextResponse.json(
      { success: false, error: 'Identifiants incorrects' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Erreur auth:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// GET /api/auth/check - Vérifier si une session est valide
export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  const session = sessions.get(token)
  
  if (!session || session.expires < Date.now()) {
    if (session) sessions.delete(token)
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  return NextResponse.json({ 
    valid: true, 
    expiresIn: Math.floor((session.expires - Date.now()) / 1000)
  })
}

// DELETE /api/auth/logout - Déconnexion
export async function DELETE(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (token) {
    sessions.delete(token)
  }

  return NextResponse.json({ success: true, message: 'Déconnecté' })
}
