import { Box, Container, Typography } from "@mui/material";

export const Product = () => {
  const name = localStorage.getItem("name");
  console.log({ name });
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "70px" }}>
      <Box>
        <Box
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)",

            backgroundSize: "cover",
            height: "300px",
          }}
        >
          <img
            src="https://www.fastor.ai/_next/static/media/Logo.5a0cac78.png"
            alt=""
            style={{opacity:"0.5"}}
          />
        </Box>
      </Box>
      <Typography sx={{ textAlign: "left" }} variant="h4" component="h3">
        {name}
      </Typography>
    </Container>
  );
};
