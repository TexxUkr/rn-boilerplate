import { PropsWithChildren } from "react"
import { ThemeProvider as ThemeProviderEmotion } from "@emotion/react"
import { useAppTheme } from "./useAppTheme"
export const EmotionThemeProvider = ({ children }: PropsWithChildren<any>) => {
  const { theme } = useAppTheme()
  return <ThemeProviderEmotion theme={theme}>{children}</ThemeProviderEmotion>
}
