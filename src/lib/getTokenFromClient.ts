import { authClient } from "./auth-client";

const getTokenFromClient = async() => {
        const {data, error} = await authClient.token()
        if (error){
            return 'Error'
        }
        const token = data?.token
        return token
};

export default getTokenFromClient;