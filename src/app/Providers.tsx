'use client'

import { ThemeProvider } from "@material-tailwind/react"

type ProvidersProps = {
  children: React.ReactNode
}

function Providers(props: ProvidersProps) {
  return (
    <ThemeProvider>
      {props.children}
    </ThemeProvider>
  )
}

export default Providers