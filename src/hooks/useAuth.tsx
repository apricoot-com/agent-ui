import { useEffect, useState } from 'react'
import { Hub } from 'aws-amplify/utils'
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser
} from 'aws-amplify/auth'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )
  const [user, setUser] = useState<Record<string, string> | undefined>(
    undefined
  )
  const [idToken, setIdToken] = useState<string | undefined>(undefined)
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

  const updateAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      const attributes = await fetchUserAttributes()
      const session = await fetchAuthSession()
      const token = session.tokens?.idToken?.toString() ?? null

      setUser({
        username: currentUser.username,
        ...attributes
      })
      setIdToken(token ?? undefined)
      setAccessToken(session.tokens?.accessToken.toString() ?? undefined)
      setIsAuthenticated(true)
    } catch {
      setUser(undefined)
      setIdToken(undefined)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    updateAuthState() // initial check

    const unsubscribe = Hub.listen('auth', () => {
      updateAuthState()
    })

    return () => unsubscribe()
  }, [])

  return { isAuthenticated, user, idToken, accessToken }
}
