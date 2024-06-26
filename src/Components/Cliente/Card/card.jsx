import React, { useState } from "react";
import Link from 'next/link'; // Importa Link de Next.js
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from "./card.module.css";

const CustomCard = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
   };
   
   const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.Imagen.length);
   };
   
  return (
    <Card className="custom-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea>

        <Link href={`/Cliente/detail/${data._id}`} passHref> {/* Usa Link de Next.js */}
        <CardMedia
  component="img"
  height="200" // Altura fija para todas las imágenes
  image={data && data.images && data.images[currentImageIndex]} // Asegúrate de que data y data.images existan
  alt={data? data.name : ''}
/>
        </Link>

      </CardActionArea>
      <Box className="arrow-box" position="relative">
        {hovered && (
          <Box className="arrow" position="absolute" top="50%" left={0} transform="translateY(-50%)">
            <IconButton onClick={handlePreviousImage} style={{ color: "#36A2EB",top:"-50px" }}>
              <ArrowBackIcon style={{ height: "30px", width: "30px" }} />
            </IconButton>
          </Box>
        )}
        {hovered && (
          <Box className="arrow" position="absolute" top="50%" right={0} transform="translateY(-50%)">
            <IconButton onClick={handleNextImage} style={{ color: "#36A2EB",top:"-50px" }}>
              <ArrowForwardIcon style={{ height: "30px", width: "30px" }} />
            </IconButton>
            
          </Box>
        )}

      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: "40px" }}>
          Ubicación:
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: "40px" }}>
          Servicio: {data.Servicio}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: "40px" }}>
          Piso: {data.floorNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: "40px" }}>
          Equipamento: {data.equipment}
        </Typography>
      </CardContent>

   
    </Card>
  );
};

export default CustomCard;