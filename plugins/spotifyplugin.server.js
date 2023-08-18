import SpotifyWebApi from 'spotify-web-api-node';

const loginToSpotify = async () => {
    let spotify = new SpotifyWebApi({
        clientId: "6783716c8cc34ce5acf270057c2c9c37",
        clientSecret: "a3e1fc3a971140e2896df08ada7d6065"
    });

    let { body } = await spotify.clientCredentialsGrant()
    
    return body["access_token"];
}

// const accessToken = await loginToSpotify();
// console.log(accessToken);

export default defineNuxtPlugin(( nuxtApp) =>{

    return {
        provide: {
            groo: "foo",
            //accessToken
        }
    }
});

