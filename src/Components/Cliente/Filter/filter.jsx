import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';

function MyComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListItemClick = (value) => {
    console.log(value); // Manejar la acción correspondiente a la opción seleccionada
    handleClose(); // Cierra el popover después de seleccionar una opción
  };

  return (
    <ButtonGroup style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.8)", border: "1px solid  gray", borderRadius: "20px", height:"80px",width:"auto" }} variant="text" color="primary" aria-label="text primary button group">
      <Button
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        onClick={handleClick}
      >
        <span style={{color:"white", marginLeft:"40px", marginRight:"40px"}}>Ordenar</span>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ overflow: 'hidden' }}> {/* Contenedor con overflow: hidden */}
            <List>
              <ListItem button onClick={() => handleListItemClick('Menor a Mayor')}>
                <ListItemText primary="Menor a Mayor" />
              </ListItem>
              <ListItem button onClick={() => handleListItemClick('Mayor a Menor')}>
                <ListItemText primary="Mayor a Menor" />
              </ListItem>
            </List>
          </div>
        </Popover>
      </Button>
      <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px", marginRight:"40px"}}>Check -in</span>
        <span style={{color:"white", marginLeft:"40px", marginRight:"40px"}}>¿cuando?</span>
      </Button>
      <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px", marginRight:"40px"}}>Filtrar</span>
        <span style={{color:"white", marginLeft:"40px", marginRight:"40px"}}>por piso</span>
      </Button>
    </ButtonGroup>
  );
}

export default MyComponent;