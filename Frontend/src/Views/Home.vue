<template>
      <div class="flex flex-col gap-5">
    <div class="text-[150px]">
        BLACKHACK
    </div>
      <button @click="startGame" class=" text-xl rounded-2xl bg-black text-white p-4"> Iniciar Partida </button>  
  </div> 
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const startGame = () => {
  router.push({ name: 'blackHack'});
};
</script>