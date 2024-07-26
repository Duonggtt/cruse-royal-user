<template>
  <Disclosure as="nav" class="bg-white dark:bg-[#121212] sticky top-0 z-50 shadow-md" v-slot="{ open }">

    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5"/>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center animate-duration-1000 animate-ease-in-out" @click="$router.push('/home')" v-animateonscroll="{ enterClass: 'animate-fadeinleft'  }">
            <img class="h-10 w-auto" src="/Logo/Logo-Cruise-Royal.svg" alt="Your Company"/>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" @click="$router.push(item.href)"
                 class="rounded-md px-3 py-2 text-sm font-bold text-gray-600 hover:border-blue-400 hover:border-1 cursor-pointer"
                 :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button"
                  class="relative rounded-full  p-1 text-gray-600 hover:scale-105 ">
            <span class="absolute -inset-1.5"/>
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true"/>
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-300"
                          @click="handleAvatarClick">
                <span class="absolute -inset-1.5"/>
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 object-cover rounded-full" :src="avatarImage" alt=""/>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems v-if="showMenu" class="absolute right-0 z-10 mt-2 min-w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <p v-if="!authStore.user" @click="handleAvatarClick" :class="[active ? 'bg-gray-100' : '', 'flex gap-3 px-4 py-2 text-sm text-gray-700 cursor-pointer']">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6998 9.3001C14.6998 10.7913 13.491 12.0001 11.9998 12.0001C10.5086 12.0001 9.2998 10.7913 9.2998 9.3001C9.2998 7.80893 10.5086 6.6001 11.9998 6.6001C13.491 6.6001 14.6998 7.80893 14.6998 9.3001Z" stroke="#000000" stroke-width="1.6" class="my-path"></path>
                      <path d="M6.6001 19.2002C6.6001 16.7149 9.01776 14.7002 12.0001 14.7002C14.9824 14.7002 17.4001 16.7149 17.4001 19.2002" stroke="#000000" stroke-width="1.6" class="my-path"></path>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.6" class="my-path"></path>
                    </svg>
                    Đăng ký/ Đăng nhập
                  </p>
                  <p v-else @click="$router.push('/profile')" :class="[active ? 'bg-gray-100' : '', 'flex gap-3 px-4 py-2 text-sm text-gray-700 cursor-pointer']">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 7C5 5.11438 5 4.17157 5.58579 3.58579C6.17157 3 7.11438 3 9 3H15C16.8856 3 17.8284 3 18.4142 3.58579C19 4.17157 19 5.11438 19 7V17.1136C19 18.8158 19 19.6668 18.4576 19.946C17.9152 20.2251 17.2226 19.7304 15.8375 18.7411L14.325 17.6607C13.2023 16.8588 12.6409 16.4578 12 16.4578C11.3591 16.4578 10.7977 16.8588 9.67505 17.6607L8.16248 18.7411C6.77738 19.7304 6.08484 20.2251 5.54242 19.946C5 19.6668 5 18.8158 5 17.1136V7Z" stroke="#000000" stroke-width="1.6"
                            class="my-path"></path>
                    </svg>
                    Lịch sử hành trình
                  </p>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <p @click="$router.push('/profile')" :class="[active ? 'bg-gray-100' : '', 'flex gap-3 px-4 py-2 text-sm text-gray-700 cursor-pointer']">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.95 15.9412L11.95 9.94116" stroke="#000000" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                      <path d="M11.95 7L12 7" stroke="#000000" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.6" class="my-path"></path>
                    </svg>
                    Trang thông tin
                  </p>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <p @click="logout" :class="[active ? 'bg-gray-100' : '', ' px-4 py-2 text-sm text-gray-700 cursor-pointer flex gap-3']">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333"
                            stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Đăng xuất
                  </p>
                </MenuItem>
              </MenuItems>
            </transition>
            <Dialog v-model:visible="visible" :pt="{root: 'border-none', mask: {style: 'backdrop-filter: blur(2px)'}}" :destroyOnClose="true">
              <Login v-if="dialogState === 'login'" @updateState="handleStateChange" @updateVisible="handleVisibleChange"/>
              <Reg v-else-if="dialogState === 'register'" @updateState="handleStateChange"/>
              <ForgotPassword v-else-if="dialogState === 'ForgotPassword'" @updateState="handleStateChange"/>
            </Dialog>
          </Menu>

        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
            v-for="item in navigation" :key="item.name" as="a" :href="item.href"
            :class="[item.current ? '' : 'text-gray-600 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined">{{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {onMounted, ref} from 'vue';
import {useAuthStore} from '@/stores/counter';
import router from "@/router";
import {useToast} from "primevue/usetoast";


interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  {name: 'Tìm du thuyền', href: 'SearchCuiseView', current: true},
  {name: 'Doanh nghiệp', href: '/', current: false},
  {name: 'Blog', href: 'profile', current: false},
  // {name: 'Đặt tour và quản lý tình trạng đặt tour.', href: 'profile', current: false},
  // {name: 'Xem báo cáo doanh thu và tình trạng tour.', href: '/cruise/1', current: false},
]


interface MenuItem {
  label?: string;
  icon?: string;
  link?: string;
}

const visible = ref(false);
const dialogState = ref('login');
const handleStateChange = (newState: string) => {
  dialogState.value = newState;
  visible.value = true;
};


const authStore = useAuthStore();
const showMenu = ref(false);
const handleAvatarClick = () => {
  if (authStore.user) {
    showMenu.value = true;
  } else {
    visible.value = true;
    showMenu.value = false;
  }
};


const AnhDuPhong = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=doe-doe-doe-example-com');
const avatarImage = AnhDuPhong;

const handleVisibleChange = (newVisible: boolean) => {
  visible.value = newVisible;
  if (authStore.user) {
    const userImage = JSON.parse(localStorage.getItem('userImage') || '[]');
    if (userImage.length > 0) {
      avatarImage.value = `data:image/jpeg;base64,${userImage[0].data}`;
      // console.log(avatarImage.value);
    }
  }
};


onMounted(() => {
  if (authStore.user) {
    const userImage = JSON.parse(localStorage.getItem('userImage') || '[]');
    if (userImage.length > 0) {
      avatarImage.value = `data:image/jpeg;base64,${userImage[0].data}`;
    }
  }
});


const toast = useToast();
const logout = async () => {
  const authStore = useAuthStore();
  await authStore.logout();
  toast.add({severity: 'error', summary: 'Error', detail: `Đã đăng xuất`, life: 500, contentStyleClass: 'gap-3', closable: false});
  // setTimeout(() => {
  //   router.push('/home')
  // }, 500);
};


</script>