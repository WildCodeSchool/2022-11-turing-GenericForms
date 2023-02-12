import { TextField, Stack, Button, Grid, Container, Link, Box, FormControlLabel, Typography, CssBaseline, Checkbox  } from '@mui/material';

interface LoginFormProps {
    setForm: React.Dispatch<React.SetStateAction<SigningForm>>;
    handleSubmit: (e: any) => void;
}

//TODO : add a password visible option

function LoginForm({setForm, handleSubmit}: LoginFormProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form: SigningForm) => ({ ...form, [e.target.name]: e.target.value }));
      };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
            Bienvenue sur Generic Forms !
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder='john.doe@test.fr'
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
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Se connecter
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Mot de passe oublié ?
                </Link>
                </Grid>
                <Grid item>
                <Link href="#" variant="body2">
                    {"Pas encore de compte ?"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
    )
}

export default LoginForm;
