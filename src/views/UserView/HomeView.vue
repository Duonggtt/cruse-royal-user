<template>
  <main>
    <!--    <Navbar class="w-screen z-50"/>-->

    <Navbar/>
    <Toast class="z-50"/>
    <SearchYachts/>
    <ListCruiseView  />
    <Logo_Partner/>

    <Footer/>

  </main>
</template>

<script setup lang="ts">

import Navbar from "@/components/User/Navbar.vue";
import Logo_Partner from "@/components/User/Home/H3_Logo_Partner.vue";
</script>
