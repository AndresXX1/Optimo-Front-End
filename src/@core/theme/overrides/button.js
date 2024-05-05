// ** Theme Config Imports

import themeConfig from 'src/configs/themeConfig';

const Button = theme => {
 return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 5,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          padding: `${theme.spacing(1.875, 3)}`
        },
        contained: {
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1.875, 5.5)}`,
          backgroundColor: '#0074D9', 
          '&:hover': {
            backgroundColor: '#005699', 
          },
         
          border: '2px solid #0074D9',
          boxShadow: '0 0 10px #0074D9, 0 0 5px #0074D9',
        },
        outlined: {
          padding: `${theme.spacing(1.625, 5.25)}`,
          borderColor: '#0074D9', 
          '&:hover': {
            borderColor: '#005699', 
          },
        },
        sizeSmall: {
          padding: `${theme.spacing(1, 2.25)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(1, 3.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(0.75, 3.25)}`
          }
        },
        sizeLarge: {
          padding: `${theme.spacing(2.125, 5.5)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(2.125, 6.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(1.875, 6.25)}`
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    }
 }
}

export default Button;
