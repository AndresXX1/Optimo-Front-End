import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';




export default function Filter() {
 return (
<ButtonGroup style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.8)", border: "1px solid  gray", borderRadius: "20px", height:"80px",width:"auto" }} variant="text" color="primary" aria-label="text primary button group">
<Button style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white",marginLeft:"40px",marginRight:"40px"}}>ordenar</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>por piso</span>
 </Button>
 <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>visitantes</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>¿cuantos? </span>
 </Button>
 <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>Check -in</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>¿cuando?</span>
 </Button>
 <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>Filtrar</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>por piso</span>
 </Button>


</ButtonGroup>
 );
}


//boxShadow: "0 0 5px rgba(0, 0, 0, 0.8)"