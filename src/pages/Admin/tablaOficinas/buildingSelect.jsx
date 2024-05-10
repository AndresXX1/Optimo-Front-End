import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const BuildingSelect = ({ onSelectBuilding }) => { // Agrega una prop para pasar la selección del edificio
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');

  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await axios.get('/api/buildings');
        setBuildings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching building names:', error);
        setLoading(false);
      }
    };

    fetchBuildingNames();
  }, []);

  const handleBuildingChange = (event) => {
    const selectedId = event.target.value;
    console.log("Selected Building ID:", selectedId); // Verifica que se imprima el ID correcto
    onSelectBuilding(selectedId);
    console.log("Fetching rooms for building ID:", selectedId); // Verifica que se esté llamando a la función onSelectBuilding
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <FormControl fullWidth>
      <p>Seleccione un edificio</p>
      <InputLabel id="building-select-label"></InputLabel>
      <Select
        labelId="building-select-label"
        id="building-select"
        value={selectedBuildingId}
        onChange={handleBuildingChange}
        fullWidth
      >
        <MenuItem value="">Seleccionar edificio</MenuItem>
        {buildings.map(building => (
          <MenuItem key={building._id} value={building._id}>{building.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BuildingSelect;