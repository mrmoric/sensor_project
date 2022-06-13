import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import { ajaxLogin } from '../services/authenticationService';
import { useContext } from 'react';
import { AuthContext } from '../context';


export default function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { isUserLogged, changeIsUserLogged } = useContext(AuthContext);
    const [isLogining, setIsLogining] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const onChangeHandler = event => {
        const value = event.target.value;

        switch (event.target.name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const onSubmitHandler = event => {
        event.preventDefault();

        const user = {
            username,
            password
        };

        if (!user.username || !user.password) {
            setIsError("You have to input your credentials");
            return;
        }

        setIsLogining(true);

        ajaxLogin(user).then((response) => {
            setIsLogining(false);

            const { access_token } = response;

            if (access_token) {
                changeIsUserLogged(true, access_token);
            }

        }).catch(e => {
            setIsLogining(false);
            setIsError(e.message);
        });


    };

    return (
        <Container component="main" maxWidth="sm">

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',
                    minHeight: '100%',
                }}
            >
                <Box component="form" onSubmit={onSubmitHandler} noValidate>
                    <TextField
                        onChange={onChangeHandler}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"

                        autoComplete="username"
                        autoFocus

                    />
                    <TextField
                        onChange={onChangeHandler}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"

                        type="password"
                        id="password"
                        autoComplete="current-password"

                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    {isError && <Alert severity="error">{isError}</Alert >}

                    {isUserLogged && <Alert severity="success">Success</Alert >}

                </Box>

                {isLogining && <LoadingSpinner />}

            </Box>
        </Container>
    );
}
