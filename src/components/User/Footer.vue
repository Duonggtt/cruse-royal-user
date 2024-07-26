<template>
 <div class="bg-gray-900 dark:bg-[#121212] mt-32">
   <div class="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 ">
     <footer class=" text-white py-20 lg:flex lg:items-start lg:gap-8">
       <div class="container mx-auto">
         <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div v-for="section in sections" :key="section.title">
             <img v-if="section.logo" :src="section.logo.src" :alt="section.logo.alt" :width="section.logo.width" :height="section.logo.height" class="mb-5"/>
             <h3 class="text-xl font-bold mb-4" v-if="section.title">{{ section.title }}</h3>
             <p class="mb-2" v-for="item in section.items" :key="item">{{ item }}</p>
           </div>
         </div>
       </div>
     </footer>
   </div>
 </div>
</template>

<script setup lang="ts">
const sections = [
  {
    title: '',
    logo: {
      src: '/Logo/Logo-Cruise-Royal.svg',
      alt: 'Cruise Royal',
      width: '150',
      height: '100'
    },
    items: [
      'Công ty TNHH Du Lịch và Dịch Vụ Cruise Royal',
      'Tầng 7, số nhà 25, ngõ 38 phố Yên Lãng, phường Láng Hạ, quận Đống Đa, TP. Hà Nội',
      'Mã số doanh nghiệp: 0101011001 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 05/06/2024'
    ]
  },
  {
    title: 'GIỚI THIỆU',
    items: ['Về chúng tôi', 'Điều khoản và điều kiện', 'Chính sách riêng tư', 'Hướng dẫn sử dụng', 'Hình thức thanh toán', 'Liên hệ', 'Hotline: 0922222016', 'Email: info@cruiseroyal.com']
  },
  {
    title: 'ĐIỂM ĐẾN',
    items: ['Vịnh Hạ Long', 'Vịnh Lan Hạ', 'Đảo Cát Bà']
  },
  {
    title: 'DU THUYỀN',
    items: ['Blog', 'Quy định chung và lưu ý', 'Câu hỏi thường gặp']
  }
]
</script>
