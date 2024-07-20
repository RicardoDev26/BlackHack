<template>
    <div :style="{ backgroundImage: `url(${fondoCel})` }" class="fondo-vista"></div>
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
</template>
  
  <script setup>
  import fondoCel from './fondoGame.jpg';
  </script>
  
  <style>
  .fondo-vista {
    background-size: cover; /* Ajusta la imagen para que cubra toda el área */
    background-position: center; /* Centra la imagen */
    height: 100vh; /* Ocupa toda la altura de la vista */
    width: 100vw; /* Ocupa toda la anchura de la vista */
  }
  </style>