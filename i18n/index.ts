import { useUserStore } from '@/stores/userStore';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';


// Import des traductions
import frAuth from './locales/fr/auth.json';
import frCart from './locales/fr/cart.json';
import frCommon from './locales/fr/common.json';
import frOffers from './locales/fr/offers.json';
import frOrder from './locales/fr/order.json';
import frProfile from './locales/fr/profile.json';
import frSettings from './locales/fr/settings.json';

import arAuth from './locales/ar/auth.json';
import arCart from './locales/ar/cart.json';
import arCommon from './locales/ar/common.json';
import arOffers from './locales/ar/offers.json';
import arOrder from './locales/ar/order.json';
import arProfile from './locales/ar/profile.json';
import arSettings from './locales/ar/settings.json';

// Configuration des traductions
const translations = {
  fr: {
    common: frCommon,
    auth: frAuth,
    profile: frProfile,
    settings: frSettings,
    cart: frCart,
    offers: frOffers,
    order: frOrder,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
    profile: arProfile,
    settings: arSettings,
    cart: arCart,
    offers: arOffers,
    order: arOrder,
  },
}

const i18n = new I18n(translations)

i18n.enableFallback = true
i18n.defaultLocale = 'ar' // Fallback sur arabe comme demandé

// Type pour les clés de traduction
export type TranslationKeys = 
  | `common.${keyof typeof frCommon}`
  | `auth.${keyof typeof frAuth}`
  | `profile.${keyof typeof frProfile}`
  | `settings.${keyof typeof frSettings}`
  | `cart.${keyof typeof frCart}`
  | `offers.${keyof typeof frOffers}`
  | `order.${keyof typeof frOrder}`

export const initializeLocale = () => {
  const storedLanguage = useUserStore.getState().preferences?.language
  
  if (storedLanguage) {
    setLanguage(storedLanguage)
  } else {
    const systemLocale = getLocales()[0].languageCode;
    
    const supportedLanguage = (systemLocale && ['fr', 'ar'].includes(systemLocale)) 
      ? systemLocale as 'fr' | 'ar'
      : 'ar' 
    
    useUserStore.getState().setLanguage(supportedLanguage)
    setLanguage(supportedLanguage)
  }
}

// Fonction pour changer la langue
export const setLanguage = (language: 'fr' | 'ar') => {
  i18n.locale = language
  
  // Gérer le RTL pour l'arabe
  const isRTL = language === 'ar'
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL)
    I18nManager.allowRTL(isRTL)
    return true 
  }
  return false 
}

// Fonction de traduction typée
export const t = (key: TranslationKeys, options?: any): string => {
  return i18n.t(key, options)
}

// Hook pour utiliser les traductions dans les composants

export const useTranslation = () => {
  const language = useUserStore((state) => state.preferences?.language || 'fr')
  const [, forceUpdate] = useState({})
  
  useEffect(() => {
    if (language) {
      const needsRestart = setLanguage(language)
      // Forcer le re-render après changement de langue
      forceUpdate({})
      
      if (needsRestart) {
        // Tu peux gérer l'alerte de redémarrage ici ou retourner cette info
        console.log('App restart required for RTL changes')
      }
    }
  }, [language])
  
  return {
    t,
    language,
    isRTL: language === 'ar',
  }
}

// Fonction utilitaire pour changer la langue depuis n'importe où
export const changeLanguage = async (newLanguage: 'fr' | 'ar') => {
  const { setLanguage: setStoreLanguage } = useUserStore.getState()
  setStoreLanguage(newLanguage)
  const needsRestart = setLanguage(newLanguage)
  return needsRestart
}

// Export de l'instance i18n si nécessaire
export default i18n