import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import Vue from 'vue';
import App from './App.vue';
import VueFirestore from 'vue-firestore';
import router from './router';
import store from './store';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

Vue.use(VueFirestore);

new Vue({
    el: "#app",
    template: '<app></app>',
    components: {App},
    router,
    store
});
