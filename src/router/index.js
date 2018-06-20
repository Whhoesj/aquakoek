import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ErrorPage from '../pages/ErrorPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/404',
            component: ErrorPage
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
