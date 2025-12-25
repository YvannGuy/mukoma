"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  useEffect(() => {
    // Récupérer la langue depuis localStorage ou détecter depuis le navigateur
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguageState(savedLang)
    } else {
      // Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0]
      setLanguageState(browserLang === 'en' ? 'en' : 'fr')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

