import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  LinearProgress,
  TextField,
 Chip,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActionArea,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  AddCircle as AddCircleIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { getGamesVendedor, venderGame } from '../../../services/servicios';

const drawerWidth = 240;

 const salesData = [
  { month: 'Ene', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Abr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
]; 

// Datos de ejemplo para los juegos creados
const createdGames = [
  { id: 1, name: 'Aventura Espacial', price: 59.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Mundo Mágico', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Carrera Extrema', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Puzzle Maestro', price: 29.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Estrategia Galáctica', price: 54.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Aventuras Submarinas', price: 44.99, image: '/placeholder.svg?height=200&width=200' },
];

export default function Component() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const [misGames ,setMisGames] = useState({});


useEffect(() =>{

 const misjuegos = async () => {
const respon = await getGamesVendedor(JSON.parse(localStorage.getItem('logueado')).id);
console.log(respon.data);
setMisGames(respon.data);
console.log(misGames);
 }
misjuegos();
},[]);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const maxSales = Math.max(...salesData.map(item => item.sales));

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { text: 'Ventas', icon: <ShoppingCartIcon />, view: 'sales' },
          { text: 'Crear Juego', icon: <AddCircleIcon />, view: 'create' },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => item.view === 'create' ? handleOpenDialog() : handleViewChange(item.view)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

 
  const renderSalesContent = () => (
    <Grid container spacing={3}>
      {misGames.map((game) => (
        <Grid item key={game.id} xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={game.background_image}
                alt={game.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${game.matacritic}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );






  const [formData, setFormData] = useState({
    sellerId : JSON.parse(localStorage.getItem('logueado')).id,
    name: '',
    peso: '',
    stock: 0,
    vendidas: 0,
    quantity: 1,
    background_image: '',
    metacritic: 0,
    released: '',
    genres: [
      
      {
      name: '',
      slug: ''
    }
  ],
    platforms: [{
      platform: {
        name: '',
        slug: '',
      }
    }],
  });

  const [genreInput, setGenreInput] = useState('');
  const [platformInput, setPlatformInput] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreAdd = () => {
    if (genreInput.trim()) {
      setFormData(prevData => ({
        ...prevData,
        genres: [...prevData.genres, { name: genreInput.trim(), slug: genreInput.trim().toLowerCase() }],
      }));
      setGenreInput('');
    }
  };

  const handlePlatformAdd = () => {
    if (platformInput.trim()) {
      setFormData(prevData => ({
        ...prevData,
        platforms: [...prevData.platforms, { platform: { name: platformInput.trim(), slug: platformInput.trim().toLowerCase() } }],
      }));
      setPlatformInput('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = venderGame(formData);
    console.log(response);
    // Aquí iría la lógica para enviar los datos al servidor
  };










  

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard de Juegos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, p: 3 }}>
        <Toolbar />
       
        {currentView === 'sales' && renderSalesContent()}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Crear Nuevo Juego</DialogTitle>
        <DialogContent>













        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Juego"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Peso (GB)"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Vendidas"
              name="vendidas"
              type="number"
              value={formData.vendidas}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cantidad"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL de la Imagen"
              name="background_image"
              value={formData.background_image}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Metacritic"
              name="metacritic"
              type="number"
              value={formData.metacritic}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de Lanzamiento"
              name="released"
              type="date"
              value={formData.released}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Añadir Género"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenreAdd();
                }
              }}
            />
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {formData.genres.map((genre, index) => (
                <Chip 
                  key={index} 
                  label={genre.name} 
                  onDelete={() => {
                    setFormData(prevData => ({
                      ...prevData,
                      genres: prevData.genres.filter((_, i) => i !== index),
                    }));
                  }} 
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Añadir Plataforma"
              value={platformInput}
              onChange={(e) => setPlatformInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePlatformAdd();
                }
              }}
            />
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {formData.platforms.map((platform, index) => (
                <Chip 
                  key={index} 
                  label={platform.platform.name} 
                  onDelete={() => {
                    setFormData(prevData => ({
                      ...prevData,
                      platforms: prevData.platforms.filter((_, i) => i !== index),
                    }));
                  }} 
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Añadir Juego
            </Button>
          </Grid>
        </Grid>
      </form>


































          {/* <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="gameName"
              label="Nombre del Juego"
              name="gameName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gameDescription"
              label="Descripción del Juego"
              name="gameDescription"
              multiline
              rows={4}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gameGenre-label">Género</InputLabel>
              <Select
                labelId="gameGenre-label"
                id="gameGenre"
                label="Género"
              >
                <MenuItem value="action">Acción</MenuItem>
                <MenuItem value="adventure">Aventura</MenuItem>
                <MenuItem value="rpg">RPG</MenuItem>
                <MenuItem value="strategy">Estrategia</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="gamePrice"
              label="Precio"
              name="gamePrice"
              type="number"
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {imageUrl && (
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Vista previa de la imagen:
                </Typography>
                <img src={imageUrl} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                  URL de la imagen: {imageUrl}
                </Typography>
              </Box>
            )}
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Crear Juego
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}