import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App

// function App({ Component, pageProps }) {

// }

// export default App
