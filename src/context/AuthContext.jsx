import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (username, password) => {
    const ok =
      (username.trim() === 'admin' && password === '1234') ||
      (username.trim() === 'juliana' && password === 'juliana123') ||
      (username.trim() === 'jimena' && password === 'jimena123') ||
      (username.trim() === 'natalia' && password === 'natalia123')

    if (!ok) return { ok: false, message: 'credenciales inválidas' }

    let session = { username, name: 'Administrador' }

    if (username.trim() === 'juliana') {
      session = { username, name: 'Juliana' }
    }
    if (username.trim() === 'jimena') {
      session = { username, name: 'Jimena' }
    }
    if (username.trim() === 'natalia') {
      session = { username, name: 'Natalia' }
    }

    setUser(session)
    localStorage.setItem('user', JSON.stringify(session))

    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}