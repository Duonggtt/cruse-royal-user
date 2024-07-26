<template>
  <div class="mx-auto max-w-screen-xl px-4  ">
    <div class="bg-white dark:bg-[#121212] dark:border-2 rounded-3xl  flex flex-col items-center lg:w-11/12 mx-auto p-8 shadow-md ">
      <h2 class="text-3xl font-bold mb-2">Bạn lựa chọn du thuyền Hạ Long nào?</h2>
      <p class=" mb-4">Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn</p>
      <div class="flex flex-wrap gap-2">
        <InputText type="text" v-model="searchQuery" class="lg:min-w-56 w-full lg:w-56 text-sm rounded-3xl pl-4 shrink-0 basis-auto lg:basis-[10rem]" placeholder="Nhập tên du thuyền"/>


        <Select v-model="selectedLocation" :options="locationOptions" optionLabel="name" placeholder="Chọn địa điểm"
                class="w-full lg:w-56 lg:min-w-56 rounded-3xl pi pi-flag flex align-items-center px-3 shrink-0 basis-auto lg:basis-[10rem]"/>
        <Select v-model="selectedPrice" :options="priceOptions" optionLabel="range" placeholder="Chọn mức giá"
                class="w-full lg:w-56 lg:min-w-56 rounded-3xl pi pi-flag flex align-items-center px-3 shrink-0 basis-auto lg:basis-[10rem]"/>

        <Button label="Tìm kiếm" @click="onSearch" class="w-full lg:w-56 lg:min-w-56 rounded-3xl shrink-0 basis-auto lg:basis-[10rem]"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const emit = defineEmits<{ (e: 'search', query: string): void }>();

const searchQuery = ref('');

const onSearch = () => {
  if (route.path !== '/SearchCuiseView') {
    router.push('/SearchCuiseView');
  }
  emit('search', searchQuery.value);
};
const selectedLocation = ref();
const selectedPrice = ref();
const locations = ref([
  {
    name: 'Tất cả địa điểm',
    code: 'all',
    diadiem: [
      {name: 'Vinh Hạ Long', code: 'vhl'},
      {name: 'Vinh Lan Hạ', code: 'vlh'},
      {name: 'Đảo Cát Bà', code: 'dcb'}
    ]
  }
]);
const locationOptions = ref<{ name: string; code: string; }[]>([]);

watchEffect(() => {
  locationOptions.value = locations.value[0].diadiem.map(location => {
    return {name: location.name, code: location.code};
  });
});

const prices = ref([
  {
    range: 'Tất cả mức giá',
    code: 'all',
    prices: [
      {range: 'Từ 1 đến 3 triệu', code: '1'},
      {range: 'Từ 3 đến 6 triệu', code: '2'},
      {range: 'Trên 6 triệu', code: '3'}
    ]
  }
]);

const priceOptions = ref<{ range: string; code: string; }[]>([]);

watchEffect(() => {
  priceOptions.value = prices.value[0].prices.map(price => {
    return {range: price.range, code: price.code};
  });
});


</script>
