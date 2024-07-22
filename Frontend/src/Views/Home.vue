<template>
<section class="flex bg-black">
    <div class="w-full h-screen flex flex-col relative gap-5 items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-20 z-0"       
      :style="{
        'background-image': 'url(' + loginImage + ')',
        'background-size': 'cover',
        'background-position': 'center',
        
      }">
      </div>
      <div class="z-10 lg:text-[100px] font-black text-[60px] text-[#f4b213]">
          BLACKHACK
      </div>
      <div class="flex flex-col gap-7">
        <div class="flex gap-2">
          <Boton @click="startGame" 
            class="z-10 hidden lg:block"
            text="Iniciar Partida"
          />
          <Boton @click="startGameC"
          class="z-10 block lg:hidden"
          text="Iniciar Partida"
          />
          <!-- <Boton 
            class="z-10 block lg:hidden"
            text="Iniciar Seccion"
            /> -->
        </div>
        <!-- <Boton 
         @click="toggleModalCrear"
          class="z-10 block lg:hidden"
          text="Crear Cuenta"
        />   -->
      </div>  
    </div>
    <!-- <div class="hidden lg:flex flex-col w-1/2 h-screen gap-8 justify-center items-center">
      <div class="text-7xl text-white font-black">
        Crear Cuenta
      </div>
      <div class="flex flex-col gap-2 justify-center items-center">
        <div class="flex gap-6">
          <Input label="Nombre" placeholder="Nombre" type="name" />
          <Input label="Apellido" placeholder="Apellido" type="name" />
        </div>
        <Input label="Usuario" class="w-full" placeholder="Usuario" type="name" />
        <Input label="Correo" class="w-full" placeholder="usuario@gmail.com" type="email" />
        <Input label="Password (8 character minimum)" class="w-full" placeholder="Password" minlength="8" type="password" />
      </div>
      <div class="flex w-full items-center flex-col gap-4">
        <div class="flex gap-4">
          <Boton 
            text="Crear Cuenta"
          />
          <Boton 
            text="Iniciar Seccion"
          />
        </div>
      </div>
    </div>  -->
</section>  
<!-- <modalCrear :showModal="isModalCrearCuenta" />  -->
</template>

<script setup>
import { useRouter } from 'vue-router';
import loginImage from '../components/Fondo.webp';
import Boton from '../components/BotonVerde.vue';
import Input from '../components/Input.vue';
import ModalCrear from '../components/modalCrearCuenta.vue'
import { ref, watch } from 'vue';

const router = useRouter();

const isModalCrearCuenta = ref(false);

const startGame = () => {
  router.push({ name: 'blackHack'});
};

const startGameC = () => {
  router.push({ name: 'blackhackcel'});
};

const toggleModalCrear = () => {
    isModalCrearCuenta.value = !isModalCrearCuenta.value;
};
</script>

<style scoped>
 .z-0::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    backdrop-filter: blur(5px);
 }
</style>