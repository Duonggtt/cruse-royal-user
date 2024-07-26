<template>
  <div class="w-full pt-5">
    <div class="border-2 border-gray-200 rounded-3xl h-auto">
      <div class="border-b-2 border-gray-300 py-3 mb-5">
        <div class="flex justify-between items-center px-3">
          <h3 class="font-bold pl-2">Lọc kết quả</h3>
          <h5 class="font-bold cursor-pointer hover:text-emerald-500" @click="resetSelection">Đặt lại</h5>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="px-3">
          <p class="font-bold pb-2">Xếp hạng sao</p>
          <div class="flex flex-col gap-2" style="transform: scale(0.95);">
            <div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
              <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.key" @change="debounceApplyFilters"/>
              <label :for="category.key" class="text-sm">{{ category.name }}</label>
            </div>
          </div>
        </div>

        <div class="border-t-2 border-gray-300 pt-3 px-3">
          <p class="font-bold pb-2">Tiện ích</p>
          <div class="flex flex-col gap-2 -mt-3" style="transform: scale(0.95);">
            <div v-for="utilitie in utilities" :key="utilitie.key" class="flex items-center gap-2">
              <Checkbox v-model="selectedUtilities" :inputId="utilitie.key" name="utility" :value="utilitie.key" @change="debounceApplyFilters"/>
              <label :for="utilitie.key" class="text-sm">{{ utilitie.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '@/stores/config';
import { debounce } from 'lodash';

const selectedCategories = ref<string[]>([]);
const selectedUtilities = ref<string[]>([]);

const categories = ref([
  {name: "3 sao", key: "3s"},
  {name: "4 sao", key: "4s"},
  {name: "5 sao", key: "5s"}
]);

interface TagItem {
  id: number;
  icon: string;
  name: string;
}

interface Utility {
  name: string;
  key: string;
}

const utilities = ref<Utility[]>([]);

const fetchUtilities = async () => {
  try {
    const response = await axios.get<TagItem[]>(`${API_URL}/tags/`);
    utilities.value = response.data.map((item: TagItem) => ({
      name: item.name,
      key: item.id.toString()
    }));
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu tiện ích:', error);
  }
};

const applyFilters = () => {
  const filters = {
    ratings: selectedCategories.value,
    tagIds: selectedUtilities.value
  };
  emit('update-filters', filters);
};

const debounceApplyFilters = debounce(applyFilters, 1000);

const resetSelection = () => {
  selectedCategories.value = [];
  selectedUtilities.value = [];
  applyFilters();
};

onMounted(() => {
  fetchUtilities();
});

const emit = defineEmits(['update-filters']);
</script>