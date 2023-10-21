import SpotifyWebApi from 'spotify-web-api-node';
import { clientId, clientSecret } from './local'

const loginToSpotify = async () => {
    var scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public'];
    const redirectUri = 'https://zouga.vercel.app/music';
    const state = 'playing-state';

    let spotify = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri
    });

    // Create the authorization URL
    var authorizeURL = spotify.createAuthorizeURL(scopes, state);
    console.log(authorizeURL);

    // console.log(process.env.USER_CODE);
    // const { body: { access_token, refresh_token } } = await spotify.authorizationCodeGrant(process.env.USER_CODE)
    // let { body } = await spotify.clientCredentialsGrant()
    
    // const access_token = process.env.ACCESS_TOKEN;
    const refresh_token = process.env.REFRESH_TOKEN;

    spotify.setRefreshToken(refresh_token);
    const { body: { access_token }} = await spotify.refreshAccessToken()

    console.log(access_token);
    console.log(refresh_token);
    
    return { access_token, refresh_token };
}

export default defineEventHandler(async (event) => {
    const token = await loginToSpotify();

    return {
        token
    }
});