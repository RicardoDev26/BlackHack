<template>
    <div v-show="props.showModal" class="lg-hidden bg-slate-500 w-[599px] h-[685px] fixed inset-0 z-50 flex flex-col gap-2 justify-center items-center">
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
            text="Regresar"
          />
        </div>
      </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
   showModal: Boolean,
  });
</script>