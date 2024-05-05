// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router' // Importar el hook useRouter

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import navigation from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const router = useRouter() // Usar el hook useRouter para obtener la ruta actual del router

  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <div
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          
        </div>
      </Box>
    )
  }

  // Obtener la ruta actual del router
  const currentPath = router.pathname

  // Obtener los elementos de navegación según la ruta actual
  const navItems = navigation(currentPath)

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navItems} // Usar los elementos de navegación obtenidos
      afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}

export default UserLayout