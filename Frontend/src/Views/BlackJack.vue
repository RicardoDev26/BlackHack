<template>
  <section class="flex h-screen">
     <Tablero 
     :ScoreJugador="jugadorScore"
     :ScoreBot= "IAScore"
     :Stand="standcard"
     :Check="pedirCarta"
     :turnoV="turnoJuego === Turnos.Bot"
     :turnoI="turnoJuego === Turnos.Jugador"
     class="hidden lg:block z-10"
     />
     <section :style="{ backgroundImage: `url(${fondoCel})` }" class="fondo-vista hidden lg:flex flex-col w-screen justify-between p-9">
       <div class="absolute inset-0 bg-black bg-opacity-50"></div>
       <div class="z-10 w-full h-[150px] opacity-100 flex gap-1 justify-center">
         <carta v-show="turnoJuego === Turnos.Bot" v-for="IACarta in IACartas" :key="IACarta.id" :figura="IACarta?.figura" :valor="IACarta?.valor?.valorF" />
         <mazo v-for="IACarta in IACartas" v-show="turnoJuego === Turnos.Jugador" />
       </div>
       <div class="z-10 w-full text-8xl font-bold text-white">BLACKHACK</div>
       <div class="flex gap-4">
         <div class="z-10 w-full h-[150px]  flex gap-1 justify-center">
           <carta v-for="jugadorCarta in jugadorCartas" :key="jugadorCarta.id" :figura="jugadorCarta?.figura" :valor="jugadorCarta?.valor?.valorF"  /> 
         </div>
         <div class="z-10">
           <mazo v-show="turnoJuego === Turnos.Jugador" @click="pedirCarta" />
           <mazo v-show="turnoJuego === Turnos.Bot" />
          </div> 
       </div>
     </section>
  </section>
  <modalLoser :showModal="isModalLoserOpen" />
  <modalWin :showModal="isModalWinOpen" />
 </template>
 
 <script setup>
 import Tablero from '../components/Tablero.vue';
 import { onMounted } from 'vue';
 import carta from '../components/Carta.vue'
 import Mazo from '../components/Mazo.vue'
 import { ref, watch } from 'vue';
 import { message } from 'ant-design-vue';
 import modalLoser from '../components/modalLoser.vue';
 import modalWin from '../components/modalWin.vue';
 import fondoCel from '../components/fondoGame.jpg';
 
 const isModalLoserOpen = ref(false);
 const isModalWinOpen = ref(false);
 
 const ModalOpenD = (estado) => {
   setTimeout(() => {
     if (estado === 'ganador') {
       isModalWinOpen.value = true;
     } else {
       isModalLoserOpen.value = true;
     }
   }, 1000); 
 }
  
 
 const Turnos = {
     Jugador: 'Jugador',
     Bot: 'IA',
 }
 
 const estado = {
   ganador: 'ganador',
   perdedor: 'perdedor'
 }
 
 const estadoJugador = ref(estado);
 const turnoJuego = ref(Turnos);
 const jugadorScore = ref('');
 const IAScore = ref ('');
 const jugadorCartas = ref ([]);
 const IACartas = ref([]);
 const PuntuacionGanadora = 21;
 
 const calcularPuntaje = (cartas) => {
     let total = 0;
     let ases = 0;
 
     for (const carta of cartas) {
         if (carta.valor.valorF === 'A') {
             ases += 1;
             total += 11;
         } else {
             total += carta.valor.valorS;
         }
     }
 
     while (total > 21 && ases > 0) {
         total -= 10; 
         ases -= 1;
     }
 
     return total;
 }
 
 onMounted(() => {
   fetch('https://blackhack-api2.onrender.com/ping', { 
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     }
   }).then(response => {
     if (!response.ok) {
       throw new Error('Error en la solicitud');
     }
     return response.json();
   }).then(data => {
     jugadorCartas.value = data.jugadorCartas;
     IACartas.value = data.IACartas;
     jugadorScore.value = calcularPuntaje(data.jugadorCartas);
     IAScore.value = calcularPuntaje(data.IACartas);
     if (jugadorScore.value === PuntuacionGanadora) {
       turnoJuego.value = Turnos.Bot
        standcard();
        if (jugadorScore.value > IAScore.value) {
         ModalOpenD(estado.ganador);
        }
     } else {
       turnoJuego.value = Turnos.Jugador;
     }
     
   }).catch(error => {
     console.error('Error:', error);
     alert('Error: ' + error.message);
   })
     }
 );
 
 
 const pedirCarta = () => {
   fetch('https://blackhack-api2.onrender.com/nuevaCarta', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     }
   }).then(response => {
     if (!response.ok) {
       throw new Error('Error en la solicitud');
     }
     return response.json();
   }).then(data => {
     if (turnoJuego.value === Turnos.Bot) {
       turnoJuego.value = Turnos.Bot;
       IACartas.value.push(data.nuevaCarta);
       IAScore.value = calcularPuntaje(IACartas.value);
         if (IAScore.value > PuntuacionGanadora) {
           ModalOpenD(estado.ganador);
         } else if (IAScore.value === PuntuacionGanadora) {
           ModalOpenD(estado.perdedor);
         }
         return;
     } else {
       turnoJuego.value = Turnos.Jugador;
       jugadorCartas.value.push(data.nuevaCarta);
       jugadorScore.value = calcularPuntaje(jugadorCartas.value);
       
       if(jugadorScore.value > PuntuacionGanadora){
           ModalOpenD(estado.perdedor);
       } else if (jugadorScore.value === PuntuacionGanadora){
         turnoJuego.value === Turnos.Bot
       }
     }
   }).catch(error => {
     console.error('Error:', error);
     alert('Error: ' + error.message);
   });
 };
 
 const standcard = () => {
  turnoJuego.value = Turnos.Bot
 }
 
 watch(turnoJuego, async (newValue) => {
   if (newValue === Turnos.Bot) {
     while (IAScore.value < 17) {
       await pedirCarta();
       await new Promise(resolve => setTimeout(resolve, 1000));
     }
     if (jugadorScore.value < 21 && jugadorScore.value > IAScore.value) {
       ModalOpenD(estado.ganador);
     } else if (jugadorScore.value < IAScore.value) {
       ModalOpenD(estado.perdedor);
     } else if (jugadorScore.value === PuntuacionGanadora && IAScore.value === PuntuacionGanadora) {
       ModalOpenD(estado.perdedor);
     } else if (jugadorScore.value === IAScore.value){
       ModalOpenD(estado.perdedor);
     } 
   }
 });
 
 </script>
 
 <style>
 body {
     background-color: #B1BE96;
 }
 .fondo-vista {
     background-size: cover; 
     background-position: center; 
     height: 100vh;
     width: 100vw; 
   }
 
 </style>
 