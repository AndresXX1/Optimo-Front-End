import React from "react";
import Cards from "src/Components/Cliente/Cards/cards"; // Importa el componente Cards
import jsonData from "../../api/api.json";
import Filter from "../../Components/Cliente/Filter/filter";
import { Grid } from '@mui/material';

function Home() {
 return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div style={{marginBottom:"50px"}}>
          <Filter/>
        </div>
      </Grid>

   
        <Cards data={jsonData} />
      
    </Grid>
 );
}

export default Home;