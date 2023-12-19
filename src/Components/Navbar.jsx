import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";

import { Link } from "react-router-dom";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: "orange",
       
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Typography
          variant="h5"
          component="h2"          
          sx={{
            fontWeight: 700,
            color: "#14192d",
          }}
        >
          Feature Marketplace
        </Typography>
        <Box sx={{ display: { xs: "block", sm: "none" }}}></Box>
        <Box sx={{ alignItems: "center" }}>
          <Button
            component={Link}
            to={"/first-factor"}
            variant="contained"
            sx={{              
              px: 2.6,
              py: 1,
              fontSize: "0.6rem",
              textTransform: "capitalize",
              borderRadius: 0,
              borderColor: "#14192d",
              color: "#fff",
              backgroundColor: "#14192d",
              "&&:hover": {
                backgroundColor: "#343a55",
              },
              "&&:focus": {
                backgroundColor: "#343a55",
              },
            }}
          >
            User Login
          </Button>
          <Button
            component={Link}
            to={"https://adminstorefeaturemesh.azurewebsites.net/AdminM/log"}
            variant="outlined"
            sx={{
              px: 2,
              py: 1,
              fontSize: "0.6rem",
              textTransform: "capitalize",
              borderRadius: 0,
              color: "#fff",
              backgroundColor: "transparent",
              borderColor: "#fff",
              "&&:hover": {
                color: "#343a55",
                borderColor: "#343a55",
              },
              "&&:focus": {
                color: "#343a55",
                borderColor: "#343a55",
              },
            }}
          >
            Admin Login
          </Button>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
