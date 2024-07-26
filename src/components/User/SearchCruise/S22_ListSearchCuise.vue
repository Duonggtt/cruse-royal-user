<template>
  <div class="w-full">
    <div class="card mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <DataView :value="displayedCruises" dataKey="id" :paginator="true" :rows="5" :lazy="true"
                :totalRecords="totalRecords" @page="onPage" :loading="loading">
        <template #list="slotProps">
          <div class="grid grid-cols-1 gap-6 ">
            <div v-for="cruise in slotProps.items" :key="cruise.id"
                 class="transform transition-all duration-500 ease-out translate-x-0 opacity-100">
              <div class="flex flex-col lg:flex-row p-4 gap-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="relative w-full lg:w-1/3 h-48 lg:h-auto">
                  <img v-if="cruise.imageUrl" class="rounded-xl w-full h-full object-cover shadow-xl" :src="cruise.imageUrl" :alt="cruise.name"/>
                  <div v-else class="rounded-xl w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500">Loading image...</span>
                  </div>
                  <div class="absolute top-3 left-3 bg-emerald-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
                    <div class="flex items-center">
                      <span class="material-symbols-outlined text-sm mr-1">star</span>
                      <span>{{ cruise.rating || 5 }} sao</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col justify-between w-full lg:w-2/3">
                  <div>
                    <div class="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-1">
                      <span class="material-symbols-outlined text-sm mr-1">pin_drop</span>
                      <span>{{ cruise.location.routeName }}</span>
                    </div>
                    <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">{{ cruise.name }}</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ formattedCruiseDescription(cruise) }}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span v-for="tag in cruise.tags" :key="tag.id" class="bg-gray-100  dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs px-2 py-1 rounded-full">
                        {{ tag.name }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-0">{{ formatPrice(cruise.price) }}đ</div>
                    <div class="flex gap-2">
                      <button class="px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors duration-300">
                        Xem chi tiết
                      </button>
                      <button @click="goToCruise(cruise.id)" class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/stores/config';

const props = defineProps<{
  filters: unknown;
  searchResult: string;
}>();

const searchResult = ref('');
const router = useRouter();
const displayedCruises = ref<Cruise[]>([]);
const totalRecords = ref(0);
const loading = ref(false);
const nextPageCruises = ref<Cruise[]>([]);
const currentPage = ref(0);

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
  rules: { id: number; content: string }[];
  tags: { id: number; icon: string; name: string }[];
  location: { id: number; routeName: string; address: string; city: string };
  owner: { id: number; name: string };
  imageUrl?: string;
  rating?: number;
}

const fetchCruiseImage = async (cruiseId: number) => {
  try {
    const response = await axios.get(`${API_URL}/cruise/images?cruiseId=${cruiseId}&limit=1`);
    if (response.data && response.data.length > 0) {
      return `data:image/jpeg;base64,${response.data[0].data}`;
    }
  } catch (error) {
    console.error('Error fetching cruise image:', error);
  }
  return null;
};

const fetchCruiseDetails = async (cruise: Cruise) => {
  try {
    const updatedCruise = { ...cruise };
    updatedCruise.imageUrl = await fetchCruiseImage(cruise.id);
    return updatedCruise;
  } catch (error) {
    console.error('Error fetching cruise details:', error);
    return cruise;
  }
};

const fetchCruises = async (page = 0) => {
  try {
    loading.value = true;
    const { tagIds } = props.filters;

    let url = `${API_URL}/cruises/`;
    const params = new URLSearchParams();

    if (tagIds && tagIds.length > 0) {
      url += 'filter/tags';
      tagIds.forEach(id => params.append('tagIds', id));
    } else if (searchResult.value) {
      url += 'filter';
      params.append('name', searchResult.value);
    }

    const response = await axios.get(`${url}?${params.toString()}`);

    const allCruises = response.data;
    totalRecords.value = allCruises.length;

    const start = page * 5;
    const end = start + 5;
    const currentPageCruises = allCruises.slice(start, end);

    // Fetch and display cruises for the current page
    displayedCruises.value = currentPageCruises;
    currentPageCruises.forEach((cruise, index) => {
      fetchCruiseDetails(cruise).then(updatedCruise => {
        displayedCruises.value[index] = updatedCruise;
      });
    });

    // Pre-fetch next page cruises
    const nextPageStart = end;
    const nextPageEnd = nextPageStart + 5;
    nextPageCruises.value = allCruises.slice(nextPageStart, nextPageEnd);
    nextPageCruises.value.forEach((cruise, index) => {
      fetchCruiseDetails(cruise).then(updatedCruise => {
        nextPageCruises.value[index] = updatedCruise;
      });
    });

    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching cruises:', error);
  } finally {
    loading.value = false;
  }
};

const onPage = (event: { page: number, rows: number }) => {
  if (event.page === currentPage.value + 1) {
    // Move to next page
    displayedCruises.value = nextPageCruises.value;
    fetchCruises(event.page);
  } else {
    // For any other page change, fetch new data
    fetchCruises(event.page);
  }
};

const formattedCruiseDescription = (cruise: Cruise) => {
  return `Hạ thuỷ ${cruise.launchedYear} - ${cruise.material} - ${cruise.cabinQuantity} Phòng`;
};

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US');
};

const goToCruise = (id: number) => {
  router.push({ name: 'CruiseDetails', params: { id: id.toString() } });
};

onMounted(() => {
  fetchCruises();
});

watch([() => props.filters, () => props.searchResult], () => {
  displayedCruises.value = [];
  searchResult.value = props.searchResult;
  fetchCruises();
}, { deep: true });
</script>