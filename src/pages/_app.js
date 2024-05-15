import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux'; // Importa Provider de react-redux
import store from '../Redux/state/store'; // Asegúrate de que la ruta sea correcta
import themeConfig from 'src/configs/themeConfig'; // Config Imports
import UserLayout from 'src/layouts/UserLayout'; // Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'; // Contexts
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'; // Utils Imports
import 'react-perfect-scrollbar/dist/css/styles.css'; // React Perfect Scrollbar Style
import '../styles/globals.css'; // Global css styles
import Head from 'next/head';
import parseJwt from '../utils/jwtUtils'; // Asegúrate de que tienes esta función disponible
import { AuthProvider } from '../Components/localStore/authContext';

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // Manejar la lógica del localStorage aquí
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = parseJwt(token);
      // Aquí puedes establecer el estado de autenticación en tu aplicación
      // Por ejemplo, podrías establecer el estado de autenticación en tu contexto de autenticación
      // login(); // Esto asume que la función login maneja la lógica de autenticación
    }
  }, []);

  useEffect(() => {
    if (themeConfig.routingLoader) {
      NProgress.configure({ showSpinner: false });
      const handleStart = () => NProgress.start();
      const handleComplete = () => NProgress.done();

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);

      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }
  }, [router]);

  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>);

  return (
    <Provider store={store}>
      <Head>
        {/* Head content */}
      </Head>
      {/* Añade AuthProvider aquí */}
      <AuthProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeComponent>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;