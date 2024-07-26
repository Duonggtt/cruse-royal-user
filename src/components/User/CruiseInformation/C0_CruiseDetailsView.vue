<template>
  <Navbar class="z-50"/>
  <BreadcrumbDetail v-if="cruise" :cruiseName="cruise.name"/>
  <YachtTitle v-if="cruise" :cruise="cruise"/>
  <Highlight v-if="cruise" :cruise="cruise" :cruiseId="cruiseId" />
  <Footer/>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import {API_URL} from '@/stores/config';

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
}

const route = useRoute();
const cruiseId = route.params.id as string;

const cruise = ref<Cruise | null>(null);

const fetchCruise = async () => {
  try {
    const {data} = await axios.get<Cruise>(`${API_URL}/cruises/${cruiseId}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch cruise:', error);
    throw error;
  }
};

onMounted(async () => {
  try {
    cruise.value = await fetchCruise();
  } catch (error) {
    console.error('Failed to load cruise data:', error);
  }
});
</script>