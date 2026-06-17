const THEME_KEY = 'bof_theme'

export function loadThemeOverride() {
  const v = localStorage.getItem(THEME_KEY)
  return v === 'light' || v === 'dark' ? v : null
}

export function saveThemeOverride(v) {
  if (v) localStorage.setItem(THEME_KEY, v)
  else localStorage.removeItem(THEME_KEY)
}

export function applyTheme(override) {
  if (override) {
    document.documentElement.setAttribute('data-theme', override)
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}
