import React from "react";
import Cards from "src/Components/Cliente/Cards/cards"; // Importa el componente Cards
import jsonData from "../../api/api.json";
import Filter from "../../Components/Cliente/Filter/filter"
function Home() {
  return (
    <div>
      
      <div style={{marginBottom:"50px",marginLeft:"340px"}}>
      <Filter/>
      </div>
      {/* Pasa los datos del JSON como propiedades a Cards */}
      <Cards data={jsonData} />
    </div>
  );
}

export default Home;