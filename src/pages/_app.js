import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import store from '../Redux/state/store';
import themeConfig from 'src/configs/themeConfig';
import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/globals.css';
import Head from 'next/head';
import parseJwt from '../utils/jwtUtils';
import { AuthProvider } from '../Components/localStore/authContext';

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const router = useRouter();

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

  const getLayout = Component.getLayout?? (page => <UserLayout>{page}</UserLayout>);

  return (
    <Provider store={store}>
      <Head>
        
      </Head>
   
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