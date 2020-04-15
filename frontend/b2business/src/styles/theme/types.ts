import { Theme } from "@material-ui/core"

export interface ApplicationTheme extends Theme {
  glow: Glow
}

interface Glow {
  light: string
  medium: string
  dark: string
}
