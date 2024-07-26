<template>
  <div class="px-5 rounded-lg">
    <div class="grid grid-cols-2 gap-4">
      <div class="rounded-3xl">
        <label class="block mb-2 ml-2">Ngày nhận phòng</label>
        <DatePicker v-model="date" dateFormat="dd/mm/yy" class="rounded-full"/>
      </div>

      <div>
        <label class="block mb-2 ml-2">Số lượng khách</label>
        <div class="rounded-3xl border border-gray-300 dark:border-[#52525b] dark:border-1 py-2 px-3 w-full">
          <span class="SoLuong cursor-pointer" @click="showGuestSelection = !showGuestSelection">
            {{ adults || 0 }} Người lớn - {{ children || 0 }} Trẻ em
          </span>

          <div v-if="showGuestSelection" class="LuaChon bg-white dark:bg-[#121212] border absolute z-30 flex flex-col gap-4 shadow-sm px-3 p-2 mt-3 rounded-3xl">
            <div class="flex justify-between items-center border-b">
              <span class="text-gray-700 mr-5">Người lớn</span>
              <div class="flex items-center">
                <Button label="-" class="rounded-full bg-transparent text-gray-500 border-none text-3xl focus:shadow-none focus-visible:shadow-none" @click="decrementAdults" :disabled="adults === 0"/>
                <span class="mx-2 text-center">{{ adults }}</span>
                <Button label="+" class="rounded-full bg-transparent text-gray-500 border-none text-3xl focus:shadow-none focus-visible:shadow-none" @click="incrementAdults"/>
              </div>
            </div>
            <div class="flex justify-between items-center border-b">
              <span class="text-gray-700 mr-5">Trẻ em</span>
              <div class="flex items-center">
                <Button label="-" class="rounded-full bg-transparent text-gray-500 border-none text-3xl focus-visible:shadow-none" @click="decrementChildren" :disabled="children === 0"/>
                <span class="mx-2 text-center">{{ children }}</span>
                <Button label="+" class="rounded-full bg-transparent text-gray-500 border-none text-3xl focus-visible:shadow-none" @click="incrementChildren"/>
              </div>
            </div>
            <Button label="Xác nhận" class="text-white" @click="showGuestSelection = false"/>
          </div>
        </div>
      </div>
      <div class="input-group flex-column align-items-center mb-3">
        <FloatLabel class="p-float-label">
          <InputText id="name" v-model="name" class="w-full h-3rem pl-3 rounded-3xl"/>
          <label for="name" class="pl-2">Họ và tên</label>
        </FloatLabel>
      </div>
      <div class="input-group flex-column align-items-center mb-3">
        <FloatLabel class="p-float-label">
          <InputText id="phone" v-model="phone" class="w-full h-3rem pl-3 rounded-3xl"/>
          <label for="phone" class="pl-2">Số điện thoại</label>
        </FloatLabel>
      </div>
      <div class="input-group flex-column align-items-center mb-3">
        <FloatLabel class="p-float-label">
          <InputText id="email" v-model="email" class="w-full h-3rem pl-3 rounded-3xl"/>
          <label for="email" class="pl-2">Địa chỉ email</label>
        </FloatLabel>
      </div>
      <div class="col-span-2 w-full">
        <label class="block mb-2 ml-2">Yêu cầu của bạn</label>
        <Textarea v-model="requests" placeholder="Nhập yêu cầu của bạn" rows="3" class="w-full rounded-2xl"/>
      </div>
    </div>

    <div class="col-span-2 flex items-center gap-5 mt-6">
      <div><p class="text-xl font-bold">Tổng tiền: {{ props.totalPrice.toLocaleString() }} đ</p></div>
      <div class="text-right ml-auto">
        <Button label="Đăng ký tư vấn" class="px-4 border-none focus:shadow-none mx-3"/>
        <Button label="Đặt ngay" class="text-white" @click="createOrder"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const props = defineProps<{
  cruiseId: string;
  totalPrice: number;
  selectedRooms: { id: string; name: string; count: number }[];
}>();

const emit = defineEmits(['paymentComplete']);

const date = ref(new Date('2024-06-10'));
const adults = ref(1);
const children = ref(0);
const showGuestSelection = ref(false);
const name = ref('');
const phone = ref('');
const email = ref('');
const requests = ref('');

const orderInfo = computed(() => {
  return props.selectedRooms.map(room => `${room.name} x${room.count}`).join(', ');
});

let paymentWindow: Window | null = null;
let orderData: any = null;

const createOrder = async () => {
  try {
    const response = await axios.post('http://14.225.255.190:8081/api/v1/create-order', {
      amount: props.totalPrice,
      orderInfo: orderInfo.value
    });

    if (response.data && response.data.redirect_url) {
      orderData = response.data;
      paymentWindow = window.open(response.data.redirect_url, '_blank');
      window.open(response.data.redirect_url, '_blank');
      await checkPaymentStatus();
    }
  } catch (error) {
    console.error('Error creating order:', error);
    emit('paymentComplete', 'failure');
  }
};

const createBooking = async () => {
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
    console.error('Missing token or userId');
    return;
  }

  const bookingData = {
    bookingDate: new Date().toISOString(),
    guestQuantity: adults.value + children.value,
    note: requests.value,
    bookingStatus: 1,
    paymentStatus: 1,
    cabinBookings: props.selectedRooms.reduce((acc, room) => {
      acc[room.id] = room.count;
      return acc;
    }, {}),
    userId: parseInt(userId),
    cruiseId: parseInt(props.cruiseId)
  };

  try {
    const response = await axios.post('http://14.225.255.190:8081/api/bookings/create', bookingData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Booking created successfully:', response.data);
    // Xử lý phản hồi nếu cần
  } catch (error) {
    console.error('Error creating booking:', error);
    // Xử lý lỗi nếu cần
  }
};

const checkPaymentStatus = async () => {
  if (!orderData) return;

  const params = new URLSearchParams({
    vnp_Amount: orderData.vnp_Amount,
    vnp_BankCode: orderData.vnp_BankCode || '',
    vnp_CardType: orderData.vnp_CardType || '',
    vnp_OrderInfo: orderData.vnp_OrderInfo,
    vnp_PayDate: orderData.vnp_PayDate || orderData.vnp_CreateDate,
    vnp_ResponseCode: orderData.vnp_ResponseCode || '',
    vnp_TmnCode: orderData.vnp_TmnCode,
    vnp_TransactionNo: orderData.vnp_TransactionNo || '',
    vnp_TransactionStatus: orderData.vnp_TransactionStatus || '',
    vnp_TxnRef: orderData.vnp_TxnRef,
    vnp_SecureHash: orderData.vnp_SecureHash
  });

  try {
    const response = await axios.get(`http://14.225.255.190:8081/api/v1/callback?${params.toString()}`);

    if (response.data.status === 'success') {
      await createBooking(); // Gọi API tạo đơn hàng
      emit('paymentComplete', 'success');
    } else {
      emit('paymentComplete', 'failure');
    }

    if (paymentWindow) {
      paymentWindow.close();
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    emit('paymentComplete', 'failure');
  }
};

const handlePaymentCallback = async (event: MessageEvent) => {
  if (event.origin === 'http://14.225.255.190:8081') {
    const { vnp_ResponseCode, vnp_TransactionStatus } = event.data;

    if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
      await createBooking(); // Gọi API tạo đơn hàng
      emit('paymentComplete', 'success');
    } else {
      emit('paymentComplete', 'failure');
    }

    // if (paymentWindow) {
    //   paymentWindow.close();
    // }
  }
};

onMounted(() => {
  window.addEventListener('message', handlePaymentCallback);
});

onUnmounted(() => {
  window.removeEventListener('message', handlePaymentCallback);
});

const incrementAdults = () => {
  adults.value++;
};

const decrementAdults = () => {
  if (adults.value > 0) {
    adults.value--;
  }
};

const incrementChildren = () => {
  children.value++;
};

const decrementChildren = () => {
  if (children.value > 0) {
    children.value--;
  }
};
</script>