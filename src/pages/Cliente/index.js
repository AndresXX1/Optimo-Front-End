import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsByBuilding, updateRoom,setSelectedBuildingId } from '../../Redux/reducer/rooms';
import Selecteeed from '../../pages/Admin/tablaOficinas/Select';
import Cards from '../../Components/Cliente/Cards/cards'; // Asegúrate de que este es el componente correcto
import { Grid } from '@mui/material';
import Filter from "../../Components/Cliente/Filter/filter"

const RoomsComponent = () => {
  const [editableRoomId, setEditableRoomId] = useState(null);
  const [editableRoomValues, setEditableRoomValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const dispatch = useDispatch();
  const roomsFromRedux = useSelector((state) => state.rooms.rooms);
  const selectedBuildingId = useSelector((state) => state.rooms.selectedBuildingId);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState({});
  const [openLocationDialog, setOpenLocationDialog] = useState({});

  useEffect(() => {
    console.log("Selected Building ID:", selectedBuildingId);
    if (selectedBuildingId) {
      dispatch(fetchRoomsByBuilding(selectedBuildingId));
    }
  }, [selectedBuildingId, dispatch]);

  useEffect(() => {
    console.log("Rooms from Redux:", roomsFromRedux);
  }, [roomsFromRedux]);

  const handleEdit = (roomId) => {
    setEditableRoomId(roomId);
    const room = roomsFromRedux.find(room => room._id === roomId);
    console.log("Editing Room:", room);
    setEditableRoomValues(room);
    setModifiedFields({});
  };

  const handleInputChange = (field, value) => {
    setEditableRoomValues(prevValues => ({
     ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
     ...prevFields,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (!selectedBuildingId) {
        console.error('Error: selectedBuildingId is undefined');

        return;

      }

      await dispatch(
        updateRoom({
          buildingId: selectedBuildingId,
          roomId: editableRoomId,
          updateRoomData: modifiedFields,
        })
      );
      setEditableRoomId(null);
      setModifiedFields({}); 
      setOpenDescriptionDialog({});
      setOpenLocationDialog({});
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleCancel = () => {
    setEditableRoomId(null);
  };

  const openDescriptionDialogFunc = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: true }));
  };

  const closeDescriptionDialog = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: false }));
  };

  const openLocationDialogFunc = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: true }));
  };

  const closeLocationDialog = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: false }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ marginBottom: "30px", marginTop: "30px" }}>
          <Selecteeed
            onSelectBuilding={(buildingId) => {
              dispatch(setSelectedBuildingId(buildingId));
              dispatch(fetchRoomsByBuilding(buildingId));
            }}
          />
        </div>
        <Grid item xs={10} sx={{marginBottom: "20px"}}>
        <Filter />
        </Grid>
      </Grid>
      <Grid item xs={20}>
        <Cards data={roomsFromRedux} />
      </Grid>
    </Grid>
  );
};

export default RoomsComponent;