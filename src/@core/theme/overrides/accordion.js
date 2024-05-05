const Accordion = theme => {
  return {
     MuiAccordion: {
       styleOverrides: {
         root: {
           '&.Mui-disabled': {
             backgroundColor: '#0074D9' // Color azul claro
           },
           '&.Mui-expanded': {
             boxShadow: theme.shadows[3]
           }
         }
       }
     },
     MuiAccordionSummary: {
       styleOverrides: {
         root: {
           padding: `0 ${theme.spacing(5)}`,
           '& + .MuiCollapse-root': {
             '& .MuiAccordionDetails-root:first-child': {
               paddingTop: 0
             }
           }
         },
         content: {
           margin: `${theme.spacing(2.5)} 0`
         },
         expandIconWrapper: {
           color: '#0074D9' // Color azul claro
         }
       }
     },
     MuiAccordionDetails: {
       styleOverrides: {
         root: {
           padding: theme.spacing(5),
           '& + .MuiAccordionDetails-root': {
             paddingTop: 0
           }
         }
       }
     }
  }
 }
 
 export default Accordion