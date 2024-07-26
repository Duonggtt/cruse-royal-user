<template>
  <div class="relative flex justify-center mt-72 md:mt-96 lg:mt-0">
    <div class="w-full max-w-screen-xl">
      <div class="m-10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 head-container">
        <div class="w-3/4 col-5 animate-duration-[2400ms] animate-ease-in-out" v-animateonscroll="{ enterClass: 'animate-fadeinleft'}">
          <h1 class="mb-3 text-3xl font-bold">Du thuyền mới và phổ biến nhất</h1>
          <img src="/heading-border.webp" alt="">
        </div>
        <p class="mb-sm font-medium animate-duration-[2000ms] animate-ease-in-out" v-animateonscroll="{ enterClass: 'animate-fadeinleft'}">
          Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất.
          Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xlx:grid-cols-6 cruise-card-container">
        <div v-for="cruise in cruises" :key="cruise.id" v-animateonscroll="{ enterClass: 'animate-fadeinleft'}"
             class="m-3 p-3 cursor-pointer max-w-md rounded-3xl dark:border shadow-md cruise-card animate-duration-[2000ms] animate-ease-in-out">
          <div class="relative cruise-card-header">
            <div class="relative hover:scale-105 duration-[400ms]">
              <img :src="cruise.imageUrl" class="w-full min-h-52 max-h-52 object-cover rounded-3xl" alt=""/>
              <div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-2xl"></div>
            </div>
            <div class="absolute top-3 left-3 px-3 bg-orange-300 text-orange-900 rounded-2xl text-sm font-medium flex align-content-center gap-1 bg-opacity-85">
              <span class="scale-75 material-symbols-outlined">kid_star</span>
              <span class="text-sm">4.5 (2) đánh giá</span>
            </div>
            <div class="absolute bottom-3 right-3 pl-1 pr-3 py-2 h-5 rounded-full flex items-center bg-gray-200 text-surface-800 bg-opacity-60">
              <span class="scale-50 material-symbols-outlined">pin_drop</span>
              <p class="text-xs font-medium"> {{ cruise.location?.city }}</p>
            </div>
          </div>
          <div class="pt-1 pl-2 cruise-card-title">
            <FloatLabel class="text-lg text-gray-700 dark:text-gray-300 lg:font-bold whitespace-nowrap overflow-hidden" @click="goToCruise(cruise.id)">
              {{ cruise.name }}
            </FloatLabel>
          </div>

          <div class="cruise-card-content">
            <p class="pl-1 text-xs font-medium text-gray-600 whitespace-nowrap overflow-hidden flex items-center gap-1">
              <span class="scale-75 material-symbols-outlined">directions_boat</span>
              {{ formattedCruiseDescription(cruise) }}
            </p>
          </div>
          <div class="pl-3 pt-4 w-full flex justify-between align-items-center cruise-card-footer ">
            <p class="text-green-900 dark:text-primary-500 font-bold">{{ cruise.price.toLocaleString('en-US') }}đ /Khách</p>
            <div class="hover:scale-110 duration-[400ms]">
              <Button class="px-5 py-2 text-sm text-center shadow-lg rounded-3xl inline-flex items-center " @click="goToCruise(cruise.id)" label="Đặt ngay"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="relative flex justify-center mt-10">
    <div class="flex items-center rounded-full shadow-lg px-4 py-2 cursor-pointer border-2 border-gray-100  hover:scale-110 duration-[400ms]">
      <Button class=" text-black  dark:text-white bg-transparent border-none p-0"
              label="Xem tất cả Du thuyền" @click="router.push('/SearchCuiseView')"/>
      <span class="scale-75 material-symbols-outlined">arrow_forward</span>
    </div>
  </div>
</template>


<script setup lang="ts">
import {API_URL} from '@/stores/config';
import {onMounted, ref} from "vue";
import router from "@/router";
import axios from 'axios';

const api_url = API_URL;

interface Cruise {
  id: number;
  name: string;
  launchedYear: number;
  cabinQuantity: number;
  material: string;
  shortDesc: string[];
  description: string;
  price: number;
  ownedDate: string;
  departureTime: string;
  arrivalTime: string;
  rules: { id: number; content: string; }[];
  tags: { id: number; icon: string; name: string; }[];
  location: { id: number; routeName: string; address: string; city: string; };
  owner: { id: number; name: string; };
  imageUrl?: string; // Add this line
}

const cruises = ref<Cruise[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${api_url}/cruises/`);
    cruises.value = response.data.slice(0, 6);

    cruises.value.forEach(async (cruise) => {
      try {
        const response_img = await axios.get(`${api_url}/cruise/images?cruiseId=${cruise.id}`);
        const imageData = response_img.data[0].data;
        cruise.imageUrl = `data:image/jpeg;base64,${imageData}`;
      } catch (error) {
        console.error(`Failed to fetch image for cruise ${cruise.id}:`, error);
      }
    });

  } catch (error) {
    console.error('Failed to fetch cruises:', error);
  }
});

const formattedCruiseDescription = (cruise: Cruise) => {
  return `Hạ thuỷ ${cruise.launchedYear} - ${cruise.material} - ${cruise.cabinQuantity} Phòng`;
};


const goToCruise = (id: number) => {
  router.push({name: 'CruiseDetails', params: {id}});
};


</script>
