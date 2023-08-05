import { gsap } from 'gsap';
/*import tailwindConfig from '~/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);*/
//console.log(fullConfig);

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            gsap,
            //fullConfig
            // resolveConfig
        }
    }
});