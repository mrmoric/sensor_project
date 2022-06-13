import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import Header from './components/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';

import Login from './pages/Login';

import { ajaxRefreshToken } from './services/authenticationService';
import inMemoryJwtService from './services/inMemoryJwtService';
import inMemoryUser from './services/inMemoryUser';

import { AuthContext } from './context';
import { adminRoutes, distributorRoutes } from './router/routes';


const theme = createTheme({
    typography: {
        body1: {
            fontSize: "16px",
        },
        button: {
            fontSize: "18px",
        },
    },
    palette: {
        type: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#333333',
        },
        background: {
            paper: '#333333',
        }
    },
    mixins: {
        toolbar: {
            height: "52px",
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    backgroundColor: '#0071bd',
                }
            },
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    fontSize: "18px",

                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: 'white',

                }
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    '& .MuiToolbar-root': {
                        width: '380px',
                        flexShrink: 0,
                    }

                }
            },
        },

    },
});


const Wrapper = styled('div')({
    height: "calc(100vh - " + theme.mixins.toolbar.height + ")",
    display: "flex",
    flexDirection: "row",
});

const AlertToken = styled(Alert)({
    alignSelf: "flex-end",
    width: "100%",
});



export default function App() {


    const [isUserLogged, setIsUserLogged] = useState(false);

    const changeIsUserLogged = (isLogged, access_token) => {
        if (isLogged === false) {
            inMemoryJwtService.deleteToken();
        } else {
            inMemoryJwtService.setToken(access_token);
        }

        setIsUserLogged(isLogged);

    }

    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {

        ajaxRefreshToken()
            .then(response => {

                const { access_token, } = response;
                if (access_token) {
                    changeIsUserLogged(true, access_token)
                }

                setIsAppReady({ status: 'ok' });
            }).catch((e) => {
                setIsAppReady({ status: 'error', message: e.message });
            });

    }, []);

    return (
        <AuthContext.Provider value={{
            isUserLogged,
            changeIsUserLogged,
            inMemoryUser
        }}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {!isAppReady && <LoadingSpinner />}

                    {isAppReady &&
                        <React.Fragment>
                            <Header />
                            <Wrapper>

                                {isAppReady['status'] === 'error' && <AlertToken severity="error">{isAppReady['message']}</AlertToken >}


                                {isUserLogged &&
                                    <React.Fragment>
                                        <Routes>
                                            {inMemoryUser.isAdmin() ?
                                                adminRoutes.map(route => <Route key={route.path} exact={route.exact} path={route.path} element={<route.element {...route.elementProps} />} />)
                                                :
                                                distributorRoutes.map(route => <Route key={route.path} exact={route.exact} path={route.path} element={<route.element {...route.elementProps} />} />)}

                                            <Route exact path="*" element={<Navigate to="/dashboard" />} />
                                        </Routes>
                                        <Sidebar />
                                    </React.Fragment>

                                }

                                {isAppReady && isAppReady['status'] === 'ok' && !isUserLogged && <Login />}
                            </Wrapper>
                        </React.Fragment>
                    }

                </ThemeProvider>
            </BrowserRouter>
        </AuthContext.Provider >

    );
}