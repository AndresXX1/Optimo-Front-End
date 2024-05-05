import Head from 'next/head'
import  { useRouter, Router } from 'next/router' // Importa useRouter

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
 Router.events.on('routeChangeStart', () => {
    NProgress.start()
 })
 Router.events.on('routeChangeError', () => {
    NProgress.done()
 })
 Router.events.on('routeChangeComplete', () => {
    NProgress.done()
 })
}

// ** Configure JSS & ClassName
const App = props => {
 const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
 const router = useRouter() // Usa useRouter para obtener la ruta actual

 // Variables
 const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

 // Verifica si la ruta es "/"
 if (router.pathname === "/") {
    // Para la ruta raíz ("/"), solo renderiza el componente de la página actual sin ningún layout adicional
    return <Component {...pageProps} />;
 }

 // Para todas las demás rutas, renderiza el contenido de la página actual con el layout correspondiente
 return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Building Organization`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName}` }
        />
        <meta name='keywords' />
        <meta name='viewport' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
 )
}

export default App