// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CalendarCheckOutlineIcon from 'mdi-material-ui/CalendarCheckOutline';
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./estilos.module.css"

const navigation = (pathname) => {
  const isClienteDetail = pathname.startsWith("/Cliente/detail/");

  if (
    pathname === "/Cliente" ||
    pathname === "/Cliente/perfilUsers" ||
    pathname === "/Cliente/Config-User" ||
    isClienteDetail ||
    pathname.startsWith("/Cliente/Bookings")
  ) {
    return [
      {
        title: 'Panel principal',
        icon: HomeOutline,
        path: '/Cliente',
      },
      {
        title: 'Configuracion de cuenta',
        icon: AccountCogOutline,
        path: '/Cliente/Config-User'
      },
      {
        title: 'Reservaciones realizadas',
        icon: CalendarCheckOutlineIcon,
        path: '/Cliente/Bookings/'
      },

    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Inicia session',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Registrate',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Registrate como empresa',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },


    {
      sectionTitle: 'User Interface'
    },

    {
      title: 'Sobre nosotros',
      icon: AlertCircleOutline,
      path: '/pages/error',
      
    },

    {
      title: 'Terminos y condiciones',
      icon: AlertCircleOutline,
      path: '/pages/error',
      
    },

    {
      title: 'Centro de ayuda',
      icon: AlertCircleOutline,
      path: '/pages/error',
      
    },

    {
      title: 'Contactanos',
      icon: AlertCircleOutline,
      path: '/pages/error',
      
    },


    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
      //   title: 'Tables',
      //   icon: Table,
      //   path: '/tables'
      // },


    ]
  } else if (pathname == "/Admin" || pathname == "/Admin/tablaUsuario" 
  || pathname === "/Admin/tablaReservas"
     || pathname === "/Admin/tablaServicios"
     || pathname === "/Admin/tablaResenias"
     || pathname === "/Admin/Editar-Servicio"
     || pathname === "/Admin/Nuevo-Servicio"
     || pathname === "/Admin/tablaPisos"
     || pathname === "/Admin/tablaOficinas"
     || pathname === "/Admin/perfilUser"
     || pathname === "/Admin/Config-User"
     ||  pathname == "/Cliente/Bookings/"
    ){
      return [
        
        {
          title: 'Inicio',
          icon: HomeOutline,
      path: '/Admin'
    },
    
    
    // {
      //   title: 'Register',
      //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   
    // },
    // {
    //     icon: CubeOutline,
    //     title: 'Form Layouts',
    //     path: '/pages/form-layouts/'
    //   },



    {
      sectionTitle: 'Acciones'
    },


    // {
      //   title: 'Crear nuevo servicio',
      //   icon: AlertCircleOutline,
      //   path: '/pages/Create',
      //   
      // },
      // {
      //   title: 'Nuevo servicio',
      //   icon: AddBoxIcon,
      //   path: '/Admin/Nuevo-Servicio',
      //   className: 'no-underline ' + styles.claseDeEstilo
      // },

      
      {
        title: 'Administrar Edificios',
        icon: EditIcon,
        path: '/Admin/Editar-Servicio'
      },
    {
      sectionTitle: 'Configuracines'
    },

    {
      title: 'Usuarios',
      icon: SettingsIcon,
      path: '/Admin/tablaUsuario',
      
    },

    {
      title: 'Reservas',
      icon: SettingsIcon,
      path: '/Admin/tablaReservas',
      
    },

    {
      title: 'Edificios',
      icon: SettingsIcon,
      path: '/Admin/tablaServicios',
      
    },


    {
      title: 'Oficinas',
      icon: SettingsIcon,
      path: '/Admin/tablaOficinas',
      
    },


  ]
}
}

export default navigation
