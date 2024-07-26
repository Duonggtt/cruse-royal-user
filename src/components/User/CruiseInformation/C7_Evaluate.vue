<template>
  <div class="mx-auto max-w-screen-xl px-4 py-10 ">
    <h1 class="font-bold text-xl mb-4">Đánh giá (2)</h1>
    <div class="flex justify-between mb-4">
      <InputText v-model="searchTerm" placeholder="Tìm đánh giá" class="w-64 rounded-3xl pl-3"/>
      <Button label="Gửi đánh giá" icon="pi pi-star" class="rounded-3xl "/>
    </div>
    <div class="flex items-center mb-2 mr-28 ">
      <Rating v-model="rating" :readonly="true" :cancel="false" class="mr-2 ml-auto  "/>
      <span class="text-xl font-semibold ">{{ rating }}</span>
    </div>
    <div v-for="(item, index) in items" :key="index" class="flex items-center mb-2">
      <span class="w-16  text-sm">{{ item.label }}</span>
      <ProgressBar :value="item.value" :showValue="false" class="w-3/4 h-1rem" :style="{ backgroundColor: item.color }"/>
      <span class="ml-2 text-sm">{{ item.count }} đánh giá </span>
    </div>

    <div class=" mt-10">
      <div v-for="review in reviews" :key="review.id" class=" rounded-3xl border-2 shadow p-4 mt-5">
        <div class="flex items-center mb-2 ">
          <Rating :modelValue="review.rating" :readonly="true" :cancel="false" class="mr-2"/>
          <span class="font-semibold">{{ review.name }}</span>
        </div>
        <p class="text-gray-600">{{ review.comment }}</p>
        <p class="text-gray-500 text-sm">{{ formatDate(review.date) }}</p>
      </div>
    </div>

    <div class="mt-10 mx-auto p-4  rounded-md ">
      <h2 class="text-lg font-semibold mb-4">Đánh giá của bạn</h2>
      <div class="flex mb-4">
        <div class="w-1/2 pr-2 flex items-center">
          <label class="block font-semibold">Chất lượng</label>
          <div class="flex items-center ml-3">
            <Rating v-model="rating" :stars="5" :cancel="false" class="mr-2"/>
            <span>{{ rating }}</span>
          </div>
        </div>
        <div class="w-1/2 pl-2">
          <label class="block font-semibold mb-2">Họ và tên *</label>
          <InputText v-model="name" placeholder="Nhập họ và tên" class="w-full rounded-3xl pl-3"/>
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-1/2 pr-2">
          <label class="block font-semibold mb-2">Số điện thoại *</label>
          <InputText v-model="phoneNumber" placeholder="Nhập số điện thoại" class="w-full rounded-3xl pl-3"/>
        </div>
        <div class="w-1/2 pl-2">
          <label class="block font-semibold mb-2">Địa chỉ email *</label>
          <InputText v-model="email" placeholder="Nhập email" class="w-full rounded-3xl pl-3"/>
        </div>
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-2">Đánh giá của bạn *</label>
        <Textarea v-model="review" rows="3" placeholder="Nhập đánh giá của bạn" class="w-full rounded-2xl pl-3"/>
      </div>
      <Button label="Gửi" class="w-full   text-white font-semibold py-2 px-4 rounded-3xl"/>
      <ScrollTop class="bg-gray-50 w-full h-10" target="parent" :threshold="100"  :buttonProps="{ severity: 'contrast', raised: true, rounded: true }" />
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';


const phoneNumber = ref('');
const review = ref('');
const email = ref('');
const name = ref(''); // Add this line
const rating = ref(4.5);
const searchTerm = ref('');

const items = ref([
  {label: '1 sao', value: 1, count: 1, color: '#ccc'},
  {label: '2 sao', value: 1, count: 2, color: '#ccc'},
  {label: '3 sao', value: 1, count: 3, color: '#ccc'},
  {label: '4 sao', value: 50, count: 50, color: '#ccc'},
  {label: '5 sao', value: 86, count: 86, color: '#ccc'},
]);


const reviews = ref([
  {id: 1, rating: 5, name: 'Tran Quoc Viet', comment: 'tốt', date: new Date('2024-06-07')},
  {id: 2, rating: 4, name: 'Nguyen Quynh Chi', comment: 'tuyệt vời', date: new Date('2024-06-08')},
  {id: 3, rating: 5, name: 'Bùi Xuân Huấn', comment: 'Thầy thấy rất tuyệt', date: new Date('2024-06-08')},
  {id: 4, rating: 4, name: 'Phan Tiến Dũng', comment: 'tuyệt vời', date: new Date('2024-06-08')},
  {id: 5, rating: 4, name: 'Mixi MOI', comment: 'Nên dùng', date: new Date('2024-06-08')}
]);

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return date.toLocaleDateString('vi-VN', options);
};
</script>
