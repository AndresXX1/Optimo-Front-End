import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/reducer/updateUser';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from "../../Components/localStore/authContext"
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}));

const TabAccount = () => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');
  const [initialData, setInitialData] = useState(null); 
  const dispatch = useDispatch();
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const [currentPath, setCurrentPath] = useState('');
  const router = useRouter()

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);


  useEffect(() => {
    if (typeof window!== 'undefined') {
      const decodedTokenFromLocalStorage = JSON.parse(localStorage.getItem('decodedToken'));
      console.log('Decoded Token from Local Storage:', decodedTokenFromLocalStorage);
      setDecodedToken(decodedTokenFromLocalStorage);
      setInitialData(decodedTokenFromLocalStorage);
      if (decodedTokenFromLocalStorage && decodedTokenFromLocalStorage.image) {
        setImgSrc(decodedTokenFromLocalStorage.image);
      } else {
        setImgSrc('/images/avatars/1.png');
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
     
      toast.success('¡Cambios guardados exitosamente!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => setUpdateSuccess(false) 
      });
  
     
      handleClickOpen();
    }
  }, [updateSuccess]);


  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result);
        setDecodedToken(prevState => ({
          ...prevState,
          image: reader.result 
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const fileInput = document.querySelector('#account-settings-upload-image');
    const file = fileInput.files[0];
  
  
    const userData = {
      id: decodedToken? decodedToken.userId : '',
      name: e.target.name.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      country: e.target.country.value,
      address: e.target.address.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
    };
  
    
    if (imgSrc!== '/images/avatars/1.png') {
      userData.profilePicture = imgSrc;
    }
  
    setDecodedToken(prevState => ({
      ...prevState,
      image: imgSrc 
    }));
   
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'osbs0ds6');
      formData.append('cloud_name', 'dot1uumxf'); 
  
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dot1uumxf/image/upload', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        const imageUrl = data.secure_url;
  
        userData.profilePicture = imageUrl; 
      } catch (error) {
        console.error('Error de carga:', error);
      }
    }
  
    console.log('Datos del usuario a enviar:', userData);
  
    try {
      await dispatch(updateUser(userData));
      console.log('Los datos han sido enviados correctamente');
      setUpdateSuccess(true); 
    } catch (error) {
      
      console.error('Error actualizando usuario:', error);
      toast.error('Error al actualizar los datos del usuario.');
    }
  };
  

  const handleReset = () => {
    setDecodedToken(initialData); 
    setImgSrc(initialData ? initialData.image : '/images/avatars/1.png'); 
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (shouldLogout) => {
    setOpen(false);
    if (shouldLogout) {
   
      console.log("Cerrar sesión");
     
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('decodedToken');
 
    setCurrentPath('');

    router.push('/pages/login');
  };

  return (
  <CardContent>
    <ToastContainer />
    <Dialog
  open={open}
  onClose={() => handleClose(false)}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle sx={{color:"salmon"}} id="alert-dialog-title">{"Aplicar Cambios"}</DialogTitle>
  <DialogContent>
    <DialogContentText style={{color:"white"}} id="alert-dialog-description">
      Para aplicar los cambios necesitas volver a iniciar sesión.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleClose(false)} color="primary">
      Mas tarde
    </Button>
    <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary',color:"blueviolet" }} />
          Logout
        </MenuItem>
  </DialogActions>
</Dialog>

    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={decodedToken.image } alt='Profile Pic' />
            <Box>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  onChange={onChange}
                 
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 5 }}>
                Allowed PNG or JPEG. Max size of 800K.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            placeholder='johnDoe'
            defaultValue={decodedToken ? decodedToken.name : ''}
            name='name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Last Name'
            placeholder='John Doe'
            defaultValue={decodedToken ? decodedToken.lastname : ''}
            name='lastName'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type='phone'
            label='Phone'
            placeholder='351243952'
            defaultValue={decodedToken ? decodedToken.phone : ''}
            name='phone'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              label='Country'
              defaultValue={decodedToken ? decodedToken.country : ''}
              name='country'
            >
              <MenuItem value='Argentina'>Argentina</MenuItem>
              <MenuItem value='Colombia'>Colombia</MenuItem>
              <MenuItem value='Brasil'>Brasil</MenuItem>
              <MenuItem value='Peru'>Peru</MenuItem>
              <MenuItem value='Bolivia'>Bolivia</MenuItem>
              <MenuItem value='Cuba'>Cuba</MenuItem>
              <MenuItem value='Puerto Rico'>Puerto Rico</MenuItem>
              <MenuItem value='Uruguay'>Uruguay</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type='text'
            label='Address'
            placeholder='calle falsa 123'
            defaultValue={decodedToken ? decodedToken.address : ''}
            name='address'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type='number'
            label='Age'
            placeholder='22'
            defaultValue={decodedToken ? decodedToken.age : ''}
            name='age'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label='Gender'
              defaultValue={decodedToken ? decodedToken.gender : ''}
              name='gender'
            >
              <MenuItem value='Hombre'>Hombre</MenuItem>
              <MenuItem value='Mujer'>Mujer</MenuItem>
              <MenuItem value='Otro'>Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button type='reset' variant='outlined' color='secondary'>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  </CardContent>
);
};

export default TabAccount;