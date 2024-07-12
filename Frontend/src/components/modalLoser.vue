<template>
  <section v-show="props.showModal" class="fixed inset-0 z-50 flex  justify-center bg-[black] bg-opacity-50">
    <div class="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col justify-center gap-8 w-[450px] h-[297px] bg-[#B7C0C5] rounded-xl">
      <div class="text-red-600 font-black text-7xl">PERDEDOR</div>
      <div class="flex gap-4 justify-center">
        <button @click="menuGame" class="w-[136px] h-[60px] bg-[#C2CE6C] font-black ">Menu</button>
        <button @click="startGame" class="w-[136px] h-[60px] bg-[#394129] font-black text-white">Jugar de Nuevo</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

interface Props {
  showModal: boolean,
}

const props = defineProps<Props>();
const router = useRouter();


const startGame = () => {
  window.location.reload();
};

const menuGame = () => {
  router.push({ name: 'Homeview'});
};
</script>