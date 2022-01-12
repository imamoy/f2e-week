import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Result from '../views/Result.vue';
import HotTravel from '../views/HotTravel.vue';
import Taipei from '../views/Taipei.vue';
import Kaohsiung from '../views/Kaohsiung.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/result',
        name: 'Result',
        component: Result,
    },
    {
        path: '/hotTravel',
        name: 'HotTravel',
        component: HotTravel,
    },
    {
        path: '/Taipei',
        name: 'Taipei',
        component: Taipei,
    },
    {
        path: '/Kaohsiung',
        name: 'Kaohsiung',
        component: Kaohsiung,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
