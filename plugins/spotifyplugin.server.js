
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

