import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setSelectedBuildingId } from '../../../Redux/reducer/rooms';

const BuildingSelect2 = ({ onSelectBuilding }) => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBuildingId, setSelectedBuildingIdLocal] = useState('');
    const dispatch = useDispatch();
    
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
      
      const selectedBuilding = buildings.find(building => building._id === selectedBuildingId);
      const selectedBuildingName = selectedBuilding ? selectedBuilding.name : '';
    const handleBuildingChange = (event) => {
        const selectedId = event.target.value;
        console.log("Selected Building ID:", selectedId);
        setSelectedBuildingIdLocal(selectedId); // Actualiza el estado local de selectedBuildingId
        dispatch(setSelectedBuildingId(selectedId)); // Despacha la acción setSelectedBuildingId
        onSelectBuilding(selectedId);
        console.log("Fetching rooms for building ID:", selectedId);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
      <div>

      <FormControl fullWidth>
          <InputLabel >Edificio</InputLabel>
          <Select
              labelId="building-select-label"
              id="building-select"
              value={selectedBuildingId}
              onChange={handleBuildingChange}
              fullWidth
          >
              
              {buildings.map(building => (
                  <MenuItem key={building._id} value={building._id}>{building.name}</MenuItem>
              ))}
          </Select>
      </FormControl>
      </div>
  );
};

export default BuildingSelect2;

