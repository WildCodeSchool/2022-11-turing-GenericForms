import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { Grid, Button, Container } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import { LOGIN } from "../../services/auth.query";

function Login() {

  const [form, setForm] = useState<SigningForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("FORM", form);
  }, [form]);


  const navigate = useNavigate();
  const [login, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      console.log("DATA", data);
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login.userId);
      navigate("/dashboard");
    },
    // onError(error) {
    //   console.log("ERROR", error.message);
    // },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
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

    {/* <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          value={form.email}
          name={"email"}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          value={form.password}
          name={"password"}
          onChange={handleChange}
        />
        <button disabled={loading}>Se connecter</button>
        {error && <p>{error.message}</p>}
      </form>

      <Link to={"/auth/register"}>Pas encore inscrit?</Link>
    </div> */}

    </Container>
    
  );
}

export default Login;
