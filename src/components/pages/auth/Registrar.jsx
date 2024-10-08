import { useState, useEffect} from 'react'
import { Header } from '../../partials/Header'
import FooterPublic from '../../partials/FooterPublic'
import { Container, Box, Avatar,Typography,TextField,Button, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registrarUser } from '../../../services/servicios';

function Registrar() {
    const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [logueado ,setLogueado] = useState(localStorage.getItem('logueado'));


  useEffect(() => {
    if (logueado) {
     window.location.href = "/cliente/dashboard";
    }
}, []);



  const handleSubmit = async (e) => {
    const enviarData = await registrarUser(data);
    enviarData.status ? window.location.href="login" : console.log("Error");
    }
  return (
<>
<Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />

<Container sx={{  marginBottom:10 }} component="main" maxWidth="xs">
    
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setData({...data, email: e.target.value})}
              value={data.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => setData({...data, password: e.target.value})}
              value={data.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Crear Cuenta
            </Button>
            
          </Box>
        </Box>
      
      </Container>








    <FooterPublic/>
    </>  
  )
}

export default Registrar
