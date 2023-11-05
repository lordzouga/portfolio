import SpotifyWebApi from 'spotify-web-api-node';

const ACCESS_KEY = 'access';

async function getSpotifyToken() {
    let token = null;
    const tokenObj = await useStorage(ACCESS_KEY).getItem('token');

    const writeNewToken = async () => { // generates a new token every time
        const { access_token } = await loginToSpotify(); // get new token

        await useStorage(ACCESS_KEY).setItem('token', { access_token });
        await useStorage(ACCESS_KEY).setItem('time', { when: Date.now() / 1000 }); // update the time saved

        return access_token;
    }

    if (tokenObj) {
        const timeObj = await useStorage(ACCESS_KEY).getItem('time');

        if (Date.now() / 1000 - timeObj.when >= (45 * 60)){ // if it has been more than 45 minutes
            token = await writeNewToken();
        } else {
            const { access_token } = await useStorage(ACCESS_KEY).getItem('token');

            token = access_token;
        }
    } else {

        console.log("using old token");
        
        token = await writeNewToken();
    }

    return { access_token: token }
}

const loginToSpotify = async () => {
    var scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-library-read', 'playlist-modify-public'];
    const redirectUri = 'https://zouga.vercel.app/music';
    const state = 'playing-state';

    let spotify = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri
    });

    // Create the authorization URL
    var authorizeURL = spotify.createAuthorizeURL(scopes, state);
    // console.log(authorizeURL);

    // console.log(process.env.USER_CODE);
    // const { body: { access_token, refresh_token } } = await spotify.authorizationCodeGrant(process.env.USER_CODE)
    // let { body } = await spotify.clientCredentialsGrant()
    
    // const access_token = process.env.ACCESS_TOKEN;
    const refresh_token = process.env.REFRESH_TOKEN;

    spotify.setRefreshToken(refresh_token);
    const { body: { access_token }} = await spotify.refreshAccessToken()

    // console.log(access_token);
    // console.log(refresh_token);
    
    return { access_token };
}

export default defineEventHandler(async (event) => {
    const token = await getSpotifyToken();

    return {
        token
    }
});