<template>
  <div class=" mx-auto max-w-screen-xl px-4 py-10 mt-5 overscroll-auto ">

    <!-- Main content -->
    <div class="grid grid-cols-12 gap-4 justify-center space-y-4 lg:space-y-0 lg:space-x-4">
      <Menubar :model="itemsMenu" class="flex col-span-12 items-center justify-start space-x-4  p-2 rounded-full font-medium sticky top-[4rem] dark:bg-[#121212] cursor-pointer  ">
        <template #item="{ item }">
          <div @click="scrollTo(item.to)" class="px-1 py-2 mx-5 my-1">
            {{ item.label }}
          </div>
        </template>
      </Menubar>
      <!-- Left Column -->
      <div id="features" class="section col-span-12 lg:col-span-8  p-6 rounded-3xl order-2 md:order-1 ">
        <h2 class="text-2xl font-bold mb-4">Đặc điểm nổi bật</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div v-for="tag in props.cruise?.tags" :key="tag.id" class="feature-item flex items-center ">
            <span class=" flex items-center">
                <span class="text-primary material-symbols-outlined mr-2"> {{ tag.icon }} </span>
                <span> {{ tag.name }}</span>
              </span>
          </div>
        </div>
        <div class=" list-disc space-y-2 pt-5">
          <p v-for="shortDesc in props.cruise?.shortDesc" :key="shortDesc">
              <span class=" flex items-center">
                <span class="material-symbols-outlined text-primary mr-2"> check </span>
                <span>{{ shortDesc }}</span>
              </span>
          </p>
        </div>

        <!--        <RomCruise :cabins="props.cruise?.cabins" :tags="props.cruise?.tags" id="prices" class="section pt-52" cruise-id=""/>-->
        <C4_RomCruise :cruiseId="props.cruise?.id"/>
        <Introduce/>
        <Rules id="rules" class="section pt-52"/>
        <Evaluate id="reviews" class="section pt-52"/>

      </div>

      <!-- Right Column -->
      <div class="lg:col-span-4 col-span-12 px-5 py-4 rounded-3xl h-auto order-1 md:order-2">
        <div class="shadow-xl rounded-3xl p-5 border-2  sticky top-[8.5rem]" ref="rightColumn">
          <h2 class="text-xl font-bold pb-3 border-bottom-1 border-gray-200">Thông tin du thuyền</h2>
          <div v-for="(value, key) in shipDetails" :key="key" class="grid grid-cols-12 gap-4 items-center pt-2  ">
            <span class="col-span-4  font-medium">{{ key }}:</span>
            <span class="col-span-8">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from "vue";

const itemsMenu = ref([
  {label: 'Đặc điểm', to: 'features'},
  {label: 'Phòng & giá', to: 'prices'},
  {label: 'Quy định', to: 'rules'},
  {label: 'Đánh giá', to: 'reviews'}
]);

const scrollTo = (id: string) => {
  nextTick(() => {
    const element = document.getElementById(id);
    if (element) {
      const menubarHeight = 64; // 4rem = 64px
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - menubarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
};
const props = defineProps({
  cruise: Object,
  // cabins: Array,
  // tags: Object,
  // location: Object,
  // owner: Object,

});

const shipDetails = {
  'Hạ thủy': props.cruise?.launchedYear,
  'Cabin': props.cruise?.cabinQuantity,
  'Thân vỏ': props.cruise?.material,
  'Hành trình': props.cruise?.location?.routeName,
  'Điều hành': props.cruise?.owner?.name,
};


</script>


