import react from "react";
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
} from "@mui/material";

export default function Ventana({ openDialog, closeDialog, product }) {
  if (!openDialog) {
    return null;
  }
  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <center>
        <DialogTitle>{product.name}</DialogTitle>
      </center>
      <DialogContent>
        <Grid container spacing={2} sx={{  }}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardMedia
              component="img"
              image={product.background_image}
              alt="Imagen"
              height="240"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Título
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Información adicional
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
