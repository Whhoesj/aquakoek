import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import UserPage from '../pages/UserPage.vue';
import ErrorPage from '../pages/ErrorPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/users',
            name: 'users',
            component: UserPage,
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
