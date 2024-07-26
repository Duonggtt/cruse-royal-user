<template>
  <h1 class="text-xxl font-bold mb-4 mt-10">Các loại phòng & giá</h1>
  <div class="shadow-lg border-2 px-10 py-5 rounded-3xl">
    <div class="flex justify-end my-5">
      <div class="flex items-center rounded-full bg-indigo-500 text-white shadow-lg px-4 py-2 cursor-pointer hover:scale-110 duration-[400ms]" @click="resetCounts">
        <Button class="bg-transparent border-none p-0" label="Xoá lựa chọn"/>
        <span class="scale-75 material-symbols-outlined">close</span>
      </div>
    </div>

    <div v-for="(room, index) in rooms" :key="index" class="flex justify-between items-center mb-4 p-4 border-2 rounded-3xl" style="font-size: 1rem;">
      <img :src="room.images[0]" :alt="room.name" class="w-20 h-20 object-cover rounded-2xl"/>
      <div class="flex flex-col flex-grow mx-4 min-w-48">
        <h2 class="font-semibold text-lg cursor-pointer" @click="roomShow(room)">{{ room.name }}</h2>
        <p class="text-gray-600 text-xs">{{ room.size }} m² - Tối đa: {{ room.maxGuests }}  - Còn:{{ room.maxCount }} phòng<span class="pi pi-user text-xs"></span></p>
      </div>
      <div class="flex items-center">
        <div class="mr-3">
          <p class="font-semibold text-sm text-green-950 dark:text-green-700">{{ room.price.toLocaleString() }} </p>
          <p class="font-semibold text-sm text-green-950 dark:text-green-700"> /Khách</p>
        </div>
        <div class="flex items-center shadow-1 rounded-3xl px-2">
          <div class="bg-white border-2 rounded-full shadow-sm flex items-center space-x-4 px-4 pb-2 pt-1">
            <button @click="decreaseRoomCount(room.id)" class="text-3xl text-gray-800 font-semibold focus:outline-none">-</button>
            <span class="text-xl text-gray-800 font-semibold">{{ room.count }}</span>
            <button @click="increaseRoomCount(room.id)" class="text-3xl text-gray-800 font-semibold focus:outline-none">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="md:flex items-center mt-6 space-y-5">
      <div class="flex items-center">
        <p class="text-xl font-bold">Tổng tiền: {{ totalPrice.toLocaleString() }} đ</p>
      </div>
      <div class="text-right ml-auto md:flex content-center gap-5 space-y-5">
        <div class="flex gap-5 items-center justify-center">
          <div class="flex items-center justify-center rounded-full shadow-lg cursor-pointer min-w-[10rem] max-h-[3rem] px-3 py-1 border-2 bg-primary hover:scale-110 duration-[400ms]"
               @click="rentWholeShip">
            <Button class="bg-transparent border-none" label="Thuê trọn tàu"/>
          </div>
          <div class="flex items-center justify-center rounded-full shadow-lg cursor-pointer min-w-[10rem]  max-h-[3rem] px-3 py-1 border-2 bg-primary hover:scale-110 duration-[400ms]"
               @click="handleBooking">
            <Button class="bg-transparent border-none" label="Đặt ngay"/>
          </div>
        </div>
      </div>
      <Dialog v-model:visible="showDialog" :pt="{ root: 'border-none', mask: { style: 'backdrop-filter: blur(3px)' } }">
        <OderForm :cruiseId="cruiseId" :totalPrice="totalPrice" :selectedRooms="selectedRooms" @paymentComplete="handlePaymentComplete"/>
      </Dialog>
      <Toast />
      <Dialog v-model:visible="showInfoRoom" :pt="{ root: 'border-none', mask: { style: 'backdrop-filter: blur(3px)' } }">
        <RoomInfo v-if="selectedRoom" :room="selectedRoom" @close="showInfoRoom = false"/>
      </Dialog>
      <Dialog v-model:visible="showLoginForm" :pt="{ root: 'border-none', mask: { style: 'backdrop-filter: blur(3px)' } }">
        <Login v-if="dialogState === 'login'" @updateState="handleStateChange"/>
        <Reg v-else-if="dialogState === 'register'" @updateState="handleStateChange"/>
        <ForgotPassword v-else-if="dialogState === 'ForgotPassword'" @updateState="handleStateChange"/>
      </Dialog>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, provide} from 'vue';
import axios from 'axios';
import router from "@/router";
import {API_URL} from "@/stores/config";
import {useToast} from "primevue/usetoast";
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'paymentComplete', status: 'success' | 'failure'): void
}>();

const date = ref(new Date('2024-06-10'));
const adults = ref(1);
const children = ref(0);
const showGuestSelection = ref(false);
const name = ref('');
const phone = ref('');
const email = ref('');
const requests = ref('');

interface CabinTypeImage {
  id: string;
  data: string;
  type: string;
  createdAt: string;
}

interface Tag {
  id: string;
  icon: string;
  name: string;
}

interface Cabin {
  id: string;
  roomQuantity: string;
  availableRooms: string;
  cabinType: {
    id: string;
    name: string;
    roomSize: string;
    maxGuests: string;
    description: string;
    price: string;
    tags: Tag[];
    cabinTypeImages: CabinTypeImage[];
  };
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

const props = defineProps<{ cruiseId: string; }>();

const rooms = ref<Room[]>([]);
const showDialog = ref(false);
const toast = useToast();
const showLoginForm = ref(false);
const showInfoRoom = ref(false);
const dialogState = ref('login');
const visible = ref(false);
const selectedRoom = ref<Room | null>(null);

const isLoggedIn = computed(() => !!localStorage.getItem('userId'));

const fetchCabins = async () => {
  try {
    const response = await axios.get<Cabin[]>(`${API_URL}/cabins?cruiseId=${props.cruiseId}`);
    rooms.value = response.data.map(cabin => ({
      id: cabin.id,
      name: cabin.cabinType.name,
      size: cabin.cabinType.roomSize,
      maxGuests: cabin.cabinType.maxGuests,
      price: Number(cabin.cabinType.price),
      count: 0,
      maxCount: Number(cabin.availableRooms),
      images: cabin.cabinType.cabinTypeImages.map(img => `data:${img.type};base64,${img.data}`),
      tags: cabin.cabinType.tags,
      description: cabin.cabinType.description
    }));
  } catch (error) {
    console.error('Failed to fetch cabins:', error);
  }
};

onMounted(fetchCabins);

const handleStateChange = (newState: string) => {
  dialogState.value = newState;
  visible.value = true;
};

const roomShow = (room: Room) => {
  selectedRoom.value = room;
  showInfoRoom.value = true;
};

watch(isLoggedIn, (newVal) => {
  if (newVal) {
    console.log('Logged in successfully')
    showLoginForm.value = false;
    setTimeout(() => {
      router.push('/');
    }, 10000);
  }
});

const increaseRoomCount = (roomId: string) => {
  const room = rooms.value.find(r => r.id === roomId);
  if (room && room.count < room.maxCount) {
    room.count++;
  }
};

const decreaseRoomCount = (roomId: string) => {
  const room = rooms.value.find(r => r.id === roomId);
  if (room && room.count > 0) {
    room.count--;
  }
};

const updateRoomCount = (roomId: string, newCount: number) => {
  const roomIndex = rooms.value.findIndex(room => room.id === roomId);
  if (roomIndex !== -1) {
    rooms.value[roomIndex].count = Math.min(Math.max(newCount, 0), rooms.value[roomIndex].maxCount);
  }
};

const rentWholeShip = () => {
  rooms.value.forEach(room => {
    room.count = room.maxGuests;
  });
  showDialog.value = true;
};

const resetCounts = () => {
  rooms.value.forEach(room => room.count = 0);
};

const totalPrice = computed(() => {
  return rooms.value.reduce((acc, room) => acc + room.price * room.count, 0);
});

provide('rooms', rooms);
provide('increaseRoomCount', increaseRoomCount);
provide('decreaseRoomCount', decreaseRoomCount);
provide('totalPrice', totalPrice);

const selectedRooms = computed(() => {
  return rooms.value.filter(room => room.count > 0).map(room => ({
    id: room.id,
    name: room.name,
    count: room.count
  }));
});

const handleBooking = () => {
  if (isLoggedIn.value) {
    if (totalPrice.value > 0) {
      showDialog.value = true;
    } else {
      toast.add({ severity: 'warn', summary: 'Warning', detail: 'Vui lòng chọn phòng trước', life: 3000 });
    }
  } else {
    showLoginForm.value = true;
  }
};

const handlePaymentComplete = (status: string) => {
  showDialog.value = false;
  if (status === 'success') {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Chúc mừng bạn đã thanh toán thành công!', life: 5000 });
    resetCounts();
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Thanh toán thất bại !', life: 5000 });
  }
};
const paymentStatus = ref('pending');
</script>