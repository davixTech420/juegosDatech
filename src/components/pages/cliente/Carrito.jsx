import { useState, useEffect } from "react";
import { Header } from "../../partials/Header";
import FooterPublic from "../../partials/FooterPublic";
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
                          Description of the game goes here. This text provides
                          information about the game.
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
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
              <Typography>
                This grid occupies 30% of the page width. Adjust the content
                here as needed.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <FooterPublic />
    </>
  );
}

export default Carrito;
