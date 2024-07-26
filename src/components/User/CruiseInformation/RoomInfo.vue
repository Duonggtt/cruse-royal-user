<template>
  <div class="flex flex-col md:flex-row min-w-[30rem] md:min-w-[60rem] p-6 space-y-6 md:space-y-0 md:space-x-6">
    <div class="w-full md:w-1/2">
      <div class="relative w-full" style="padding-top: 56.25%;">
        <img :src="mainImage" :alt="room.name" class="absolute top-0 left-0 w-full h-full object-cover rounded-lg"/>
      </div>
      <div class="flex justify-center mt-4 space-x-2 overflow-x-auto">
        <img v-for="(image, index) in room.images" :key="index" :src="image"
             @click="changeImage(image)"
             class="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0"
             :class="{ 'border-primary': image === mainImage, 'border-transparent': image !== mainImage }"/>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-2xl font-semibold mb-4">{{ room.name }}</h2>
      <p class="mb-4"><span>{{ room.size }} m²</span> | <span>Tối đa: {{ room.maxGuests }} người</span></p>
      <ul class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <li v-for="tag in room.tags" :key="tag.id" class="flex items-center">
          <span class="material-symbols-outlined mr-2 text-primary">{{ tag.icon }}</span> {{ tag.name }}
        </li>
      </ul>
      <p class="mb-4">{{ room.description }}</p>
      <div class="flex items-center space-x-4">
        <div class="flex items-center shadow-1 rounded-3xl px-2">
          <div class="bg-white border-2 rounded-full shadow-sm flex items-center space-x-4 px-4 pb-2 pt-1">
            <button @click="decreaseRoomCount(room.id)" class="text-3xl text-gray-800 font-semibold focus:outline-none">-</button>
            <span class="text-xl text-gray-800 font-semibold">{{ roomCount }}</span>
            <button @click="increaseRoomCount(room.id)" class="text-3xl text-gray-800 font-semibold focus:outline-none">+</button>
          </div>
        </div>
        <div class="flex items-center justify-center rounded-full shadow-lg cursor-pointer min-w-[10rem] max-h-[3rem] px-3 py-1 border-2 bg-primary hover:scale-110 duration-[400ms]"
             @click="emit('close');">
          <Button class="bg-transparent border-none" label="Chọn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed, inject, type Ref} from 'vue';

interface Tag {
  id: string;
  icon: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  size: string;
  maxGuests: string;
  price: number;
  count: number;
  maxCount: number;
  images: string[];
  tags: Tag[];
  description: string;
}

const props = defineProps<{
  room: Room;
}>();


const rooms = inject<Ref<Room[]>>('rooms');
const increaseRoomCount = inject<(roomId: string) => void>('increaseRoomCount');
const decreaseRoomCount = inject<(roomId: string) => void>('decreaseRoomCount');

const mainImage = ref(props.room.images[0]);
const roomCount = computed(() => {
  const room = rooms?.value.find(r => r.id === props.room.id);
  return room ? room.count : 0;
});

const changeImage = (image: string) => {
  mainImage.value = image;
};

const bookRoom = () => {
  alert(`Bạn đã đặt ${roomCount.value} phòng ${props.room.name}`);
};
const quantity = computed({
  get: () => {
    const room = rooms?.value.find(r => r.id === props.room.id);
    return room ? room.count : 0;
  },
  set: (value) => {
    if (updateRoomCount) {
      updateRoomCount(props.room.id, value);
    }
  }
});


// Xử lý đóng dialog khi nhấn phím Escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog();
  }
};

const closeDialog = () => {
  emit('close');
};

const emit = defineEmits(['close']);

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});


</script>