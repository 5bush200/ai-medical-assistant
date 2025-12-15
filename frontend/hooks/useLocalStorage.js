import { useState, useCallback } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

export const useUser = () => {
  const [user, setUser] = useLocalStorage('user', null)

  const login = useCallback((userData) => {
    setUser(userData)
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  return { user, login, logout }
}

export const useConversation = () => {
  const [conversationId, setConversationId] = useLocalStorage('activeConversation', null)

  const setConversation = useCallback((id) => {
    setConversationId(id)
  }, [setConversationId])

  const clearConversation = useCallback(() => {
    setConversationId(null)
  }, [setConversationId])

  return { conversationId, setConversation, clearConversation }
}
