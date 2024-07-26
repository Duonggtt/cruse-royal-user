<template>
  <div class="card border-b-2 border-gray-200   w-auto">
    <div class=" xl:max-w-7xl xl:mx-auto m-auto ">
      <div class="flex items-center space-x-2 text-gray-500  ">
        <i class="pi pi-home"></i>
        <Breadcrumb :model="items" class=" border-0"/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  cruiseName: String
});

const items = ref([
  { label: 'Tìm du thuyền' },
  { label: props.cruiseName }
]);
</script>
