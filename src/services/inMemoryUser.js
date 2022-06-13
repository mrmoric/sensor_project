import inMemoryJwt from './inMemoryJwtService';

const inMemoryUser = () => {

    const isAdmin = () => {

        let tokenPayload = inMemoryJwt.getTokenPayload();

        if (tokenPayload['user_role'] === 'administrator') return true;
        else return false;
    };

    const isDistributor = () => {

        let tokenPayload = inMemoryJwt.getTokenPayload();

        if (tokenPayload['user_role'] === 'distributor') return true;
        else return false;
    };

    const getUserRole = () => {

        let tokenPayload = inMemoryJwt.getTokenPayload();

        return tokenPayload['user_role'] ? tokenPayload['user_role'] : false;
    }

    const getUsername = () => {
        let tokenPayload = inMemoryJwt.getTokenPayload();

        return tokenPayload['username'];
    }

    const getCompanyName = () => {
        let tokenPayload = inMemoryJwt.getTokenPayload();

        return tokenPayload['company_name'];
    }

    return {
        isAdmin,
        isDistributor,
        getUsername,
        getCompanyName,
        getUserRole,
    };
};

export default inMemoryUser();