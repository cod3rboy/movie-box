import React from "react";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <Container
      sx={{
        borderTop: "1px solid #eee",
        height: "56px",
        overflow: "hidden",
        padding: "1rem",
      }}
      component="footer"
    >
      <Typography sx={{ textAlign: "center" }} variant="body2" color="gray">
        Made by{" "}
        <a href="https://github.com/cod3rboy" rel="noreferrer" target="_blank">
          cod3rboy
        </a>
      </Typography>
    </Container>
  );
}

export default Footer;
