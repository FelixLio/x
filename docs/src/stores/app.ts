import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { i18n } from '../locales'

export interface AppState {
  locale: string
  darkMode: boolean
}

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: useStorage('locale', 'zh-CN'),
    darkMode: useStorage('dark-mode', false),
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale
      i18n.global.locale.value = locale as any
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    toggleLocale() {
      const nextLocale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
      this.setLocale(nextLocale)
    },
    init() {
      if (this.locale) {
        this.setLocale(this.locale)
      }
    },
  },
})
