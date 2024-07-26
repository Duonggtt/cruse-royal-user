<template>
  <Splitter :layout="layout" :gutterSize="0" class="mx-auto max-w-screen-xl border-none mt-10">
    <SplitterPanel class="flex h-auto" :size="20" :minSize="15">
      <OptionCruise @update-filters="updateFilters" />
    </SplitterPanel>
    <SplitterPanel class="flex justify-content-center" :size="80" :minSize="15">
      <ListSearchCruise :filters="filters"  :searchResult="searchResult"/>
    </SplitterPanel>
  </Splitter>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from 'vue';
import OptionCruise from "@/components/User/SearchCruise/S21_OptionCruise.vue";
import ListSearchCruise from "@/components/User/SearchCruise/S22_ListSearchCuise.vue";

let layout = ref<'horizontal' | 'vertical'>('horizontal');
let filters = ref({});
let searchResult = ref('');

const props = defineProps<{
  searchResult: string
}>();


watch(() => props.searchResult, (newValue) => {
  searchResult.value = newValue;
});




const resizeHandler = () => {
  layout.value = window.innerWidth <= 768 ? 'vertical' : 'horizontal';
};

const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

onMounted(() => {
  window.addEventListener('resize', resizeHandler);
  resizeHandler();

});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
});
</script>