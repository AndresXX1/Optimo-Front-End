import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildingById } from "../../../Redux/reducer/building";
import { updateBuilding } from "../../../Redux/reducer/reducer";
import axios from 'axios';
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

// ** Custom Component Imports
import Selecteeed from '../../../pages/Admin/tablaOficinas/Select';

// ** Toastify Imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const TabAccount = () => {
  const [imgSrc, setImgSrc] = useState('/images/logos/iconocam.png');
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({

    name: '',
    address: '',
    country: '',
    city: '',
  });

  const dispatch = useDispatch();
  const building = useSelector((state) => state.building.building);

  useEffect(() => {
    if (building) {
      console.log('Fetched Building Data:', building);
      setImgSrc(building.blueprints || '/images/logos/iconocam.png');
      setFormData({
        name: building.name || '',
        address: building.address || '',
        country: building.country || '',
        city: building.city || '',
        blueprints: building.blueprints || "",
      });
    }
  }, [building]);

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setImageFile(files[0]);
    }
  };

  const handleBuildingSelect = (id) => {
    dispatch(fetchBuildingById(id));
    console.log('Selected Building ID:', id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedFormData = { ...formData };

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'osbs0ds6');
      formData.append('cloud_name', 'dot1uumxf'); 
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dot1uumxf/image/upload', formData);
        updatedFormData.blueprints = response.data.secure_url;
      } catch (error) {
        toast.error('Error uploading image', { autoClose: 2000, onClose: () => window.location.reload() });
        
        return;

      }
    }

    console.log('Updated Form Data:', updatedFormData); 

    try {
      await dispatch(updateBuilding({ id: building._id, updatedBuilding: updatedFormData }));
      toast.success('Building updated successfully', { autoClose: 1200, onClose: () => window.location.reload() });
    } catch (error) {
      toast.error('Error updating building', { autoClose: 1200, onClose: () => window.location.reload() });
    }
  };

  return (
    <CardContent>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
      <Selecteeed onSelectBuilding={handleBuildingSelect} />
        <Typography style={{ marginTop: '10px', marginBottom: '20px' }} variant="h6" gutterBottom>
          Seleccione un Servicio
        </Typography>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' sx={{ width: "300px" }} />
              <Box style={{ marginLeft: '30px' }}>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Cambia la imagen del servicio
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Modifica las imagenes! :D Cargalas en formato jpg y png.
                </Typography>
              </Box>
            </Box>
            <Typography style={{ marginTop: '70px', marginBottom: '-20px' }} variant="h6" gutterBottom>
              Modifica los datos del servicio
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nombre'
              placeholder='Ej: complejo Esperanza'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Direccion'
              placeholder='Ej:Siempreviva 127'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Pais</InputLabel>
              <Select
                label='Country'
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
                name='country'
                value={formData.country}
                onChange={handleInputChange}
              >
                <MenuItem value='Argentina'>Argentina</MenuItem>
                <MenuItem value='Colombia'>Colombia</MenuItem>
                <MenuItem value='Ecuador'>Ecuador</MenuItem>
                <MenuItem value='Chile'>Chile</MenuItem>
                <MenuItem value='Venezuela'>Venezuela</MenuItem>
                <MenuItem value='Uruguay'>Uruguay</MenuItem>
                <MenuItem value='Bolivia'>Bolivia</MenuItem>
                <MenuItem value='Peru'>Peru</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Ciudad'
              placeholder='Ej: La pampa'
              name='city'
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          {/* Aquí puede ir el textarea para Bio si es necesario */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button style={{ marginTop: '60px' }} type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Guardar Cambios
          </Button>
        </Grid>
      </form>
    </CardContent>
  );
}

export default TabAccount;