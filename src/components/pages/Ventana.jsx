import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function Ventana({ openDialog, closeDialog, product, onAddProduct }) {
 

  if (!openDialog) {
    return null;
  }
  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <center>
        <DialogTitle>{product.name}</DialogTitle>
      </center>
      <DialogContent>
        <Grid container spacing={2} sx={{}}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardMedia
              component="img"
              image={product.background_image}
              alt="Imagen"
              height="240"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card>
              <CardContent>
<center><h2>Genero</h2></center>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {product.genres.map((genero) => (
                    <Typography variant="h5" component="div">
                      {genero.name}
                    </Typography>
                  ))}
                </Box>
                <center><h2>Plataformas</h2></center>
                <Box>
                {product.platforms.map((platformData) => (
    <Typography variant="caption" component="div" key={platformData.platform.id}>
      {platformData.platform.name}
    </Typography>
  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display:'flex',  justifyContent:'space-around' }} >
        <Button onClick={closeDialog} sx={{ color:'red' }}>  < CloseIcon/>  </Button>
        <Button type="submit" onClick={() => onAddProduct(product)}><AddShoppingCartIcon/></Button>
      </DialogActions>
    </Dialog>
  );
}
