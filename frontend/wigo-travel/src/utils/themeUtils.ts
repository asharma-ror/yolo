import { Theme, fade, darken, lighten } from "@material-ui/core"
import { ThemeColor, ThemeColorVariant } from "../types/theme-types"

const defaultColorVariand = "main" as ThemeColorVariant

export const getGreyBackgroundColor = (theme: Theme) => theme.palette.grey[200]

export const getPrimaryColor = (
  theme: Theme,
  colorVariant: ThemeColorVariant
) => {
  switch (colorVariant) {
    case "main":
      return theme.palette.primary.main
    case "dark":
      return theme.palette.primary.dark
    case "light":
      return theme.palette.primary.light
  }
}

export const getSecondaryColor = (
  theme: Theme,
  colorVariant: ThemeColorVariant
) => {
  switch (colorVariant) {
    case "main":
      return theme.palette.secondary.main
    case "dark":
      return theme.palette.secondary.dark
    case "light":
      return theme.palette.secondary.light
  }
}

export const getColor = (
  theme: Theme,
  color: ThemeColor,
  colorVariant = defaultColorVariand
) => {
  switch (color) {
    case "primary":
      return getPrimaryColor(theme, colorVariant)
    case "secondary":
      return getSecondaryColor(theme, colorVariant)
    case "neutral":
      return theme.palette.action.active
    case "disabled":
      return theme.palette.action.disabled
  }
}

export const getColorContrast = (theme: Theme, color: ThemeColor) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.contrastText
    case "secondary":
      return theme.palette.secondary.contrastText
    case "neutral":
      return theme.palette.action.disabled
    case "disabled":
      return theme.palette.action.active
  }
}

export const getFadedColor = (
  theme: Theme,
  color: ThemeColor,
  fadeValue: number,
  colorVariant = defaultColorVariand
) => {
  return fade(getColor(theme, color, colorVariant), fadeValue)
}

export const getDarkenColor = (
  theme: Theme,
  color: ThemeColor,
  coefficient: number,
  colorVariant = defaultColorVariand
) => {
  return darken(getColor(theme, color, colorVariant), coefficient)
}

export const getLightenColor = (
  theme: Theme,
  color: ThemeColor,
  coefficient: number,
  colorVariant = defaultColorVariand
) => {
  return lighten(getColor(theme, color, colorVariant), coefficient)
}

export const getThemeColor = (
  theme: Theme,
  color: ThemeColor,
  negative?: boolean
) => {
  return negative ? getColorContrast(theme, color) : getColor(theme, color)
}
