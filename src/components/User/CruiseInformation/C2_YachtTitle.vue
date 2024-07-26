<template>
  <div class="xl:max-w-7xl xl:mx-auto m-auto">
    <div class="flex justify-between items-center py-4">
      <div>
        <h1 class="text-2xl font-bold">{{ props.cruise?.name }}</h1>
        <div class="flex items-center mt-2 pt-2">
          <span class="bg-yellow-300 text-gray-700 rounded-3xl px-3 py-1 text-sm">5 (0 đánh giá)</span>
          <div class="flex bg-gray-200 rounded-3xl ml-3 px-3">
            <p class="dark:text-black">{{ props.cruise?.location.name }}</p>
            <a class="ml-2 text-blue-500">Xem bản đồ và lịch trình</a>
          </div>
        </div>
        <img src="/heading-border.webp" alt="" class="pt-5">
      </div>
      <div class="text-3xl font-bold text-teal-700">{{ props.cruise?.price }}đ /khách</div>
    </div>

    <div class="container">
      <div class="mx-auto rounded-3xl">
        <Carousel :value="images" :numVisible="1" :numScroll="1" :autoplay="true" circular :autoplayInterval="3000" :navigation="false" :transitionDuration="3000">
          <template #item="images">
            <img v-for="(image, index) in images" :key="index" :src="image.img" class="object-cover max-h-96 w-full rounded-3xl" alt="">
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the types
interface Cruise {
  id: number;
  name: string;
  location: { name: string };
  price: number;
}

interface ImageItem {
  img: string;
}

interface ApiImageResponse {
  id: number;
  data: string;
  type: string | null;
  createdAt: string | null;
  cruiseId: number;
}

// Define the props with types
const props = defineProps<{ cruise: Cruise | null }>();

const images = ref<ImageItem[]>([]);

const fetchImages = async () => {
  if (props.cruise?.id) {
    try {
      const response = await axios.get<ApiImageResponse[]>(`http://14.225.255.190:8081/api/cruise/images?cruiseId=${props.cruise.id}`);

      // Tải ảnh từng bước và cập nhật giao diện ngay lập tức
      response.data.forEach(async (item: ApiImageResponse) => {
        const img = `data:image/jpeg;base64,${item.data}`;
        images.value.push({ img });
      });

      // Đảo ngược danh sách ảnh sau khi tất cả đã được thêm
      images.value = images.value.reverse();

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
};

onMounted(() => {
  fetchImages();
});

</script>
