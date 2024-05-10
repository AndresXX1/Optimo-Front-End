import Head from 'next/head';
import { useRouter, Router } from 'next/router'; // Importa useRouter
import NProgress from 'nprogress'; // Loader Import
import { CacheProvider } from '@emotion/react'; // Emotion Imports
import { Provider } from 'react-redux'; // Importa Provider de react-redux
import store from '../Redux/state/store'; // Asegúrate de que la ruta sea correcta
import themeConfig from 'src/configs/themeConfig'; // Config Imports
import UserLayout from 'src/layouts/UserLayout'; // Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'; // Contexts
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'; // Utils Imports
import 'react-perfect-scrollbar/dist/css/styles.css'; // React Perfect Scrollbar Style
import '../styles/globals.css'; // Global css styles

const clientSideEmotionCache = createEmotionCache();

// Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter(); // Usa useRouter para obtener la ruta actual

  // Variables
  const getLayout = Component.getLayout?? (page => <UserLayout>{page}</UserLayout>);

  // Verifica si la ruta es "/"
  if (router.pathname === "/") {
    // Para la ruta raíz ("/"), solo renderiza el componente de la página actual sin ningún layout adicional
    return <Component {...pageProps} />;
  }

  // Para todas las demás rutas, renderiza el contenido de la página actual con el layout correspondiente
  return (
    <Provider store={store}> {/* Envuelve tu aplicación en el Provider */}
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Building Organization`}</title>
          <meta name='description' content={`${themeConfig.templateName}`} />
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
    </Provider> 
  );
};

export default App;