<template>
  <div class="flex flex-col gap-1 justify-start items-start"> 
    <label for="nombre" class="text-white">{{ label }}:</label>
    <input :type="props.type" id="nombre" name="nombre" :placeholder="props.placeholder" :minlength="props.minlength"
    class="bg-[#2d5b4a] outline-none rounded-lg border-solid border-[2px] border-white p-4 w-full h-[50px] text-white"
    >
  </div>  
</template>
<script setup>
  const props = defineProps({
    placeholder: String,
    type: String,
    label: String,
    minlength: String,
  });
</script>

<style scoped>
 input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #00161F inset; /* Establece un sombreado para ocultar el fondo blanco */
    -webkit-text-fill-color: #ffffff !important
}
</style>