import { useState} from 'react'
import { Header } from '../../partials/Header'
import FooterPublic from '../../partials/FooterPublic'
import { Container, Box, Avatar,Typography,TextField, FormControlLabel,Checkbox,Button,Grid,Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginUser } from '../../../services/servicios';

function Login() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });


  const handleSubmit = async (e) =>{
    e.preventDefault();
  
    try {
    
      // Realiza una consulta para obtener los usuarios con el email proporcionado
    const response = await loginUser(formData.email);
  

   if (response.data.length > 0 && response.data[0].email === formData.email && response.data[0].password === formData.password) {
      alert('Login exitoso');    
      localStorage.setItem('logueado', JSON.stringify(response.data[0]));
     
      window.location.href = "cliente/dashboard";
    } else {
      alert('Email o contraseña incorrectos');
    }
    } catch (error) {
      console.log(error);
      alert('Hubo un error en el servidor, por favor intenta nuevamente.');
    }
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
                Inicia Secion
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  value={formData.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  value={formData.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  onSubmit={handleSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                
              </Box>
            </Box>
          
          </Container>
    
    
    
    
    
    
    
    
        <FooterPublic/>
        </>  
  )
}

export default Login
