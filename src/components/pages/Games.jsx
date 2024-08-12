import { useState, useEffect } from "react";
import { Header } from "../partials/Header";
import FooterPublic from "../partials/FooterPublic";
import Ventana from "./Ventana";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const Games = () => {
  /*este es el stado del juego seleccionado */
  const [gameSelect, setGameSelect] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [games, setGames] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        allProducts,
        total,
        countProducts,
      })
    );
  };

  useEffect(() => {
    saveCartToLocalStorage();
  }, [allProducts, total, countProducts]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: "0f0ff16c99a94d289daf136852cd3b79", // Reemplaza con tu propia API key
            page_size: 30, // Número de juegos a traer
          },
          mode: "no-cors",
        });
        console.log(response.data.results);

        setGames(
          response.data.results.map((game) => ({ ...game, quantity: 1 }))
        );
      } catch (error) {
        console.error("Error al obtener los games:", error);
      }
    };

    fetchGames();
  }, []);
  useEffect(() => {
    setFilteredGames(
      games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, games]);

  const onAddProduct = (product) => {
    if (product.quantity > 0) {
      setOpenAlert(true);
    }
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.metacritic * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.metacritic * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Agregado Al Carrito Exitosamente
        </Alert>
      </Snackbar>

      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          flexGrow: 1,
          "& .MuiTabs-flexContainer": {
            justifyContent: "center", // Centrar los tabs
          },
        }}
      >
        <Tab label="Accion" />
        <Tab label="Shooter" />
        <Tab label="Puzle" />
        <Tab label="Supervivencia" />
        <Tab label="RPG" />
        <Tab label="Option 6" />
      </Tabs>
      <TextField
        label="Buscar juegos"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2} sx={{ marginBottom: 5 }}>
        {filteredGames.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3}>
              <Card key={product.id}>
                <CardMedia
                  onClick={() => {
                    setOpenDialog(true);
                    setGameSelect(product);
                  }}
                  component="img"
                  alt="green iguana"
                  height="240"
                  image={product.background_image}
                />
                <CardContent
                  sx={{
                    height: 10,
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-around" }}>
                  <Button size="full" onClick={() => onAddProduct(product)}>
                    <AddShoppingCartIcon />
                    Añadir
                  </Button>
                  <Typography variant="h6" color="text.secondary">
                    ${product.metacritic}
                  </Typography>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
        <Ventana
          openDialog={openDialog}
          closeDialog={closeDialog}
          product={gameSelect}
          onAddProduct={onAddProduct}
        />
      </Grid>
      <FooterPublic />
    </>
  );
};
export default Games;
