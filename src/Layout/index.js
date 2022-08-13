import Header from "./Header";
import Footer from "./Footer";
import { Paper } from "@mui/material";

function Layout(props) {
  return (
    <>
      <Header />
      <Paper
        sx={{
          minHeight: "100%",
          height: "auto",
          marginTop: "-56px",
          paddingTop: "56px",
          paddingBottom: "56px",
          marginBottom: "-56px",
        }}
        elevation={0}
        component="main"
      >
        {props.children}
      </Paper>
      <Footer />
    </>
  );
}

export default Layout;
