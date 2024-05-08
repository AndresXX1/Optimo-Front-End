import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dataApi from '../../../../src/api/api.json';
import ReservationForm from "../../../Components/Cliente/Reserva/reserva";
import { Box } from '@mui/material';
import AllEquipmentIcons from "../../../Components/Cliente/EquipamientosIcon/equipamiento"

function Detail() {
 const router = useRouter();
 const { id } = router.query; // Obtiene el ID de la ruta
 const [data, setData] = useState(null);
 const [mainImage, setMainImage] = useState(null); // Estado para la imagen principal
 const [plano, setPlano] = useState(null);

 useEffect(() => {
    if (id) {
      const item = dataApi.find(item => item.id.toString() === id);
      setData(item);
     
      setMainImage(item.Imagen[0]);
    }
 }, [id]);

 if (!data) {
    return <h1>Cargando...</h1>;
 };





 const renderMainImage = () => {
    return <img src={mainImage} alt={`Imagen 1 de ${data.Nombre}`} style={{ width: '100%', height: 'auto', borderRadius: '50px 0px 0 50px', cursor: 'pointer' }} onClick={() => window.open(mainImage, '_blank')} />;
   };
   
   // Renderizar las imágenes pequeñas en una cuadrícula
   const renderSmallImages = () => {
    return (
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
             {data.Imagen.slice(1, 5).map((imageUrl, index) => (
                 <div key={index} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={imageUrl} alt={`Imagen ${index + 2} de ${data.Nombre}`} style={{ 
                         maxWidth: '100%', 
                         maxHeight: '100%', 
                         objectFit: 'cover', 
                         borderRadius: index === 1 ? '0 50px 0 0' : index === 3 ? '0 0 50px 0' : '0',
                         cursor: 'pointer' 
                    }} onClick={() => window.open(imageUrl, '_blank')} />
                 </div>
             ))}
         </div>
    );
   };

   const renderPlantaImages = () => {
    // Accede directamente al primer elemento del array
    const plantaUrl = data.Planta[0];

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px'
        }}>
            <div style={{
                flex: '0 0 calc(50% - 10px)', 
                maxWidth: 'calc(50% - 10px)', 
                height: 'auto', 
                marginBottom: '10px' 
            }}>
                <img src={plantaUrl} alt={`Planta 1`} style={{
                    width: '70%', 
                    height: 'auto',
                    objectFit: 'cover', 
                    borderRadius: '10px', 
                    marginLeft:"00px",
                    marginTop:"41px",
                    marginBottom:"23px"
                }} />
            </div>
        </div>
    );
};

 return (
    <div>   
        <h1 style={{     
            marginBottom:"40px", textAlign:"center"
    }}>
        {data.Nombre}</h1>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', marginRight: '10px' }}>
                {renderMainImage()}
            </div>
            <div style={{ flex: '1', }}>
                {renderSmallImages()}
            </div>
        </div>

       <Box sx={{ marginTop:"40px", }}>
        <h1 >{data.Nombre} en {data.Servicio}</h1>
        <h3 style={{marginTop: "0px",marginBottom:"80px",}}>{data.Ubicacion} en el {data.Piso} </h3>
        <div style={{
    maxWidth: "700px",
    borderTop: "1px solid gray",
    marginTop: "80px",
    padding: "30px",
    borderBottom: "1px solid gray",
    marginBottom: "80px",
    width: "90%", // Ajuste del ancho del contenedor para que sea responsivo
    margin: "0 auto", // Centrar el contenedor horizontalmente
    fontSize: "16px", // Tamaño de texto predeterminado
    lineHeight: "1.5", // Espaciado entre líneas
    marginLeft:"0px",
    textAlign:"center"
}}>
    <p>{data.Descripcion}</p>
</div>
       </Box>
        
    
       <div style={{fontFamily:"arial", borderBottom:"1px solid gray", padding:"30px", }}>
        <h2> ¿Que ofrece este lugar?</h2>
        <div style={{marginLeft:"0px",marginTop:"30px"}}>
        <AllEquipmentIcons equipment={data.Equipamento} />
        </div>
        </div>
       <div style={{borderBottom:"1px solid gray",padding:"20px"}}>
        <h2>¿Donde esta el local?</h2>
        <h3> {data.Ubicacion} en el {data.Piso} </h3>
       {renderPlantaImages()}
       <ReservationForm/>
       </div>
    </div>
       
 );
}

export default Detail;