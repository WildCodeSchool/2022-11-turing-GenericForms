import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Grid, Button, Container } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import { CHECK_TOKEN, LOGIN } from "../../services/auth.query";
import jwt_decode from "jwt-decode";

type JwtToken = {
  userId: number;
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SigningForm>({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      let decodedToken: JwtToken = jwt_decode(data.login.token);
      console.log("DECODED TOKEN", decodedToken);
      localStorage.setItem("userId", `${decodedToken.userId}`);
      navigate("/dashboard");
    },
    onError(error) {
      console.log("ERROR LOGIN ", error.message);
    },
  });

  const { refetch } = useQuery(CHECK_TOKEN, {
    onCompleted(data) {
      console.log("CHECK TOKEN", data.checkToken.valid);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      refetch();
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(token) {
      localStorage.removeItem("token");
    }
    login({
      variables: {
        loginInput: {
          email: form.email,
          password: form.password,
        },
      },
    });
  };


  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
    <Grid container maxWidth='sm'>
      <Grid item xs={8} />
      <Grid item xs={4} >
        <Button variant="contained" color="primary">
          S'inscrire
        </Button>
      </Grid>
    </Grid>
    <LoginForm setForm={setForm} handleSubmit={handleSubmit} />
    </Container>
    
  );
}

export default Login;
