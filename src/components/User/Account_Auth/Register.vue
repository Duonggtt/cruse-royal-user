<template>
  <div class=" flex align-items-center justify-content-center w-auto animate-duration-1000 animate-ease-in-out"
       v-animateonscroll="{ enterClass: 'animate-fadeinleft'}">
    <form @submit.prevent="register" class="px-20 py-10  border-round-3xl w-auto ">
      <div class="text-2xl text-center mb-12">
        <b class="font-bold "> Đăng ký </b>
      </div>
      <div class="card-container grid grid-cols-2 gap-4">

        <FloatLabel class="p-float-label mb-4 ">
          <InputText id="username" v-model="username" class="rounded-3xl w-full pl-3"/>
          <label for="username" class="pl-3">Tên đăng nhập</label>
        </FloatLabel>
        <FloatLabel class="p-float-label mb-4 ">
          <InputText id="email" v-model="email" class="rounded-3xl w-full pl-3"/>
          <label for="email" class="pl-3">Email</label>
        </FloatLabel>
        <FloatLabel class="p-float-label mb-4">
          <InputText id="phone" v-model="phone" class="rounded-3xl w-full pl-3"/>
          <label for="phone" class="pl-3">Số điện thoại</label>
        </FloatLabel>
        <FloatLabel class="p-float-label mb-4">
          <InputText id="name" v-model="name" class="rounded-3xl w-full pl-3"/>
          <label for="name" class="pl-3">Tên</label>
        </FloatLabel>

        <FloatLabel class="p-float-label mb-4 ">
          <Password id="password" v-model="password" :toggleMask="true" inputClass="rounded-3xl pl-3"></Password>
          <label for="password" class="pl-3 ">Nhập mật khẩu</label></FloatLabel>
        <FloatLabel class="p-float-label mb-4 ">
          <Password id="passwordCConfirm" v-model="passwordCConfirm" :toggleMask="true" inputClass="rounded-3xl pl-3"></Password>
          <label for="passwordCConfirm" class="pl-3">Nhập lại mật khẩu</label>
        </FloatLabel>
      </div>
      <div class="link-container mb-3">
        <Button label="Đăng Ký" severity="Primary" class="mt-1 w-full rounded-3xl " @click="register"/>
      </div>
      <div class="link-container flex ">
        <Button  label=" Quay lại" class="p-button-text text-sm  " @click="Back"/>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits} from 'vue';
import {useRouter} from 'vue-router';
import {useToast} from "primevue/usetoast";

const router = useRouter();
const toast = useToast();


let username = ref('');
let name = ref('');
let phone = ref('');
let email = ref('');
let password = ref('');
let passwordCConfirm = ref('');

const props = defineProps();
const emit = defineEmits();

const register = async () => {
  if (!username.value || !name.value || !phone.value || !email.value || !password.value || !passwordCConfirm.value) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Vui lòng điền đầy đủ thông tin', life: 3000, contentStyleClass: 'gap-3', closable: false});
    return;
  }

  if (password.value !== passwordCConfirm.value) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Mật khẩu và mật khẩu xác nhận không khớp', life: 3000, contentStyleClass: 'gap-3', closable: false});
    return;
  }

  const url = '${api_url}/user/save';
  const user = {
    username: username.value,
    name: name.value,
    password: password.value,
    email: email.value,
    phone: phone.value
  };

  console.log('Đăng ký với:', user);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.status === 400) {
      toast.add({severity: 'error', summary: 'Error', detail: 'Tên đăng nhập đã tồn tại', life: 3000, contentStyleClass: 'gap-3', closable: false});
      return;
    }

    if (!response.ok) {
      throw new Error(`Server responded with status code ${response.status}`);
    }

    const data = await response.json();
    console.log('Registration successful:', data);
    toast.add({severity: 'success', summary: 'Success', detail: 'Đăng ký thành công', life: 3000, contentStyleClass: 'gap-3', closable: false});

    emit('updateState', 'login');
  } catch (error) {
    console.error('Error during registration:', error);
  }
};
const Back = () => {
  emit('updateState', 'login');
};


</script>
