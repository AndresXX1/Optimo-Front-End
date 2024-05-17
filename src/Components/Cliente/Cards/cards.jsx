import React from "react";
import CustomCard from "../Card/card"; 
import { Grid, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material"; // Importar useMediaQuery para hacer el diseño más responsivo
import "./cards.module.css"; 

const Cards = ({ data }) => {
  // Define los puntos de quiebre responsivos para cambiar el tamaño de las tarjetas
  const smallScreen = useMediaQuery("(max-width:600px)");
  const mediumScreen = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const largeScreen = useMediaQuery("(min-width:961px)");

  // Determina el tamaño de las tarjetas según el tamaño de la pantalla
  let xsSize;
  if (smallScreen) {
    xsSize = 12;
  } else if (mediumScreen) {
    xsSize = 6;
  } else if (largeScreen) {
    xsSize = 4;
  } else {
    xsSize = 3;
  }

  const gridSpacing = 5;

  return (
    <Grid container spacing={gridSpacing} className="custom-grid-container">
      {data?.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="body1" color="black" textAlign="center" fontSize="25px" border="1px solid red" padding="10px" borderRadius="5px" backgroundColor="salmon">
            No hay oficinas disponibles.
          </Typography>
        </Grid>
      ) : (
        data?.map((item) => (
          <Grid item xs={xsSize} key={item.id}>
            <CustomCard data={item} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Cards;