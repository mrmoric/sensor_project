import { createContext } from 'react';

export const AuthContext = createContext({
    isUserLogged: false,
    changeIsUserLogged: () => {},
    inMemoryUser: false,
});