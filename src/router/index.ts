import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/UserView/HomeView.vue';
import ProfileView from '@/views/UserView/ProfileView.vue';
import SearchCuiseView from '@/views/UserView/SearchCuiseView.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/profile',
            name: 'ProfileView',
            component: ProfileView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/',
            name: 'HomeView',
            component: HomeView
        },
        {
            path: '/SearchCuiseView',
            name: 'SearchCuiseView',
            component: SearchCuiseView
        },
        {
            path: '/cruise/:id',
            name: 'CruiseDetails',
            component: () => import('@/components/User/CruiseInformation/C0_CruiseDetailsView.vue')
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            if (to.hash) {
                resolve({el: to.hash});
            } else if (savedPosition) {
                resolve(savedPosition);
            } else {
                resolve({left: 0, top: 0});
            }
        });
    }
});

export default router;
