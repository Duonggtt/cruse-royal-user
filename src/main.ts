import './assets/main.css'
import PrimeVue from "primevue/config";

import AnimateOnScroll from 'primevue/animateonscroll';

//#region  Import Custom Components

import Navbar from "@/components/User/Navbar.vue";
import Footer from "@/components/User/Footer.vue";

import Login from "@/components/User/Account_Auth/Login.vue";
import Reg from "@/components/User/Account_Auth/Register.vue";
import ForgotPassword from "@/components/User/Account_Auth/ForgotPassword.vue";
import Profile from "@/components/User/Account_Auth/Profile.vue";

import SearchYachts from "@/components/User/Home/H1_SearchYachts.vue";
import ListCruiseView from "@/components/User/Home/H2_ListCruiseView.vue";

import BreadcrumbDetail from "@/components/User/CruiseInformation/C1_BreadcrumbDetail.vue";
import YachtTitle from "@/components/User/CruiseInformation/C2_YachtTitle.vue";
import Highlight from "@/components/User/CruiseInformation/C3_Highlight.vue";
import RomCruise from "@/components/User/CruiseInformation/C4_RomCruise.vue";
import Introduce from "@/components/User/CruiseInformation/C5_Introduce.vue";
import Rules from "@/components/User/CruiseInformation/C6_Rules.vue";
import Evaluate from "@/components/User/CruiseInformation/C7_Evaluate.vue";
import OderForm from "@/components/User/CruiseInformation/OderForm.vue";
import RoomInfo from "@/components/User/CruiseInformation/RoomInfo.vue";




import ProfileView from "@/views/UserView/ProfileView.vue";
import HomeView from "@/views/UserView/HomeView.vue";
import LoginView from "@/views/UserView/LoginView.vue";
import CruiseDetailsView from "@/components/User/CruiseInformation/C0_CruiseDetailsView.vue";

//#endregion Import Custom Components

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';
import ToastService from "primevue/toastservice";


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities',
                darkModeSelector: 'system',
                cssLayer: false,
            },

        }
    }
});
app.directive('animateonscroll', AnimateOnScroll);
app.use(PrimeVue, {ripple: true});

app.component("Login", Login);
app.component("Reg", Reg);
app.component("ForgotPassword", ForgotPassword);
app.component("Navbar", Navbar);
app.component("Profile", Profile);
app.component("ProfileView", ProfileView);
app.component("HomeView", HomeView);
app.component("LoginView", LoginView);
app.component("SearchYachts", SearchYachts);
app.component("Footer", Footer);

app.component("ListCruiseView", ListCruiseView)
app.component("YachtTitle", YachtTitle)
app.component("BreadcrumbDetail", BreadcrumbDetail)
app.component("CruiseDetailsView", CruiseDetailsView)
app.component("Highlight", Highlight)
app.component("RomCruise", RomCruise)
app.component("Introduce", Introduce)
app.component("Rules", Rules)
app.component("Evaluate", Evaluate)
app.component("OderForm", OderForm)
app.component("RoomInfo", RoomInfo)


app.mount('#app')


