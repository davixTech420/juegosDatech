import { useState, useEffect } from "react";
import { Header } from "../../partials/Header";
import FooterPublic from "../../partials/FooterPublic";
import { Add, Remove } from "@mui/icons-material";
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
  const [categorias, setCategorias] = useState();

   useEffect(() => {
    switch (true) {
      case categorias?.Puzzle >= 25:
        setTotal(total *0.80 ); // 20% de descuento
        break;
      case categorias?.Deportes >= 20 && categorias?.Action >= 15:
        setTotal(total*0.85) // 15% de descuento
        break;
      default:
        console.log("Sin descuento"); // Sin descuento
    }
  }, [categorias]);
 
  useEffect(() => {
    const countCategories = () => {
      const categoryCounts = allProducts.reduce((acc, product) => {
        const categoryNames = Array.isArray(product.genres)
          ? product.genres.map((genre) => genre.name)
          : [product.genres.name];
        categoryNames.forEach((name) => {
          if (acc[name]) {
            acc[name] += product.quantity;
          } else {
            acc[name] = product.quantity;
          }
        });
        return acc;
      }, {});
      setCategorias(categoryCounts);
      console.log("Conteo de Categorías:", categoryCounts);
    };
    if (allProducts.length > 0) {
      countCategories();
    }
  }, [allProducts]);

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
    const newTotal = updatedProducts.reduce(
      (acc, product) => acc + product.metacritic * product.quantity,
      0
    );
    const updatedCart = {
      allProducts: updatedProducts,
      total: newTotal,
      countProducts: updatedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      ),
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAllProducts(updatedProducts);
    setTotal(newTotal);
    setCountProducts(updatedCart.countProducts);
  };

  const handleAdd = (id) => {
    const productIndex = allProducts.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...allProducts[productIndex],
        quantity: allProducts[productIndex].quantity + 1,
      };
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
              {allProducts.length == 0 ?
              <Typography
              variant="h5"
              sx={{ mx: 2, minWidth: "30px", textAlign: "center",alignItems: "center" }}
            >
             El Carrito Esta Vacio
            </Typography> 
             : allProducts.map((product) => (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    p: 2,
                    marginTop: 4,
                    marginBottom: 2,
                  }}
                >
                  <Typography> {product.name} </Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 2,
                      display: "flex",
                      height: { xs: 200, sm: 200 },
                      width: { xs: 250, sm: 150 },
                    }}
                    image={product.background_image}
                    alt="Card Image"
                  />

                  <CardActions sx={{ flexDirection: "row" }}>
                    <IconButton
                      onClick={() => handleRemove(product.id)}
                      aria-label="reduce"
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{ mx: 2, minWidth: "30px", textAlign: "center" }}
                    >
                      {product.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleAdd(product.id)}
                      aria-label="increase"
                      sx={{ left: -6 }}
                    >
                      <Add />
                    </IconButton>

                    <Typography>
                      {" "}
                      ${product.quantity * product.metacritic}{" "}
                    </Typography>
                  </CardActions>
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
                SubTotal
              </Typography>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Articulos({" "}
                    {allProducts.reduce(
                      (acc, product) => acc + product.quantity,
                      0
                    )}{" "}
                    )
                  </Typography>
                  <Typography variant="body2">
                    Descuento De : 
                     { categorias?.Puzzle >= 25 ? '20%' : categorias?.Deportes >= 20 && categorias?.Action >= 15   ? '15%' : '0%' }
                    <br />
                  </Typography>
                  <br />
                  <Typography variant="h4" gutterBottom>
                    SubTotal : {categorias ? total : 0}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    sx={{
                      background: "black",
                      color: "white",
                    }}
                  >
                    Completar La Transaccion
                  </Button>
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
