export const getBackgroundColorClass = (isDarkThemeActive) =>
  isDarkThemeActive
    ? 'var(--dark-background-color)'
    : 'var(--light-background-color)'

export const getColorClass = (isDarkThemeActive) =>
  isDarkThemeActive ? 'var(--light-text-color)' : 'var(--dark-text-color)'

export const getBorderClass = (isDarkThemeActive) =>
  isDarkThemeActive ? 'var(--light-border-color)' : 'var(--dark-border-color)'
