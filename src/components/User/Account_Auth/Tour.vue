<template>
  <div class="card mb-5">
    <h2>Lịch sử đặt tour</h2>
    <ul>
      <li v-for="tour in tourHistory" :key="tour.id" @click="selectTour(tour)" class="cursor-pointer">
        {{ tour.name }} - {{ tour.date }}
      </li>
    </ul>

    <Dialog v-model:visible="showDialog" header="Chi tiết tour" :style="{ width: '50vw' }">
      <div v-if="selectedTour">
        <Steps :model="selectedTour.itinerary" class="custom-steps" :readonly="false">
          <template #item="{ item, active }">
            <div class="flex flex-col items-center">
              <span :class="[ 'inline-flex justify-center items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer', { 'bg-primary': active, 'surface-overlay text-primary': !active }, ]">
                <i :class="[item.icon, 'text-xl']"></i>
              </span>
              <p :class="[ { 'text-primary': active, 'surface-overlay text-black': !active }, ]"> {{ item.label }} </p>
              <p v-if="active">{{ item.description }}</p>
            </div>
          </template>
        </Steps>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


interface Tour {
  id: number;
  name: string;
  date: string;
  itinerary: Array<{ icon: string, label: string, description: string }>;
}

const tourHistory = ref<Tour[]>([
  {
    id: 1,
    name: 'Tour Hạ Long',
    date: '2023-05-01',
    itinerary: [
      { icon: 'pi pi-user', label: 'Khởi hành', description: 'Khởi hành từ Hà Nội' },
      { icon: 'pi pi-calendar', label: 'Ngày 1', description: 'Tham quan vịnh Hạ Long' },
      { icon: 'pi pi-check', label: 'Ngày 2', description: 'Tham quan đảo Titop' }
    ]
  },
  {
    id: 2,
    name: 'Tour Đà Nẵng',
    date: '2023-06-15',
    itinerary: [
      { icon: 'pi pi-user', label: 'Khởi hành', description: 'Khởi hành từ TP. HCM' },
      { icon: 'pi pi-calendar', label: 'Ngày 1', description: 'Tham quan Bà Nà Hills' },
      { icon: 'pi pi-check', label: 'Ngày 2', description: 'Tham quan biển Mỹ Khê' }
    ]
  }
]);

const selectedTour = ref<Tour | null>(null);
const showDialog = ref(false);

const selectTour = (tour: Tour) => {
  selectedTour.value = tour;
  showDialog.value = true;
};
</script>
