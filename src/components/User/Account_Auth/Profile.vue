<template>
  <section class="xl:max-w-6xl xl:mx-auto pt-6 mx-5">
    <section class="mb-6 flex items-center justify-between">
      <div class="flex items-center justify-start ">
        <span
            class="inline-flex justify-center items-center w-3rem h-3rem rounded-full text-black dark:bg-slate-900/70 dark:text-white mr-3">
          <i class="pi pi-user" style="color: black"></i>
        </span>
        <span class="text-3xl font-bold">Profile</span>
      </div>
      <p class="inline-flex justify-center items-center no-underline whitespace-nowrap rounded-full bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 cursor-pointer"
         @click="logouts">
        <span class="inline-flex justify-center items-center gap-2">
          <span class="px-1 font-medium">Đăng xuất</span>
            <span class="material-symbols-outlined">logout</span>
        </span>
      </p>
    </section>

    <div class="rounded-3xl flex-col dark:bg-slate-900/70 flex mb-6 shadow-md border-2 border-gray-100">
      <div class="flex-1 p-6">
        <div class="md:flex block pl-36 pb-10">
          <div class="flex mb-6 md:mb-0 mx-5">
            <div class="mx-auto">
              <img v-if="userImage.length > 0" :src="getImageUrl(userImage[0].data)" :alt="userImage[0].type" class="min-w-24 min-h-24 w-48 h-48 object-cover rounded-full"/>
              <img v-else src="https://api.dicebear.com/7.x/avataaars/svg?seed=doe-doe-doe-example-com" alt="Default Avatar" class="min-w-24 min-h-24 w-48 h-48 object-cover rounded-full"/>
            </div>
          </div>
          <div class="flex items-center justify-center mb-5 pl10">
            <div class="space-y-3 text-center md:text-left lg:mx-12">
              <h1 class="text-2xl font-medium"> Xin Chào! <b class="font-bold">{{ user.name }}</b></h1>
              <h6 class="text-xl font-medium"><b class="font-bold">{{ user.username }}</b></h6>

              <p v-if="userImage.length > 0">Cập nhật ngày: {{ formatDate(userImage[0].createdAt) }}</p>
              <div class="flex justify-center md:block ">
                <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-blue-500 border-blue-500 text-fuchsia-50 ">
                  <span class="inline-flex justify-center items-center w- h-4 mr-2 ">
                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                      <path fill="currentColor"
                            d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"></path>
                    </svg>
                  </span>
                  <span>Đã xác minh</span>
                </div>
              </div>
            </div>
          </div>

<!--          <div class="lg:w-96  ml-10">-->
<!--            <div>-->
<!--              <div class="overflow-hidden rounded-full bg-gray-200">-->
<!--                <div class="h-2 w-1/2 rounded-full bg-blue-500"></div>-->
<!--              </div>-->

<!--              <ol class="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">-->
<!--                <li class="flex items-center justify-start text-blue-600 sm:gap-1.5">-->
<!--                  <span class="hidden sm:inline"> Details </span>-->
<!--                  <span class="scale-75 material-symbols-outlined">contact_emergency</span>-->
<!--                </li>-->

<!--                <li class="flex items-center justify-center text-blue-600 sm:gap-1.5">-->
<!--                  <span class="hidden sm:inline"> Address </span>-->
<!--                  <span class="scale-75 material-symbols-outlined">location_on</span>-->
<!--                </li>-->

<!--                <li class="flex items-center justify-end sm:gap-1.5">-->
<!--                  <span class="hidden sm:inline"> Payment </span>-->
<!--                  <span class="scale-75 material-symbols-outlined">payments</span>-->
<!--                </li>-->
<!--              </ol>-->
<!--            </div>-->


<!--          </div>-->


        </div>
        <div class="m-10">
          <h1 class="font-medium text-md text-gray-500 ml-3 mb-8">Chuyến du lịch 3 ngày 2 đêm với du thuyền Bình chuẩn cát bà bắt đầu ngày 22/06/2024</h1>
          <ul class="flex flex-col md:flex-row p-0 m-0 list-none mt-2 gap-5">

            <!-- Seat Step -->
            <li class="relative flex-auto mr-0 md:mr-8">
              <div class="border border-gray-300 rounded p-3 flex flex-col md:flex-row items-center">
                <span class="material-symbols-outlined text-green-500 mb-2 md:mb-0 mr-0 md:mr-3">task_alt</span>
                <div>
                  <div class="text-gray-900 dark:text-gray-400 font-medium mb-1 text-xs">Đặt Tour hạ Long</div>
                  <span class="text-gray-600 hidden md:block text-xs">2 ngày 3 đêm tại Vịnh Hạ Long</span>
                </div>
              </div>
              <div class="absolute top-1/2 left-full transform -translate-y-1/2 w-full h-0.5 bg-gray-300 hidden md:block"></div>
            </li>
            <!-- Payment Step -->
            <li class="relative bg-white dark:bg-slate-900 flex-auto mr-0 md:mr-8">
              <div class="border-2 border-blue-500 rounded p-3 flex flex-col md:flex-row items-center">
                <span class="material-symbols-outlined text-blue-600 mb-2 md:mb-0 mr-0 md:mr-3">payments</span>
                <div>
                  <div class="text-blue-600 font-medium mb-1 text-xs">Thanh Toán</div>
                  <!--                  <span class="text-gray-600 hidden md:block text-xs">Chờ thanh toán</span>-->
                  <span class="text-gray-600 hidden md:block text-xs">Thanh toán thành công với VNPay</span>
                </div>
              </div>
              <div class="absolute top-1/2 left-full transform -translate-y-1/2 w-full h-0.5 bg-gray-300 hidden md:block"></div>
            </li>
            <!-- Confirmation Step -->
            <li class="relative bg-white dark:bg-slate-900 flex-auto">
              <div class="border border-gray-300 rounded p-3 flex flex-col md:flex-row items-center">
                <span class="material-symbols-outlined text-gray-600 mb-2 md:mb-0 mr-0 md:mr-3">task_alt</span>
                <div>
                  <div class="text-gray-900 dark:text-gray-400 font-medium mb-1 text-xs">Xác nhận</div>
                  <!--                  <span class="text-gray-600 hidden md:block text-xs">Chờ xác nhận</span>-->
                  <span class="text-gray-600 hidden md:block text-xs">Lịch trình bắt đầu từ ngày 18/06/2024 đến 21 /6/2024</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form class="rounded-2xl dark:bg-slate-900/70  bg-gray-100 shadow-2" @submit.prevent="updateUser">
        <div class="flex-1 p-6 m-5">
          <div class="mb-6 ">
            <label class="block font-bold mb-2">Avatar</label>
            <div class="card shadow-1 border-round-xl">
              <div class="card flex flex-col gap-6 items-center justify-center">
                <FileUpload ref="fileupload" mode="basic" name="demo[]" accept="image/*" :maxFileSize="100000000"/>
                <Button label="Upload" @click="upload" severity="secondary"/>
              </div>

            </div>
          </div>

          <div class="mb-5">
            <FloatLabel class="input-group flex-column align-items-center mb-12 ">
              <InputText class="rounded-3xl w-full pl-4" v-model="user.name"/>
              <label class="block mb-2 pl-2">Tên</label>
            </FloatLabel>
          </div>

          <div class="mb-5">
            <FloatLabel class="input-group flex-column align-items-center mb-12 ">
              <label class="block mb-2 pl-2">Email</label>
              <InputText class="rounded-3xl w-full pl-4" v-model="user.email"/>
            </FloatLabel>
          </div>

          <div class="mb-5">
            <FloatLabel class="input-group flex-column align-items-center mb-12 ">
              <label class="block mb-2 pl-2">Số điện thoại</label>
              <InputText class="rounded-3xl w-full pl-4" v-model="user.phone"/>
            </FloatLabel>
          </div>

          <div class="mb-5">
            <FloatLabel class="input-group flex-column align-items-center mb-5 ">
              <label class="block mb-2 pl-2">Địa chỉ</label>
              <InputText class="rounded-3xl w-full pl-4" v-model="user.address"/>
            </FloatLabel>
          </div>
        </div>

        <footer class="px-6 mx-5 mb-5">
          <Button label="Cập nhật" severity="primary" class="w-full mb-5 rounded-3xl" type="submit"/>
        </footer>
      </form>

      <form class="rounded-2xl dark:bg-slate-900/70  bg-gray-100 shadow-2">
<!--        <div class="flex-1 p-6">-->
<!--          <div class="mb-12">-->
<!--            <div class="overflow-hidden rounded-full bg-gray-200">-->
<!--              <div class="h-2 w-1/2 rounded-full bg-blue-500"></div>-->
<!--            </div>-->

<!--            <ol class="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">-->
<!--              <li class="flex items-center justify-start text-blue-600 sm:gap-1.5">-->
<!--                <span class="hidden sm:inline"> Details </span>-->
<!--                <span class="scale-75 material-symbols-outlined">contact_emergency</span>-->
<!--              </li>-->

<!--              <li class="flex items-center justify-center text-blue-600 sm:gap-1.5">-->
<!--                <span class="hidden sm:inline"> Address </span>-->
<!--                <span class="scale-75 material-symbols-outlined">location_on</span>-->
<!--              </li>-->

<!--              <li class="flex items-center justify-end sm:gap-1.5">-->
<!--                <span class="hidden sm:inline"> Payment </span>-->
<!--                <span class="scale-75 material-symbols-outlined">payments</span>-->
<!--              </li>-->
<!--            </ol>-->
<!--          </div>-->
<!--          <div class="dropdown relative inline-flex">-->
<!--            <button type="button" data-target="dropdown-with-icon" class="dropdown-toggle inline-flex justify-center items-center gap-2 py-3 px-6 text-sm bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 "> Dropdown with icons-->
<!--              <svg class="dropdown-open:rotate-180 w-2.5 h-2.5 text-white" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>-->
<!--              </svg>-->
<!--            </button>-->
<!--            <div id="dropdown-with-icon" class="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full w-72 mt-2" aria-labelledby="dropdown-with-icon">-->
<!--              <ul class="py-2">-->
<!--                <li>-->
<!--                  <a class="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium" href="javascript:;">-->
<!--                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path d="M15.4167 7.5C16.5673 7.5 17.5 8.43274 17.5 9.58333V12.5C17.5 14.857 17.5 16.0355 16.7678 16.7678C16.0355 17.5 14.857 17.5 12.5 17.5H7.5C5.14298 17.5 3.96447 17.5 3.23223 16.7678C2.5 16.0355 2.5 14.857 2.5 12.5V9.58333C2.5 8.43274 3.43274 7.5 4.58333 7.5M10 13.3333L6.50337 9.83671M10 13.3333L13.4966 9.83671M10 13.3333V2.5" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                    Downloads </a>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <a class="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium" href="javascript:;">-->
<!--                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path-->
<!--                          d="M5 10.8333H11.6667M5 13.3333H8.33333M11.3883 1.94437V5.55548C11.3883 6.47595 12.1345 7.22214 13.055 7.22214H16.6661M10.6985 1.66666H8.5C5.67157 1.66666 4.25736 1.66666 3.37868 2.54534C2.5 3.42402 2.5 4.83823 2.5 7.66666V12.3333C2.5 15.1618 2.5 16.576 3.37868 17.4546C4.25736 18.3333 5.67156 18.3333 8.49997 18.3333C9.30683 18.3333 10.1356 18.3333 10.945 18.3333C13.7731 18.3333 15.1871 18.3333 16.0658 17.4546C16.9444 16.576 16.9444 15.1618 16.9444 12.3333V7.91257C16.9444 7.47054 16.7689 7.04662 16.4563 6.73406L11.877 2.15481C11.5645 1.84225 11.1406 1.66666 10.6985 1.66666Z"-->
<!--                          stroke="#111827" stroke-width="1.6" stroke-linecap="round"/>-->
<!--                    </svg>-->
<!--                    Saved Files </a>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <a class="flex items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium" href="javascript:;">-->
<!--                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path-->
<!--                          d="M15.1116 9.16666C15.2575 10.9606 15.8104 12.3731 16.3475 13.3586C16.7027 14.0104 16.2305 15 15.4881 15H4.51181C3.76939 15 3.27739 13.995 3.61578 13.3342C4.28214 12.0329 4.99996 9.94714 4.99996 6.99999C4.99996 5.58582 5.52663 4.22916 6.46413 3.22916C7.40246 2.22916 8.67496 1.66666 9.99996 1.66666C10.2808 1.66666 10.56 1.69166 10.8333 1.74166M11.4416 17.5C11.2953 17.7528 11.0851 17.9626 10.832 18.1085C10.579 18.2544 10.292 18.3312 9.99996 18.3312C9.70788 18.3312 9.42094 18.2544 9.1679 18.1085C8.91487 17.9626 8.70464 17.7528 8.5583 17.5M15 6.66666C15.663 6.66666 16.2989 6.40326 16.7677 5.93442C17.2366 5.46558 17.5 4.8297 17.5 4.16666C17.5 3.50362 17.2366 2.86773 16.7677 2.39889C16.2989 1.93005 15.663 1.66666 15 1.66666C14.3369 1.66666 13.701 1.93005 13.2322 2.39889C12.7634 2.86773 12.5 3.50362 12.5 4.16666C12.5 4.8297 12.7634 5.46558 13.2322 5.93442C13.701 6.40326 14.3369 6.66666 15 6.66666Z"-->
<!--                          stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                    Notifications </a>-->
<!--                </li>-->
<!--                <li>-->
<!--                  <a class="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-red-500 font-medium" href="javascript:;">-->
<!--                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                      <path d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333" stroke="#EF4444" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    </svg>-->
<!--                    Log Out </a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->


<!--          &lt;!&ndash;          <div class="py-5">&ndash;&gt;-->
<!--          &lt;!&ndash;            <FloatLabel class="input-group flex-column align-items-center mb-6 ">&ndash;&gt;-->
<!--          &lt;!&ndash;              <label class="block mb-1 pl-2">Mật khẩu hiện tại</label>&ndash;&gt;-->
<!--          &lt;!&ndash;              <InputText class="rounded-3xl w-full pl-4"/>&ndash;&gt;-->
<!--          &lt;!&ndash;            </FloatLabel>&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--          &lt;!&ndash;          <hr class="my-6 -mx-6 border-b-gray-100">&ndash;&gt;-->
<!--          &lt;!&ndash;          <div class="mb-3">&ndash;&gt;-->
<!--          &lt;!&ndash;            <FloatLabel class="input-group flex-column align-items-center mb-6 ">&ndash;&gt;-->
<!--          &lt;!&ndash;              <label class="block mb-1 pl-2">Mật khẩu mới</label>&ndash;&gt;-->
<!--          &lt;!&ndash;              <InputText class="rounded-3xl w-full pl-4"/>&ndash;&gt;-->
<!--          &lt;!&ndash;            </FloatLabel>&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--          &lt;!&ndash;          <div class="mb-2">&ndash;&gt;-->
<!--          &lt;!&ndash;            <FloatLabel class="input-group flex-column align-items-center mb-6 ">&ndash;&gt;-->
<!--          &lt;!&ndash;              <label class="block mb-1 pl-2">Xác nhận mật khẩu</label>&ndash;&gt;-->
<!--          &lt;!&ndash;              <InputText class="rounded-3xl w-full pl-4"/>&ndash;&gt;-->
<!--          &lt;!&ndash;            </FloatLabel>&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->


      </form>
    </div>
  </section>

</template>

<script setup lang="ts">
import {ref, onMounted, defineAsyncComponent} from 'vue';
import {useAuthStore} from '@/stores/counter';

import router from "@/router";
import {useToast} from 'primevue/usetoast';
import Tour from "@/components/User/Account_Auth/Tour.vue";


import {API_URL} from '@/stores/config';


const fileupload = ref();
const upload = () => {
  fileupload.value.upload();
  onAdvancedUpload(fileupload.value);
};

const api_url = API_URL;

interface UserImage {
  id: number;
  data: string;
  type: string;
  createdAt: string;
}

const toast = useToast();
const userImage = ref<UserImage[]>(JSON.parse(localStorage.getItem('userImage') || '[]'));
const user = ref<any>({});
const originalUser = ref<any>({});
const access_token = ref(localStorage.getItem('access_token') || '');

onMounted(() => {
  fetchUserInfo();
});

const fetchUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo != null) {
    user.value = JSON.parse(userInfo);
    originalUser.value = {...user.value};
  }
  // console.log("user: ", user.value);
};

const onAdvancedUpload = async (event: any) => {
  if (!event.files) {
    // console.error('Chọn file ảnh đã bạn');
    toast.add({severity: 'error', summary: 'Error', detail: 'Chọn file ảnh đã bạn', life: 3000, contentStyleClass: 'gap-3', closable: false,});
    return;
  }

  const files = event.files;
  const userId = localStorage.getItem('userId');

  if (files && files.length > 0 && userId) {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', userId);

    try {
      const res = await fetch(`${api_url}/images/upload`, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${access_token.value}`,},
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with status code ${res.status}`);
      }
      const data = await res.json();
      toast.add({severity: 'success', summary: 'Success', detail: 'File uploaded successfully', life: 3000, contentStyleClass: 'gap-3', closable: false,});
      // // Wait for 2 seconds before updating the image on the user interface
      // setTimeout(() => {
      //   // Update the image on the user interface
      //   userImage.value = data;
      //   toast.add({severity: 'success', summary: 'Success', detail: 'File uploaded successfully', life: 3000, contentStyleClass: 'gap-3', closable: false,});
      // }, 500);

      const authStore = useAuthStore();
      await authStore.fetchUserImage();
      userImage.value = data;
      event.files.clear = false;
    } catch (error) {
      toast.add({severity: 'error', summary: 'Error', detail: 'Failed to upload file', life: 3000, contentStyleClass: 'gap-3', closable: false,});
    }
  } else {
    toast.add({severity: 'error', summary: 'Error', detail: 'No file or userId provided', life: 3000, contentStyleClass: 'gap-3', closable: false,});
  }
};


const logouts = async () => {
  const authStore = useAuthStore();
  await authStore.logout();
  toast.add({severity: 'error', summary: 'Error', detail: `Đã đăng xuất`, life: 500, contentStyleClass: 'gap-3', closable: false});
  // setTimeout(() => {
  //   router.push('/home')
  // }, 500);
};


const updateUser = async () => {
  const username = localStorage.getItem('user');
  const url = `${api_url}/user/update?username=${username}`;

  // Create an object with all fields
  const updatedFields = {
    name: user.value.name,
    email: user.value.email,
    phone: user.value.phone,
    address: user.value.address,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedFields)
  });

  if (!res.ok) {
    throw new Error(`Server responded with status code ${res.status}`);
  }

  // Update user information in data and originalUser
  user.value = updatedFields;
  originalUser.value = {...updatedFields};

  // Store the updated user information in localStorage
  localStorage.setItem('userInfo', JSON.stringify(updatedFields));

  // console.log("User information updated successfully!");
  toast.add({severity: 'success', summary: 'Success', detail: 'Cập nhật thông tin thành công !', closable: false, life: 3000, contentStyleClass: 'gap-3'});
};


const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getImageUrl = (imageData: string): string => {
  return imageData ? `data:image/jpeg;base64,${imageData}` : '';
};


const LichTrinh = ref([
  {
    icon: 'pi pi-user',
    label: 'Hạ Long'
  },
  {
    icon: 'pi pi-calendar',
    label: 'Lịch trình'
  },
  {
    icon: 'pi pi-check',
    label: 'Review'
  }
]);


</script>

