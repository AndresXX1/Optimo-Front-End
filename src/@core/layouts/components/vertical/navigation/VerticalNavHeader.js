// ** Next Import
import Link from 'next/link'
import Image from 'next/image';
import snfondo from '../../../../../../public/logos/snfondo.png'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Hooks
import { useRouter } from 'next/router'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'space-between',
 paddingRight: theme.spacing(4.5),
 transition: 'padding .25s ease-in-out',
 minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
 fontWeight: 600,
 lineHeight: 'normal',
 textTransform: 'uppercase',
 color: theme.palette.text.primary,
 transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
 display: 'flex',
 alignItems: 'center',
 textDecoration: 'none'
})

const VerticalNavHeader = props => {
 // ** Hooks
 const router = useRouter()
 const theme = useTheme()

 // Determina la ruta base basada en la ruta actual
 const baseRoute = router.pathname.startsWith('/Admin') ? '/Admin' : '/Cliente'

 return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {props.verticalNavMenuBranding ? (
        props.verticalNavMenuBranding(props)
      ) : (
        <Link href={baseRoute} passHref>
          <StyledLink>
            <Image
              src={snfondo}
              alt="Logo"
              width={200}
              height={200}
              style={{
                marginLeft:"10px",
                marginTop:"-50px"
              }}
            />
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
 )
}

export default VerticalNavHeader