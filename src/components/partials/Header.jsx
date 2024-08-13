import { useState } from "react";
import Badge from "@mui/material/Badge";
import { Box,Typography ,Avatar,Button ,Divider,Menu,MenuItem} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));


export const Header = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {

  const [openProfile ,setOpenProfile] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
 
  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);

    setTotal(total - product.metacritic * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
<>
<Box sx={{
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', borderRadius:4,
  position: 'relative', width: '100%',display:'flex',justifyContent:'space-between',alignItems:'center' }}>








<Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 30, height: 30 }}
  onClick={() => navigate("/Games")}
/>
      <Box
        sx={{ display: 'flex' }}
        onClick={() => setActive(!active)}
      >
        <IconButton aria-label="cart">
          <Badge badgeContent={allProducts.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
      <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
               onClick={() => setOpenProfile(true)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
             
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openProfile}
               onClose={() => setOpenProfile(false)}
              >
                <MenuItem onClick={() => navigate("/Registrar")} >Registrar</MenuItem>
                <MenuItem onClick={() => navigate("/Login")} >Login</MenuItem>
              </Menu>
            </div>
      <Box
        sx={{
          display: active ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          right: 0,
          width: '40%',
          maxHeight: '400px',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 3,
          p: 2,
          zIndex:999
        }}
      >
        {allProducts.length ? (
          <>
            <Box sx={{ mb: 2 }}>
              {allProducts.map((product) => (
                <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                      {product.quantity}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                      ${product.metacritic}
                    </Typography>
                  </Box>
                  <IconButton aria-label="remove" onClick={() => onDeleteProduct(product)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total}</Typography>
            </Box>

            <Button  variant="contained" color="secondary" fullWidth onClick={onCleanCart}>
              Vaciar Carrito
            </Button>
            
            <Button sx={{ marginTop:2 }} variant="contained" color="secondary" fullWidth onClick={() => navigate('/cliente/carrito')}>
            Ver Carrito
            </Button>
            
          </>
        ) : (
          <Typography variant="body2">El carrito está vacío</Typography>
        )}
      </Box>
    </Box>


    </>
  );
};
