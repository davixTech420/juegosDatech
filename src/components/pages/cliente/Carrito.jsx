import { useState, useEffect } from "react";
import { Header } from "../../partials/Header";
import FooterPublic from "../../partials/FooterPublic";
import { Add, Remove } from '@mui/icons-material';
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";


function Carrito() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
 
  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      const parsedCart = JSON.parse(cartFromStorage);
      setAllProducts(parsedCart.allProducts);
      setTotal(parsedCart.total);
      setCountProducts(parsedCart.countProducts);
    }
  }, []);

 
  const updateCart = (updatedProducts) => {
    const newTotal = updatedProducts.reduce((acc, product) => acc + product.metacritic * product.quantity, 0);
    const updatedCart = {
      allProducts: updatedProducts,
      total: newTotal,
      countProducts: updatedProducts.reduce((acc, product) => acc + product.quantity, 0),
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setAllProducts(updatedProducts);
    setTotal(newTotal);
    setCountProducts(updatedCart.countProducts);
  };
 
 /*  const updateCart = (updatedProducts) => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      const updatedCart = { ...storedCart, allProducts: updatedProducts };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setAllProducts(updatedProducts);
    }
  } */
 

 
   const handleAdd = (id) => {
    const productIndex = allProducts.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...allProducts[productIndex], quantity: allProducts[productIndex].quantity + 1 };
      const updatedAllProducts = [...allProducts];
      updatedAllProducts[productIndex] = updatedProduct;
      updateCart(updatedAllProducts);
      
    }
  }; 
  

  const handleRemove = (id) => {
    const productIndex = allProducts.findIndex((product) => product.id === id);
    if (productIndex !== -1 && allProducts[productIndex].quantity > 0) {
      const updatedProduct = {
        ...allProducts[productIndex],
        quantity: Math.max(allProducts[productIndex].quantity - 1, 0),
      };
      const updatedAllProducts = [...allProducts];
      updatedAllProducts[productIndex] = updatedProduct;
      updateCart(updatedAllProducts);
    }
  };
  
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
      <Box sx={{ flexGrow: 1, padding: 2, marginBottom: 10 }}>
        <Grid container spacing={2}>
          {/* Main Content Grid (70% Width) */}
          <Grid item xs={12} sm={8} md={7} sx={{ mb: 2, marginTop: 2 }}>
            <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
              {allProducts.map((product) => (
                <Card
                key={product.id}

                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "100%",
                    marginTop: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.background_image}
                    alt="Game Image"
                    sx={{
                      borderRadius: 3,
                      width: { xs: 150, sm: 200 },
                      height: { xs: 250, sm: "auto" },
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
                    <Box sx={{ flex: 1, padding: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          sadsad
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
<Box 
      sx={{
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '150px',
        mx: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        p: 1
      }}
    >
      <IconButton onClick={() => handleRemove(product.id)} aria-label="reduce">
        <Remove />
      </IconButton>
      <Typography 
        variant="body1" 
        sx={{ mx: 2, minWidth: '30px', textAlign: 'center' }}
      >
        {product.quantity}
      </Typography>
      <IconButton onClick={() => handleAdd(product.id)} aria-label="increase">
        <Add />
      </IconButton>
    </Box>






                        <Button size="small">Buy Now</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Paper>
          </Grid>

          {/* Sidebar Grid (30% Width) */}
          <Grid item xs={12} sm={4} md={5}>
            <Paper
              elevation={3}
              sx={{ padding: 2, height: "100%", marginTop: 2 }}
            >
              <Typography variant="h4" gutterBottom>
                Sidebar
              </Typography>
              <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
        
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>








            </Paper>
          </Grid>
        </Grid>
      </Box>

      <FooterPublic />
    </>
  );
}

export default Carrito;
