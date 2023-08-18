import SpotifyWebApi from 'spotify-web-api-node';
import { clientId, clientSecret } from './local'

const loginToSpotify = async () => {
    let spotify = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET
    });

    let { body } = await spotify.clientCredentialsGrant()
    
    return body["access_token"];
}

export default defineEventHandler(async (event) => {
    const token = await loginToSpotify();
    
    return {
        token
    }
});