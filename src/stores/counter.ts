import { defineStore } from 'pinia';
import router from '../router';
import { API_URL } from './config';
import axios from 'axios';

const api_url = API_URL;

interface AuthState {
    user: string | null;
    access_token: string | null;
    refresh_token: string | null;
    returnUrl: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: localStorage.getItem('user') || null,
        access_token: localStorage.getItem('access_token') || null,
        refresh_token: localStorage.getItem('refresh_token') || null,
        returnUrl: '/',
    }),
    actions: {
        async login(username: string, password: string) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const url = `${api_url}/login`;

            try {
                const response = await axios.post(url, formData);

                if (response.status === 200) {
                    const { access_token, refresh_token } = response.data;
                    localStorage.setItem('user', username);
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    await this.fetchUserInfo();
                    this.user = username;
                    this.access_token = access_token;
                    this.refresh_token = refresh_token;

                    const redirectUrl = localStorage.getItem('redirectUrl');
                    localStorage.removeItem('redirectUrl');

                    await this.fetchUserImage();
                    await router.push(redirectUrl || this.returnUrl);
                    return true;
                }
                return false;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 403) {
                    await this.refreshToken();
                    try {
                        const retryResponse = await axios.post(url, formData, {
                            headers: {
                                'Authorization': `Bearer ${this.access_token}`,
                            },
                        });
                        if (retryResponse.status === 200) {
                            // Handle successful retry similarly to the initial attempt
                            const { access_token, refresh_token } = retryResponse.data;
                            // ... (rest of the successful login logic)
                            return true;
                        }
                    } catch (retryError) {
                        console.error("Error during login retry:", retryError);
                    }
                } else {
                    console.error("Error during login:", error);
                }
                return false;
            }
        },

        async fetchUserInfo() {
            const username = localStorage.getItem('user');
            const access_token = localStorage.getItem('access_token');
            const url = `${api_url}/user?username=${username}`;

            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                const userData = res.data;
                console.log("User Data:", userData);
                localStorage.setItem('userInfo', JSON.stringify(userData));
                localStorage.setItem('userId', JSON.stringify(userData.id));
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 403) {
                    useAuthStore().logout();
                } else {
                    console.log("Error fetching user by username!", error);
                }
            }
        },

        async fetchUserImage() {
            const userId = localStorage.getItem('userId');
            const url = `${api_url}/images/?userId=${userId}`;
            const access_token = localStorage.getItem('access_token');
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });

                localStorage.setItem('userImage', JSON.stringify(res.data));
            } catch (error) {
                console.log("Error fetching user image!", error);
            }
        },

        async register(username: string, password: string) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const url = `${api_url}/register`; // replace with your register endpoint

            try {
                const response = await axios.post(url, formData);
                return response.status === 201;
            } catch (error) {
                console.error("Error during registration:", error);
                return false;
            }
        },

        async refreshToken() {
            try {
                const response = await axios.get(`${api_url}/api/token/refresh`, {
                    headers: {
                        'Authorization': `Bearer ${this.refresh_token}`,
                    },
                });

                if (response.status === 200) {
                    const { access_token } = response.data;
                    localStorage.setItem('access_token', access_token);
                    this.access_token = access_token;
                }
            } catch (error) {
                this.logout();
            }
        },

        logout() {
            this.user = null;
            this.access_token = '';
            this.refresh_token = '';
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userId');
            localStorage.removeItem('userImage');
            setTimeout(() => {
                router.push('/').then(r => r);
            }, 500);
        },
    },
});