import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../../../Redux/reducer/rooms'; 
import ReservationForm from '../../../Components/Cliente/Reserva/reserva';
import { Box } from '@mui/material';
import AllEquipmentIcons from '../../../Components/Cliente/EquipamientosIcon/equipamiento';
import { useRouter } from 'next/router';

function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const roomId = router.query.id; // Obtiene el ID de la habitación desde la URL
  const room = useSelector((state) => state.rooms.rooms.find((room) => room._id === roomId));
  const { loading, error } = useSelector((state) => state.rooms);
  const [mainImage, setMainImage] = useState(null); // Estado para la imagen principal
  const [plano, setPlano] = useState(null);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomById(roomId)); // Invoca la acción para obtener la habitación por su ID
    }
  }, [dispatch, roomId]);

  if (loading === 'loading' || !room) {
    return <h1>Cargando...</h1>; // Muestra un mensaje de carga mientras se obtiene la habitación
  }

  if (error) {
    return <h1>Error: {error}</h1>; // Muestra un mensaje de error si hay un problema al cargar la habitación
  }

  const renderMainImage = () => {
    return <img src={room.images[0]} alt={`Imagen 1 de ${room.name}`} style={{ width: '100%', height: 'auto', borderRadius: '50px 0px 0 50px', cursor: 'pointer' }} onClick={() => window.open(room.images[0], '_blank')} />;
  };
   
  const renderSmallImages = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {room.images.slice(1, 5).map((imageUrl, index) => (
          <div key={index} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
            <img src={imageUrl} alt={`Imagen ${index + 2} de ${room.name}`} style={{ 
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
          <img src={room.plans} alt={`Planta 1`} style={{
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
        {room.name}
      </h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          {renderMainImage()}
        </div>
        <div style={{ flex: '1', }}>
          {renderSmallImages()}
        </div>
      </div>

      <Box sx={{ marginTop:"40px", }}>
        <h1>{room.name} en {room.type}</h1>
        <h3 style={{marginTop: "0px",marginBottom:"80px",}}>{room.location} en el {room.floorNumber} </h3>
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
          <p>{room.description}</p>
        </div>
      </Box>

      <div style={{fontFamily:"arial", borderBottom:"1px solid gray", padding:"30px", }}>
        <h2> ¿Que ofrece este lugar?</h2>
        <div style={{marginLeft:"0px",marginTop:"30px"}}>
          <AllEquipmentIcons equipment={room.equipment} />
        </div>
      </div>

      <div style={{borderBottom:"1px solid gray",padding:"20px"}}>
        <h2>¿Donde esta el local?</h2>
        <h3> {room.location} en el piso {room.floorNumber} </h3>
        {renderPlantaImages()}
        <ReservationForm/>
      </div>
    </div>
  );
}

export default Detail;