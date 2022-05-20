import { defineStore } from 'pinia'

export const useSystemState = defineStore('system', {
  state: () => {
    return {
      isDark: false,
      showSideNav: true,
      themeWithSystem: true, // 主题是否和系统一致
    }
  },
  actions: {
    toggleDark(status = false) {
      this.isDark = status
    },
    toggleSideNav(status = false) {
      this.showSideNav = status
    },
    toggleThemeWithSystem(status = true) {
      this.themeWithSystem = status
    },
  },
})
