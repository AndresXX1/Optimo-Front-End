const DefaultPalette = (mode, themeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65'
  const darkColor = '231, 227, 252'
  const mainColor = mode === 'light' ? lightColor : darkColor
 
  const primaryGradient = () => {
     if (themeColor === 'primary') {
       return '#0074D9' // Azul claro
     } else if (themeColor === 'secondary') {
       return '#005699' // Azul oscuro para secundario
     } else if (themeColor === 'success') {
       return '#0074D9' // Azul claro
     } else if (themeColor === 'error') {
       return '#0074D9' // Azul claro
     } else if (themeColor === 'warning') {
       return '#0074D9' // Azul claro
     } else {
       return '#0074D9' // Azul claro
     }
  }
 
  return {
     customColors: {
       main: mainColor,
       primaryGradient: primaryGradient(),
       tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759'
     },
     common: {
       black: '#000',
       white: '#FFF'
     },
     mode: mode,
     primary: {
       light: '#0074D9', // Azul claro
       main: '#0074D9', // Azul claro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     secondary: {
       light: '#0074D9', // Azul claro
       main: '#005699', // Azul oscuro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     success: {
       light: '#0074D9', // Azul claro
       main: '#0074D9', // Azul claro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     error: {
       light: '#0074D9', // Azul claro
       main: '#0074D9', // Azul claro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     warning: {
       light: '#0074D9', // Azul claro
       main: '#0074D9', // Azul claro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     info: {
       light: '#0074D9', // Azul claro
       main: '#0074D9', // Azul claro
       dark: '#005699', // Azul oscuro
       contrastText: '#FFF'
     },
     grey: {
       50: '#FAFAFA',
       100: '#F5F5F5',
       200: '#EEEEEE',
       300: '#E0E0E0',
       400: '#BDBDBD',
       500: '#9E9E9E',
       600: '#757575',
       700: '#616161',
       800: '#424242',
       900: '#212121',
       A100: '#D5D5D5',
       A200: '#AAAAAA',
       A400: '#616161',
       A700: '#303030'
     },
     text: {
       primary: `rgba(${mainColor}, 0.87)`,
       secondary: `rgba(${mainColor}, 0.68)`,
       disabled: `rgba(${mainColor}, 0.38)`
     },
     divider: `rgba(${mainColor}, 0.12)`,
     background: {
       paper: mode === 'light' ? '#FFF' : '#312D4B',
       default: mode === 'light' ? '#F4F5FA' : '#28243D'
     },
     action: {
       active: `rgba(${mainColor}, 0.54)`,
       hover: `rgba(${mainColor}, 0.04)`,
       selected: `rgba(${mainColor}, 0.08)`,
       disabled: `rgba(${mainColor}, 0.3)`,
       disabledBackground: `rgba(${mainColor}, 0.18)`,
       focus: `rgba(${mainColor}, 0.12)`
     }
  }
 }
 
 export default DefaultPalette