<template>
  <div class=" card flex justify-center flex-wrap mt-1 relative">
    <div class=" w-4/5 overflow-hidden ">
      <video ref="videoElement" :src="currentVideo.src" @ended="onVideoEnded" :autoplay="true"
             class="w-full object-cover lg:h-3/4 rounded-3xl animation-linear animate-duration-500">
      </video>
    </div>

    <SearchCuise class="absolute items-center top-10 lg:top-2/3 w-3/4 max-w-5xl animate-duration-[2400ms] animate-ease-in-out "
                 v-animateonscroll="{ enterClass: 'animate-fadeinleft'}"/>

  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import SearchCuise from "@/components/User/SearchCruise/S1_SearchCuise.vue";


const images = ref([
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
  '/thum01.jpg',
]);

const videos = ref([
  {src: 'Video/Cruise04.mp4', type: 'video/mp4'},
  {src: 'Video/Cruise01.mp4', type: 'video/mp4'},
  {src: 'Video/Cruise02.mp4', type: 'video/mp4'},
  {src: 'Video/Cruise03.mp4', type: 'video/mp4'},
  {src: 'Video/Cruise05.mp4', type: 'video/mp4'},
  {src: 'Video/Cruise06.mp4', type: 'video/mp4'},
]);

const currentVideoIndex = ref(0);
const videoElement = ref<HTMLVideoElement | null>(null);

const onVideoEnded = () => {
  if (currentVideoIndex.value < videos.value.length - 1) {
    currentVideoIndex.value++;
  } else {
    currentVideoIndex.value = 0;
  }
  if (videoElement.value) {
    videoElement.value.src = videos.value[currentVideoIndex.value].src;
    videoElement.value.play();
  }
};

const currentVideo = computed(() => videos.value[currentVideoIndex.value]);
</script>
