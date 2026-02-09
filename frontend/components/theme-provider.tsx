"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// We use a custom type here because sometimes next-themes types can be tricky with exact exports
// but typically this works fine.
// If type errors occur, we can adjust.
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
