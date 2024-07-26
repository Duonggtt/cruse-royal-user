<template>
  <div class="ForgotPassword-container  flex align-items-center justify-content-center animate-duration-1000 animate-ease-in-out"
       v-animateonscroll="{ enterClass: 'animate-fadeinleft'}">
    <form @submit.prevent="resetPassword" class="px-20 py-10  border-round-3xl w-auto ">
      <div class="card-container w-30rem">
        <div class="welcome-message text-center mb-5 ">
          <i class="pi pi-spin pi-sparkles text-3xl"></i>
          <h1 class="font-bold pb-4 text-2xl">Lấy lại mật khẩu</h1>
        </div>

          <FloatLabel class="p-float-label w-96">
            <InputText id="email" v-model="email" class="rounded-3xl pl-4 w-full"/>
            <label for="email" class="pl-2">Nhập Email</label>
          </FloatLabel>

      </div>

      <div class="link-container flex align-items-center pt-3">
        <Button label="Gửi yêu cầu" severity="Primary" class=" rounded-full p-2 w-full mt-1" @click="resetPassword"/>
      </div>

      <div class="link-container flex pt-3 ">
        <Button label="Quay lại" class="p-button-text text-sm  " @click="back"/>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref} from 'vue';

const router = useRouter();
const email = ref('');
const userImage = ref('path_to_user_image.jpg');

const resetPassword = () => {
  console.log('Yêu cầu quên mật khẩu cho:', email.value);
  emit('updateState', 'login');
};

const back = () => {
  emit('updateState', 'login');
};

const emit = defineEmits(['updateState']);
</script>


