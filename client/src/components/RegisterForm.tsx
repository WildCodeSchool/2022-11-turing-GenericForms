import React, { FC } from "react";
import {
  TextField,
  Stack,
  Button,
  Grid,
  Container,
  //  Link,
  Box,
  FormControlLabel,
  Typography,
  CssBaseline,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

//? Module augmentation to add custom colors on element (Button, etc...)
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

interface RegisterFormProps {
  setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
  handleSubmit: (e: any) => void;
}

function RegisterForm({ setForm, handleSubmit }: RegisterFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form: RegisterForm) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Bienvenue sur Generic Forms !</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={false}
              fullWidth
              id="firstName"
              label="Firstname"
              name="firstName"
              autoComplete="firstname"
              autoFocus
              placeholder="john"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Lastname"
              name="lastName"
              autoComplete="lastname"
              autoFocus
              placeholder="does"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="john.doe@test.fr"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="" color="primary" />}
              label="J'accepte les conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="custom"
            >
              S'inscrire'
            </Button>
          </Box>
          <Link to={"/auth/login"}>Déjà inscrit?</Link>
        </Box>
      </Container>
    </div>
  );
}

export default RegisterForm;
